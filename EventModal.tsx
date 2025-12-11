

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Translation, TravelEvent, EventCategory } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: TravelEvent) => void;
  initialEvent?: TravelEvent | null;
  t: Translation;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSave, initialEvent, t }) => {
  const [time, setTime] = useState('09:00 - 10:00');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState<EventCategory>('sightseeing');

  useEffect(() => {
    if (isOpen) {
      if (initialEvent) {
        setTime(initialEvent.time);
        setLocation(initialEvent.location);
        setNotes(initialEvent.notes);
        setCategory(initialEvent.category);
      } else {
        // Reset defaults for new event
        setTime('');
        setLocation('');
        setNotes('');
        setCategory('sightseeing');
      }
    }
  }, [isOpen, initialEvent]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!location.trim()) return;
    
    onSave({
      id: initialEvent ? initialEvent.id : crypto.randomUUID(),
      time: time || 'TBD',
      location,
      notes,
      category,
      ...(initialEvent?.mapQuery ? { mapQuery: initialEvent.mapQuery } : {})
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#594a40]/20 backdrop-blur-sm transition-all duration-300">
      <div className="bg-[#f8e8c1] w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-soft animate-in slide-in-from-bottom duration-300 text-[#594a40] border border-white/50 relative overflow-hidden">
        {/* Background texture for modal */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#594a40_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black">
                {initialEvent ? t.editEvent : t.addEvent}
            </h2>
            <button onClick={onClose} className="p-2 bg-white/50 rounded-full hover:bg-white transition-colors">
                <X size={20} className="text-[#594a40]" />
            </button>
            </div>

            <div className="space-y-5">
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-2 pl-1">{t.category}</label>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {(Object.keys(t.categories) as EventCategory[]).map((cat) => {
                    const Icon = CATEGORY_ICONS[cat];
                    const isSelected = category === cat;
                    return (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap border transition-all ${
                        isSelected
                            ? 'bg-[#594a40] text-[#f8e8c1] border-[#594a40] shadow-md transform scale-105'
                            : 'bg-white/80 text-[#594a40] border-transparent hover:bg-white'
                        }`}
                    >
                        <Icon size={14} />
                        {t.categories[cat]}
                    </button>
                    );
                })}
                </div>
            </div>

            <div className="flex gap-4">
                <div className="w-1/3">
                <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-1 pl-1">{t.time}</label>
                <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="09:00 - 11:00"
                    className="w-full px-4 py-3 bg-white/80 rounded-2xl border-2 border-transparent focus:border-[#594a40]/20 focus:outline-none font-bold text-center text-sm"
                />
                </div>
                <div className="w-2/3">
                <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-1 pl-1">{t.location}</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t.yiwu + '...'}
                    className="w-full px-4 py-3 bg-white/80 rounded-2xl border-2 border-transparent focus:border-[#594a40]/20 focus:outline-none font-bold placeholder:font-normal placeholder:opacity-40"
                />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-1 pl-1">{t.notes}</label>
                <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-white/80 rounded-2xl border-2 border-transparent focus:border-[#594a40]/20 focus:outline-none resize-none leading-relaxed"
                />
            </div>

            <button
                onClick={handleSave}
                disabled={!location.trim()}
                className="w-full py-4 mt-2 bg-[#594a40] text-[#f8e8c1] rounded-2xl font-bold shadow-journal active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none text-lg"
            >
                {t.save}
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;