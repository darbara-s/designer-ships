'use client';

import { useStore } from '@/store/useStore';
import { X, CheckCircle2, Star, Globe2, Euro, Zap, GraduationCap, ArrowLeft, Plus } from 'lucide-react';
import clsx from 'clsx';

export function ComparisonOverlay() {
  const { isComparing, setComparing, compareIds, schools, toggleCompare } = useStore();

  if (!isComparing) return null;

  const selectedSchools = schools.filter(s => compareIds.includes(s.id));
  const numSelected = selectedSchools.length;

  return (
    <div className="fixed inset-0 z-[20000] bg-white animate-in slide-in-from-bottom duration-500 flex flex-col font-sans">
      {/* GLOBAL HEADER */}
      <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
           <button 
             onClick={() => setComparing(false)}
             className="p-3 bg-zinc-900 text-white rounded-2xl shadow-xl shadow-zinc-900/20 active:scale-95 transition-all"
           >
             <ArrowLeft size={20} strokeWidth={3} />
           </button>
           <div>
             <h2 className="text-xl font-black tracking-tight text-zinc-900 uppercase">Comparing {numSelected} schools</h2>
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Direct side-by-side analysis</span>
           </div>
        </div>
        <button 
          onClick={() => setComparing(false)}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 hover:text-rose-600 transition-colors"
        >
          Close [ESC]
        </button>
      </div>

      {/* COMPARISON BODY WITH STICKY LABELS COLUMN */}
      <div className="flex-1 overflow-x-auto bg-[#fafafa] relative scroll-smooth no-scrollbar lg:p-6 pb-24">
        {/* The Grid - Force a minimum width to enable scrolling on small viewports */}
        <div className="inline-grid grid-cols-[140px_minmax(280px,1fr)_minmax(280px,1fr)_minmax(280px,1fr)] min-w-[900px] lg:min-w-full bg-gray-100/50 rounded-[28px] overflow-hidden border border-gray-100 shadow-xl lg:max-w-6xl lg:mx-auto">
          
          {/* STICKY LABELS COLUMN */}
          <div className="sticky left-0 z-30 flex flex-col bg-white">
             <div className="h-44 border-b border-gray-100 flex items-center p-4">
                <span className="text-sm font-bold text-gray-800 tracking-tight">Features</span>
             </div>
             <div className="h-16 border-b border-gray-100 flex items-center px-4 font-semibold text-sm text-gray-600">Rating</div>
             <div className="h-16 border-b border-gray-100 flex items-center px-4 font-semibold text-sm text-gray-600">Pass Rate</div>
             <div className="h-16 border-b border-gray-100 flex items-center px-4 font-semibold text-sm text-gray-600">Pricing</div>
             <div className="h-20 border-b border-gray-100 flex items-center px-4 font-semibold text-sm text-gray-600">Languages</div>
             <div className="h-16 flex items-center px-4 font-semibold text-sm text-gray-600">Intensive Course</div>
          </div>

          {/* DYNAMIC DATA COLUMNS */}
          {Array.from({ length: 3 }).map((_, idx) => {
            const school = selectedSchools[idx];
            const isFirst = idx === 0;
            
            if (!school) {
              return (
                <div key={idx} className="flex flex-col items-center justify-center p-8 bg-white/50 border-l border-gray-100/50">
                    <div className="text-center group cursor-pointer" onClick={() => setComparing(false)}>
                       <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mx-auto mb-4 text-gray-300 group-hover:border-rose-400 group-hover:text-rose-400 transition-all">
                           <Plus size={20} strokeWidth={3} />
                       </div>
                       <p className="text-xs font-semibold text-gray-400 group-hover:text-rose-500 transition-colors">Select another school</p>
                    </div>
                </div>
              );
            }

            return (
              <div key={school.id} className={clsx(
                "flex flex-col transition-all relative border-l border-gray-100/50",
                isFirst ? "bg-emerald-50/60 rounded-xl m-1" : "bg-white m-1"
              )}>
                {/* Minimized School Profile */}
                <div className="h-44 p-6 border-b border-gray-100/50 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-md mb-4 border border-gray-100 bg-white">
                      <img src={school.logo_url} alt={school.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 tracking-tight leading-tight line-clamp-2">{school.name}</h3>
                </div>

                {/* Rating */}
                <div className="h-16 p-4 border-b border-gray-100/50 flex items-center justify-center font-medium text-gray-700 text-sm">
                  {school.overall_rating} ({school.total_reviews} reviews)
                </div>

                {/* Pass Rate */}
                <div className="h-16 p-4 border-b border-gray-100/50 flex items-center justify-center text-sm font-medium text-gray-700">
                  {school.pass_rate}% pass rate
                </div>

                {/* Pricing */}
                <div className="h-16 p-4 border-b border-gray-100/50 flex items-center justify-center">
                   <div className="flex gap-0.5">
                      {[1,2,3].map(i => (
                        <Euro key={i} size={16} className={clsx(i <= (school.price_class || 1) ? "text-emerald-500" : "text-gray-200")} strokeWidth={3} />
                      ))}
                   </div>
                </div>

                {/* Languages */}
                <div className="h-20 p-4 border-b border-gray-100/50 flex flex-col justify-center items-center text-sm font-medium text-gray-600 text-center">
                   <div className="line-clamp-2 leading-tight">
                     {school.languages.join(", ")}
                   </div>
                </div>

                {/* Intensive */}
                <div className="h-16 p-4 flex items-center justify-center">
                   {school.has_intensive_course ? (
                     <CheckCircle2 size={20} className="text-emerald-500" strokeWidth={2.5} />
                   ) : (
                     <X size={20} className="text-rose-500" strokeWidth={2.5} />
                   )}
                </div>
                
                {/* Remove Button for Column */}
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleCompare(school.id); }} 
                  className="absolute top-4 right-4 bg-white/80 text-gray-400 p-1.5 rounded-full opacity-0 hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white shadow-sm border border-gray-100"
                >
                  <X size={14} strokeWidth={3} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
