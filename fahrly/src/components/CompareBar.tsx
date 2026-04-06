'use client';

import { useStore } from '@/store/useStore';
import { X, GitCompare, LayoutGrid, Info, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

/**
 * REFACTORED COMPARE BAR: ABSOLUTE SOLIDITY FIX
 * 1. FIX: Explicitly set background-color and opacity for Mobile FAB.
 * 2. Visual: Matching primary color to brand-consistent 'Rose-500'.
 * 3. UX: Solid button state transitions for better feedback.
 */

export function CompareBar() {
  const { 
    compareIds, 
    toggleCompare, 
    clearCompare, 
    setComparing, 
    schools, 
    loading, 
    comparisonLimitReached, 
    setLimitReached 
  } = useStore();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (comparisonLimitReached) {
      const timer = setTimeout(() => setLimitReached(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [comparisonLimitReached, setLimitReached]);

  if (compareIds.length === 0) return null;

  const compareSchools = compareIds
    .map(id => schools.find(s => s.id === id)!)
    .filter(Boolean);

  const canCompare = compareIds.length >= 2;

  // -- MOBILE FAB VIEW (EXPLICIT SOLID BACKGROUND)
  if (isMobile) {
    return (
      <div className="fixed bottom-24 right-6 z-[20000] pointer-events-none">
        <button 
          onClick={() => { if (canCompare) setComparing(true); else alert("Select one more school to compare!"); }}
          className={clsx(
            "pointer-events-auto w-16 h-16 rounded-full flex items-center justify-center transition-all border-2 border-white animate-in zoom-in duration-300 relative shadow-[0_15px_45px_rgba(0,0,0,0.2)]",
            "bg-white !opacity-100", // FORCE PURE SOLID WHITE
            canCompare ? "text-rose-500" : "text-gray-300"
          )}
          style={{ backgroundColor: '#ffffff', opacity: 1 }} // INLINE FALLBACK FOR EXTRA SOLIDITY
        >
          <GitCompare size={28} strokeWidth={3} />
          {/* Notification Badge: Solid Black */}
          <div className="absolute -top-1 -right-1 bg-zinc-900 text-white min-w-[24px] h-6 px-1.5 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-md !opacity-100">
            {compareIds.length}
          </div>
        </button>
      </div>
    );
  }

  // -- DESKTOP HORIZONTAL BAR
  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[15000] w-full max-w-2xl px-4 pointer-events-none font-sans">
      
      {/* Toast Notification */}
      {comparisonLimitReached && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 z-[16000] animate-in slide-in-from-bottom-2 fade-in">
           <Info size={16} className="text-amber-400" />
           Max 3 selection reached
        </div>
      )}

      {/* Main Bar: Solid Light Mode */}
      <div className="bg-white border-2 border-gray-100 rounded-[32px] py-4 px-6 flex items-center gap-6 pointer-events-auto animate-in slide-in-from-bottom-10 duration-700 shadow-[0_25px_60px_rgba(0,0,0,0.1)]">
        
        {/* Indicators */}
        <div className="flex items-center gap-3 shrink-0">
          <div className={clsx("p-2.5 rounded-full transition-all border", canCompare ? "bg-rose-50 text-rose-500 border-rose-100" : "bg-gray-100 border-gray-200 text-gray-400")}>
            <GitCompare size={20} strokeWidth={3} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-zinc-900 tracking-tight uppercase italic leading-none pt-0.5">Selection</span>
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.1em] mt-1.5">
              {compareIds.length} Schools
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex items-center gap-2.5 flex-1 overflow-x-auto no-scrollbar py-1">
          {compareSchools.map(school => (
            <div 
              key={school.id} 
              className="group relative flex items-center bg-gray-50 border border-gray-100 rounded-full p-1.5 shrink-0 w-12 h-12"
            >
              <img src={school.logo_url} alt={school.name} className="w-full h-full object-cover rounded-full" />
              <button 
                onClick={(e) => { e.stopPropagation(); toggleCompare(school.id); }} 
                className="absolute -top-2 -right-2 bg-white text-zinc-300 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white border border-gray-100 shadow-md"
              >
                <X size={10} strokeWidth={4} />
              </button>
            </div>
          ))}
          {compareIds.length < 2 && (
             <div className="flex items-center gap-2 px-2 animate-pulse">
                <div className="w-8 h-8 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-gray-300">
                   <ArrowRight size={14} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">Select one more</span>
             </div>
          )}
        </div>

        {/* Action Column */}
        <div className="flex items-center gap-6 shrink-0 border-l-2 border-gray-100 pl-6 ml-2">
          <button
            onClick={clearCompare}
            className="text-[11px] font-black text-zinc-400 hover:text-rose-500 uppercase tracking-widest transition-all"
          >
            Clear
          </button>
          
          {/* SOLID PRIMARY CTA */}
          <button
            onClick={() => { if (canCompare) setComparing(true); }}
            disabled={loading}
            className={clsx(
              "flex items-center gap-3 h-14 px-10 rounded-full font-black text-[14px] uppercase tracking-[0.1em] transition-all shrink-0 border",
              canCompare 
                ? "bg-rose-500 text-white border-rose-600 hover:bg-rose-600 shadow-[0_10px_30px_rgba(244,63,94,0.3)] active:scale-95" 
                : "bg-gray-100 text-zinc-300 border-gray-200 cursor-not-allowed"
            )}
          >
            <LayoutGrid size={18} strokeWidth={3} />
            <span className="pt-0.5">Compare</span>
          </button>
        </div>
      </div>
    </div>
  );
}
