
import React, { useState, useEffect } from 'react';
import { X, CheckSquare, Square, Phone, MapPin, Calendar, ExternalLink, RefreshCcw } from 'lucide-react';
import { Language, Translation } from '../types';
import { HOTEL_DATA, PREP_ITEMS, USEFUL_INFO } from '../constants';

type MenuType = 'hotel' | 'prep' | 'info' | 'currency' | null;

interface MenuModalProps {
  type: MenuType;
  onClose: () => void;
  lang: Language;
  t: Translation;
}

const MenuModal: React.FC<MenuModalProps> = ({ type, onClose, lang, t }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Currency State
  const [amountCNY, setAmountCNY] = useState<string>('100');
  const [amountKRW, setAmountKRW] = useState<string>('');
  const [rate, setRate] = useState<number>(193); // Default approximate rate
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Load checklist state
  useEffect(() => {
    if (type === 'prep') {
      const saved = localStorage.getItem(`trip-checklist-v1-${lang}`);
      if (saved) {
        try {
          setCheckedItems(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load checklist", e);
        }
      } else {
        setCheckedItems({});
      }
    }
  }, [type, lang]);

  // Fetch Currency Rate
  useEffect(() => {
    if (type === 'currency') {
      const fetchRate = async () => {
        try {
          // Using a free API as a proxy since XE.com requires a paid key for backend access.
          // This ensures the user gets a working real-time rate for the calculator.
          const res = await fetch('https://api.exchangerate-api.com/v4/latest/CNY');
          const data = await res.json();
          if (data && data.rates && data.rates.KRW) {
            setRate(data.rates.KRW);
            setLastUpdated(data.date);
            // Recalculate KRW based on initial CNY
            setAmountKRW((100 * data.rates.KRW).toFixed(0));
          }
        } catch (e) {
          console.error("Failed to fetch rates, using default", e);
        }
      };
      fetchRate();
    }
  }, [type]);

  const toggleCheck = (text: string) => {
    const newState = { ...checkedItems, [text]: !checkedItems[text] };
    setCheckedItems(newState);
    localStorage.setItem(`trip-checklist-v1-${lang}`, JSON.stringify(newState));
  };

  const handleCNYChange = (val: string) => {
    setAmountCNY(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setAmountKRW((num * rate).toFixed(0));
    } else {
      setAmountKRW('');
    }
  };

  const handleKRWChange = (val: string) => {
    setAmountKRW(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setAmountCNY((num / rate).toFixed(2));
    } else {
      setAmountCNY('');
    }
  };

  if (!type) return null;

  let title = '';
  let content = null;

  switch (type) {
    case 'hotel':
      title = t.menuHotel;
      content = (
        <div className="space-y-4">
          {HOTEL_DATA[lang].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl shadow-journal border border-white relative overflow-hidden group hover:scale-[1.01] transition-transform">
              <div className="absolute top-0 right-0 w-12 h-12 bg-[#f8e8c1] rounded-bl-3xl opacity-50"></div>
              
              <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-2">
                    <span className="bg-[#594a40] text-[#f8e8c1] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                      {item.city}
                    </span>
                    <span className="text-xs font-mono opacity-60 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full">
                      <Calendar size={10} /> {item.date}
                    </span>
                 </div>
              </div>
              
              <h3 className="font-black text-xl text-[#594a40] mb-2 leading-tight pr-8">{item.name}</h3>
              
              <a 
                href={item.amapUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1.5 text-sm opacity-70 hover:opacity-100 hover:text-blue-600 transition-colors mb-4 group/link pl-1"
              >
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#8c735a] group-hover/link:text-blue-600" />
                <span className="underline decoration-dotted underline-offset-4">{item.address}</span>
              </a>

              <div className="mt-1">
                <a 
                  href={item.bookingUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#f8e8c1] text-[#594a40] py-3 rounded-2xl font-bold text-sm hover:bg-[#ebdcb5] active:scale-[0.98] transition-all"
                >
                   <span>Trip.com</span>
                   <ExternalLink size={14} className="opacity-50" />
                </a>
              </div>
            </div>
          ))}
        </div>
      );
      break;

    case 'prep':
      title = t.menuPrep;
      content = (
        <div className="space-y-3 pb-8">
          {PREP_ITEMS[lang].map((item, idx) => {
            const isChecked = checkedItems[item.text] || false;
            return (
              <div 
                key={idx} 
                onClick={() => toggleCheck(item.text)}
                className={`flex flex-col p-5 bg-white rounded-3xl border-2 cursor-pointer transition-all duration-200 ${
                  isChecked 
                    ? 'border-[#594a40]/10 bg-slate-50 opacity-80' 
                    : 'border-[#594a40]/20 hover:border-[#594a40]/40 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`shrink-0 transition-colors duration-200 ${isChecked ? 'text-[#8c735a]' : 'text-[#594a40]/30'}`}>
                    {isChecked ? <CheckSquare size={32} /> : <Square size={32} strokeWidth={1.5} />}
                  </div>
                  <div>
                    <h4 className={`font-bold text-xl leading-snug ${isChecked ? 'text-[#594a40]/50 line-through decoration-2 decoration-[#594a40]/30' : 'text-[#594a40]'}`}>
                      {item.text}
                    </h4>
                  </div>
                </div>
                
                {item.imgUrls && item.imgUrls.length > 0 && !isChecked && (
                  <div className="mt-4 space-y-4 pl-0 sm:pl-12">
                     {item.imgUrls.map((url, i) => (
                          <div key={i} className="rounded-2xl overflow-hidden shadow-sm border border-[#594a40]/10">
                            <img src={url} alt={`Plug Type ${i+1}`} className="w-full h-auto object-cover" />
                          </div>
                     ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
      break;

    case 'info':
      title = t.menuInfo;
      content = (
        <div className="space-y-4">
          <div className="space-y-3">
            {USEFUL_INFO[lang].map((item, idx) => {
              if (item.url) {
                return (
                  <a 
                    key={idx}
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm hover:bg-[#f8e8c1]/20 transition-colors group"
                  >
                     <span className="font-bold text-[#594a40] flex items-center gap-2">
                       {item.label}
                       <ExternalLink size={14} className="opacity-40 group-hover:opacity-100" />
                     </span>
                     <span className="text-sm font-medium bg-[#f8e8c1]/50 px-2 py-1 rounded text-[#594a40] group-hover:bg-[#f8e8c1] transition-colors">{item.value}</span>
                  </a>
                );
              }
              return (
               <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm">
                  <span className="font-bold text-[#594a40]">{item.label}</span>
                  <span className="text-sm font-medium bg-[#f8e8c1]/50 px-2 py-1 rounded text-[#594a40]">{item.value}</span>
               </div>
              );
            })}
          </div>
        </div>
      );
      break;

    case 'currency':
      title = t.menuCurrency;
      content = (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-journal border border-white">
            <div className="flex justify-between items-center mb-4">
               <span className="text-sm font-bold opacity-60 uppercase tracking-wider">{t.exchangeRate}</span>
               <span className="text-xs font-mono bg-[#f8e8c1] px-2 py-1 rounded text-[#594a40]">1 CNY ≈ {rate} KRW</span>
            </div>
            
            <div className="space-y-4 relative">
              <div className="relative">
                <label className="block text-xs font-bold text-[#594a40]/60 mb-1 pl-1">CNY (Chinese Yuan)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🇨🇳</span>
                  <input 
                    type="number" 
                    inputMode="decimal"
                    value={amountCNY}
                    onChange={(e) => handleCNYChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-2xl font-black bg-[#f8e8c1]/30 rounded-2xl border-2 border-transparent focus:border-[#594a40]/20 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-center -my-2 relative z-10">
                 <div className="bg-white p-2 rounded-full shadow-sm border border-[#594a40]/10">
                    <RefreshCcw size={16} className="text-[#594a40]/50" />
                 </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-bold text-[#594a40]/60 mb-1 pl-1">KRW (Korean Won)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🇰🇷</span>
                  <input 
                    type="number" 
                    inputMode="decimal"
                    value={amountKRW}
                    onChange={(e) => handleKRWChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-2xl font-black bg-[#f8e8c1]/30 rounded-2xl border-2 border-transparent focus:border-[#594a40]/20 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
             <a 
               href="https://www.xe.com/currencyconverter/convert/?Amount=1&From=CNY&To=KRW" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 text-sm font-bold text-[#594a40]/60 hover:text-[#594a40] transition-colors underline decoration-dotted underline-offset-4"
             >
                {t.checkXe}
                <ExternalLink size={12} />
             </a>
          </div>
        </div>
      );
      break;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-[#594a40]/20 backdrop-blur-sm transition-all duration-300">
      <div className="bg-[#f8e8c1] w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-soft animate-in slide-in-from-bottom duration-300 text-[#594a40] max-h-[85vh] overflow-y-auto border border-white/50 relative">
        {/* Modal Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#594a40_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10">
            <div className="flex justify-between items-center mb-6 sticky top-0 pb-2 border-b border-[#594a40]/10 bg-[#f8e8c1]/95 backdrop-blur-sm">
            <h2 className="text-2xl font-black">{title}</h2>
            <button onClick={onClose} className="p-2 bg-white/50 rounded-full hover:bg-white transition-colors">
                <X size={20} className="text-[#594a40]" />
            </button>
            </div>
            {content}
        </div>
      </div>
    </div>
  );
};

export default MenuModal;