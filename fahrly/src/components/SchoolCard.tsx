'use client';

import { useStore } from '@/store/useStore';
import { School } from '@/lib/mockData';
import { Star, MapPin, GitCompare, ChevronRight, Zap } from 'lucide-react';
import clsx from 'clsx';

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  const { toggleCompare, compareIds, setDetailSchoolId, panToSchool, selectedSchoolId } = useStore();
  const isCompared = compareIds.includes(school.id);
  const isSelected = selectedSchoolId === school.id;

  return (
    <div 
      id={`school-card-${school.id}`}
      onClick={() => panToSchool(school)} // WHOLE CARD CLICK SYNC
      className={clsx(
        "group relative rounded-[24px] p-4 transition-all duration-500 cursor-pointer overflow-hidden border-2",
        "scale-[0.99] hover:scale-100 active:scale-[0.98]",
        isSelected 
          ? "bg-zinc-50/50 border-zinc-200 shadow-xl" 
          : (isCompared 
              ? "bg-white border-rose-500 shadow-lg shadow-rose-500/5 rotate-[0.5deg]" 
              : "bg-white border-gray-50 hover:border-gray-100/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
            )
      )}
    >
      <div className="flex gap-4">
        {/* SMALLER LOGO AREA */}
        <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img 
            src={school.logo_url} 
            alt={school.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {school.has_intensive_course && (
            <div className="absolute top-1 left-1 bg-zinc-900/90 backdrop-blur-md text-white px-1.5 py-0.5 rounded-lg flex items-center gap-1 shadow-xl">
               <Zap size={8} className="text-amber-400 fill-amber-400" />
               <span className="text-[7px] font-black uppercase tracking-tighter">Intensive</span>
            </div>
          )}
        </div>

        {/* CONTENT AREA: Focused on Name and Ratings */}
        <div className="flex-1 min-w-0 py-0.5">
          <div className="flex justify-between items-start mb-1.5">
            <h3 className="text-lg font-black text-gray-900 tracking-tight leading-tight line-clamp-1 group-hover:text-rose-500 transition-colors uppercase">{school.name}</h3>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100/50 group-hover:bg-amber-100/50 transition-colors">
              <Star size={12} className="text-amber-500 fill-amber-500" />
              <span className="text-xs font-black text-amber-700">{school.overall_rating}</span>
              <span className="text-[10px] font-bold text-amber-400">({school.total_reviews})</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-gray-400 mb-2">
            <MapPin size={12} className="shrink-0" />
            <span className="text-[11px] font-bold truncate tracking-tight">{school.address}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100/50 flex items-center gap-1.5">
               <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
               {school.pass_rate}% Pass
            </div>
            <div className="bg-zinc-50 text-zinc-400 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-zinc-100 flex items-center gap-1">
               <span className="text-zinc-900">{school.price_range}</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS: MAP FOCUS & COMPARISON */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex gap-1.5 overflow-hidden max-w-[140px] items-center">
           {school.languages.slice(0, 2).map(lang => (
             <span key={lang} className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
                {lang}
             </span>
           ))}
           {school.languages.length > 2 && <span className="text-[9px] font-black text-gray-200">+{school.languages.length - 2}</span>}
        </div>

        <div className="flex items-center gap-2">
           <button 
             onClick={(e) => { e.stopPropagation(); toggleCompare(school.id); }}
             className={clsx(
                "p-2.5 rounded-full transition-all active:scale-90 border",
                isCompared 
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 border-rose-400" 
                  : "bg-white text-gray-400 hover:text-rose-500 border-gray-100 hover:border-rose-100"
             )}
           >
              <GitCompare size={18} strokeWidth={isCompared ? 3 : 2.5} />
           </button>
           
           <button 
             onClick={(e) => { e.stopPropagation(); setDetailSchoolId(school.id); }}
             className="flex items-center gap-2 bg-zinc-900 hover:bg-black text-white px-5 py-2.5 rounded-full font-black text-xs transition-all active:scale-95 shadow-xl shadow-zinc-900/10"
           >
              <span>Details</span>
              <ChevronRight size={14} strokeWidth={3} />
           </button>
        </div>
      </div>
    </div>
  );
}
