

import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Plus, Languages, Sparkles, Navigation, Copy, Trash2, Edit2, Thermometer, Plane, BedDouble, ClipboardCheck, Info, ExternalLink, Banknote } from 'lucide-react';
import { Language, DayItinerary, TravelEvent, FlightDetails } from './types';
import { TRANSLATIONS, INITIAL_ITINERARY, CATEGORY_ICONS, CATEGORY_COLORS, FLIGHT_INFO } from './constants';
import EventModal from './components/EventModal';
import MenuModal from './components/MenuModal';
import { generateItinerarySuggestions } from './services/geminiService';
import { getWeather, getWeatherIconInfo, WeatherData } from './services/weatherService';

const FlightCard: React.FC<{ flights: FlightDetails[] }> = ({ flights }) => {
  if (!flights || flights.length === 0) return null;
  
  return (
    <div className="mb-6 space-y-4">
       {flights.map((flight, idx) => (
         <div key={idx} className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 shadow-journal border-2 border-white relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
            {/* Decorative 'Washi Tape' strip */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#594a40]/10 border-b border-dashed border-[#594a40]/20"></div>
            
            <div className="flex justify-between items-center border-b border-dashed border-[#594a40]/20 pb-3 mt-1">
               <div className="flex items-center gap-2">
                 <div className="p-1.5 bg-[#594a40] rounded-full text-[#f8e8c1]">
                    <Plane size={14} />
                 </div>
                 <span className="font-bold text-lg tracking-wider">{flight.flightNo}</span>
               </div>
               <span className="text-sm font-mono font-bold opacity-80 bg-[#f8e8c1] px-2 py-1 rounded-md">{flight.time}</span>
            </div>

            <div className="flex justify-between items-center px-2 pt-4">
                <div className="flex flex-col">
                   <span className="text-3xl font-black text-[#594a40]">{flight.from}</span>
                   <span className="text-xs font-bold uppercase opacity-50 tracking-widest mt-1">Term {flight.fromTerm}</span>
                </div>
                
                <div className="flex-1 flex flex-col items-center px-4 opacity-40">
                   <div className="w-full h-0 border-t-2 border-dashed border-[#594a40]"></div>
                   <Plane size={16} className="text-[#594a40] absolute mt-[-9px]" />
                </div>

                <div className="flex flex-col items-end">
                   <span className="text-3xl font-black text-[#594a40]">{flight.to}</span>
                   <span className="text-xs font-bold uppercase opacity-50 tracking-widest mt-1">Term {flight.toTerm}</span>
                </div>
            </div>
         </div>
       ))}
    </div>
  );
};

const App: React.FC = () => {
  // State
  const [lang, setLang] = useState<Language>('zh');
  // Initialize days state, we'll populate it via effect or lazy initializer
  const [days, setDays] = useState<DayItinerary[]>([]);
  const [activeDayId, setActiveDayId] = useState<string>('d1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TravelEvent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  
  // Menu State
  const [activeMenu, setActiveMenu] = useState<'hotel' | 'prep' | 'info' | 'currency' | null>(null);

  // Computed properties
  const t = TRANSLATIONS[lang];
  // Ensure we have a valid active day even during loading
  const activeDay = days.find(d => d.id === activeDayId) || days[0] || { id: 'd1', dateStr: '2025-12-30', dayLabel: 'Day 1', events: [] };
  
  // Logic: Dec 30-Jan 2 (morning) likely Yiwu, Jan 2 (afternoon)-Jan 4 Hangzhou.
  const currentCity = activeDay.dateStr >= '2026-01-02' ? 'Hangzhou' : 'Yiwu';

  // Load from local storage when language changes
  useEffect(() => {
    // Update version to v15 to load new detailed itinerary with hideMap/mapQuery changes
    const storageKey = `yiwu-hangzhou-trip-v15-${lang}`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      try {
        setDays(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load itinerary", e);
        setDays(INITIAL_ITINERARY[lang]);
      }
    } else {
      setDays(INITIAL_ITINERARY[lang]);
    }
  }, [lang]);

  // Save to local storage when days change
  useEffect(() => {
    if (days.length > 0) {
      const storageKey = `yiwu-hangzhou-trip-v15-${lang}`;
      localStorage.setItem(storageKey, JSON.stringify(days));
    }
  }, [days, lang]);

  // Fetch Weather when city changes
  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather(currentCity);
      setWeather(data);
    };
    fetchWeather();
    // Refresh weather every 10 mins
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, [currentCity]);

  const handleSaveEvent = (event: TravelEvent) => {
    setDays(prev => prev.map(day => {
      if (day.id === activeDayId) {
        const existingIndex = day.events.findIndex(e => e.id === event.id);
        let newEvents = [...day.events];
        
        if (existingIndex >= 0) {
          // Edit
          newEvents[existingIndex] = event;
        } else {
          // Add
          newEvents.push(event);
        }
        // Sort by time (string sort works for duration start time usually)
        newEvents.sort((a, b) => a.time.localeCompare(b.time));
        return { ...day, events: newEvents };
      }
      return day;
    }));
    setEditingEvent(null);
  };

  const handleDeleteEvent = (e: React.MouseEvent, eventId: string) => {
    e.stopPropagation();
    if (window.confirm(t.delete + '?')) {
      setDays(prev => prev.map(day => {
        if (day.id === activeDayId) {
          return { ...day, events: day.events.filter(ev => ev.id !== eventId) };
        }
        return day;
      }));
    }
  };

  const handleEditClick = (e: React.MouseEvent, event: TravelEvent) => {
    e.stopPropagation();
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleGenerateAI = async () => {
    if (activeDay.events.length > 0) {
      if (!window.confirm("Overwrite current day's events?")) return;
    }
    
    setIsGenerating(true);
    const events = await generateItinerarySuggestions(currentCity, lang);
    if (events.length > 0) {
      setDays(prev => prev.map(d => d.id === activeDayId ? { ...d, events } : d));
    }
    setIsGenerating(false);
  };

  const openMap = (location: string) => {
    const query = encodeURIComponent(location);
    // Use Amap (Gaode Map) Search URI
    window.open(`https://uri.amap.com/search?keyword=${query}`, '_blank');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const weatherInfo = weather ? getWeatherIconInfo(weather.code) : null;

  // Flight Info Logic
  const showOutbound = activeDayId === 'd1'; // Dec 30
  const showInbound = activeDayId === 'd6'; // Jan 4
  const currentFlights = showOutbound 
    ? FLIGHT_INFO[lang].outbound 
    : showInbound 
      ? FLIGHT_INFO[lang].inbound 
      : [];
  
  // Guard for initial render
  if (days.length === 0) return null;

  return (
    <div className={`min-h-screen flex justify-center ${lang === 'zh' ? 'font-zh' : 'font-ko'} text-brand-text relative`}>
      {/* Fixed Watermark */}
      <div 
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.1]"
          style={{
            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/en/8/87/Hangzhou_Logo.svg')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '80% auto',
            backgroundAttachment: 'fixed'
          }}
      />

      <div className="w-full max-w-lg min-h-screen relative flex flex-col z-10 pt-[1px]">
        
        {/* Header - Floating Card Style */}
        <header className="sticky top-[1px] mt-[1px] z-40 mx-4 mb-2">
          <div className="bg-white/90 backdrop-blur-md px-5 py-4 flex justify-between items-center shadow-journal rounded-full border border-white">
            <div>
              <h1 className="text-xl font-black tracking-tight text-[#594a40]">{t.title}</h1>
              <div className="flex items-center text-xs font-bold uppercase tracking-widest opacity-60 mt-0.5 gap-2">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>Dec 30 - Jan 4</span>
                </span>
              </div>
            </div>
            <button 
              onClick={() => setLang(prev => prev === 'zh' ? 'ko' : 'zh')}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#594a40] text-[#f8e8c1] rounded-full text-xs font-bold hover:bg-[#4a3d34] transition-colors shadow-sm"
            >
              <Languages size={14} />
              {lang === 'zh' ? '繁體' : '한국어'}
            </button>
          </div>
        </header>

        {/* Weather & Location Banner */}
        <div className="px-5 pt-2 pb-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-white flex items-center justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#f8e8c1] rounded-full -mr-10 -mt-10 opacity-50 blur-2xl"></div>
             <div className="relative z-10">
                <h2 className="text-2xl font-black flex items-center gap-2 text-[#594a40]">
                  <MapPin size={22} className="text-[#8c735a]" />
                  {currentCity === 'Yiwu' ? t.yiwu : t.hangzhou}
                </h2>
                <div className="text-sm font-medium opacity-60 mt-1 ml-1 bg-[#f8e8c1] inline-block px-2 py-0.5 rounded-md text-[#594a40]">{activeDay.dateStr}</div>
             </div>
             {weather && weatherInfo && (
               <a 
                href={weather.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-right flex flex-col items-end relative z-10 cursor-pointer group hover:opacity-70 transition-opacity"
               >
                  <div className="text-4xl drop-shadow-sm mb-1">{weatherInfo.icon}</div>
                  <div className="font-bold flex items-center gap-1 text-lg">
                    {weather.temp}°C
                  </div>
                  <div className="flex items-center gap-1">
                     <div className="text-xs font-bold uppercase tracking-wide opacity-50">{weatherInfo.label}</div>
                     <div className="w-0.5 h-3 bg-[#594a40]/20 mx-1"></div>
                     <div className="text-[9px] font-bold opacity-40 flex items-center gap-0.5">
                       TWC <ExternalLink size={8} />
                     </div>
                  </div>
               </a>
             )}
          </div>
        </div>

        {/* Day Selector - Sticker/Tab Style */}
        <div className="px-5 pb-2 overflow-x-auto no-scrollbar">
          <div className="flex gap-3 pb-2">
            {days.map(day => (
              <button
                key={day.id}
                onClick={() => setActiveDayId(day.id)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-20 py-2 rounded-2xl border-2 transition-all duration-300 ${
                  activeDayId === day.id
                    ? 'bg-[#594a40] border-[#594a40] text-[#f8e8c1] shadow-journal transform -translate-y-1'
                    : 'bg-white border-white text-[#594a40] opacity-80 hover:opacity-100 shadow-sm'
                }`}
              >
                <span className="text-[9px] uppercase font-black tracking-widest">{day.dayLabel}</span>
                <span className="text-xl font-bold font-serif italic mt-1">{day.dateStr.split('-')[2]}</span>
                <div className={`w-1.5 h-1.5 rounded-full mt-2 ${activeDayId === day.id ? 'bg-[#f8e8c1]' : 'bg-[#594a40]/20'}`}></div>
              </button>
            ))}
          </div>
        </div>

        {/* AI Action */}
        <div className="px-5 py-2 flex justify-end">
            <button 
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="group flex items-center gap-2 text-xs font-bold text-[#594a40] bg-white border border-purple-200 px-4 py-2 rounded-full hover:bg-purple-50 hover:border-purple-300 disabled:opacity-50 shadow-sm transition-all"
            >
              <div className="bg-purple-100 p-1 rounded-full group-hover:bg-purple-200 transition-colors">
                <Sparkles size={12} className="text-purple-600" />
              </div>
              {isGenerating ? t.generating : t.generateAi}
            </button>
        </div>

        {/* Itinerary List */}
        <main className="flex-1 px-5 pb-32 overflow-y-auto mt-2">
          
          {/* Flight Card (Only on Day 1 or Day 6) */}
          {(showOutbound || showInbound) && (
            <FlightCard flights={currentFlights} />
          )}

          {activeDay.events.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center opacity-60">
              <div className="w-20 h-20 bg-white rounded-full shadow-inner flex items-center justify-center mb-4 border-2 border-[#f8e8c1] border-dashed">
                <MapPin size={24} className="text-[#594a40]/50" />
              </div>
              <p className="max-w-[200px] text-sm font-medium leading-relaxed font-serif italic">{t.emptyState}</p>
            </div>
          ) : (
            <div className="relative ml-4 space-y-6 my-2">
              {/* Dashed Timeline Line */}
              <div className="absolute left-[3px] top-0 bottom-0 w-0.5 border-l-2 border-dashed border-[#594a40]/30"></div>
              
              {activeDay.events.map((event, index) => {
                const Icon = CATEGORY_ICONS[event.category];
                const colorClass = CATEGORY_COLORS[event.category];
                
                return (
                  <div key={event.id} className="relative pl-8 group">
                    {/* Timeline Dot - Hand drawn style */}
                    <div className="absolute -left-[5px] top-5 w-4 h-4 rounded-full bg-[#f8e8c1] border-[3px] border-[#594a40] z-10 shadow-sm"></div>
                    
                    {/* Card */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 shadow-journal border border-white hover:scale-[1.01] transition-all relative overflow-hidden group-hover:shadow-soft">
                      {/* Top Right Fold effect (CSS Trick via gradient) */}
                      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#594a40]/5 to-transparent"></div>

                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`p-2 rounded-xl ${colorClass} bg-opacity-40 border border-current border-opacity-10`}>
                            <Icon size={16} className="text-[#594a40]" />
                          </span>
                          <span className="text-base font-bold opacity-80 font-mono bg-[#f8e8c1]/50 px-2 py-0.5 rounded">{event.time}</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={(e) => handleEditClick(e, event)} className="p-2 text-[#594a40]/60 hover:text-[#594a40] hover:bg-slate-100 rounded-full transition-colors">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={(e) => handleDeleteEvent(e, event.id)} className="p-2 text-[#594a40]/60 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-lg font-black leading-tight mb-2 text-[#594a40]">{event.location}</h3>
                      {event.notes && (
                        <div className="relative">
                          {/* Quote/Note decoration */}
                          <div className="absolute -left-3 top-0 bottom-0 w-0.5 bg-[#594a40]/10 rounded-full"></div>
                          <p className="text-base pl-3 text-[#594a40]/80 leading-relaxed whitespace-pre-wrap font-sans">{event.notes}</p>
                        </div>
                      )}

                      {!event.hideMap && (
                        <div className="flex gap-2 mt-4 pt-3 border-t border-dashed border-[#594a40]/10">
                          <button 
                            onClick={() => openMap(event.mapQuery || event.location)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#594a40] text-[#f8e8c1] text-xs font-bold hover:bg-[#4a3d34] transition-all shadow-sm active:scale-95"
                          >
                            <Navigation size={14} />
                            {t.navigate}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* Floating Action Button */}
        <button
          onClick={() => {
            setEditingEvent(null);
            setIsModalOpen(true);
          }}
          className="fixed bottom-24 right-6 w-14 h-14 bg-[#594a40] text-[#f8e8c1] rounded-full shadow-soft flex items-center justify-center hover:bg-[#4a3d34] hover:scale-110 active:scale-95 transition-all z-30 border-2 border-[#f8e8c1]"
        >
          <Plus size={28} />
        </button>

        {/* Bottom Menu - Rounded Dock Style */}
        <nav className="fixed bottom-6 left-5 right-5 max-w-lg mx-auto bg-white/95 backdrop-blur-xl border border-white/40 shadow-soft z-30 rounded-full p-2">
           <div className="flex justify-between px-2 items-center">
              <button 
                onClick={() => setActiveMenu('hotel')}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-full hover:bg-[#f8e8c1] transition-all w-16 h-16 group"
              >
                 <BedDouble size={20} className="text-[#594a40]/70 group-hover:text-[#594a40]" />
                 <span className="text-[10px] font-bold text-[#594a40]/70 group-hover:text-[#594a40]">{t.menuHotel}</span>
              </button>
              
              <button 
                onClick={() => setActiveMenu('prep')}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-full hover:bg-[#f8e8c1] transition-all w-16 h-16 group"
              >
                 <ClipboardCheck size={20} className="text-[#594a40]/70 group-hover:text-[#594a40]" />
                 <span className="text-[10px] font-bold text-[#594a40]/70 group-hover:text-[#594a40]">{t.menuPrep}</span>
              </button>

              <button 
                onClick={() => setActiveMenu('currency')}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-full hover:bg-[#f8e8c1] transition-all w-16 h-16 group"
              >
                 <Banknote size={20} className="text-[#594a40]/70 group-hover:text-[#594a40]" />
                 <span className="text-[10px] font-bold text-[#594a40]/70 group-hover:text-[#594a40]">{t.menuCurrency}</span>
              </button>

              <button 
                onClick={() => setActiveMenu('info')}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-full hover:bg-[#f8e8c1] transition-all w-16 h-16 group"
              >
                 <Info size={20} className="text-[#594a40]/70 group-hover:text-[#594a40]" />
                 <span className="text-[10px] font-bold text-[#594a40]/70 group-hover:text-[#594a40]">{t.menuInfo}</span>
              </button>
           </div>
        </nav>

        {/* Modals */}
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
          initialEvent={editingEvent}
          t={t}
        />
        
        <MenuModal 
          type={activeMenu}
          onClose={() => setActiveMenu(null)}
          lang={lang}
          t={t}
        />
      </div>
    </div>
  );
};

export default App;