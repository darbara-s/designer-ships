'use client';

import { useStore } from '@/store/useStore';
import { Check, ChevronDown, Info } from 'lucide-react';
import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';

const LANGUAGE_OPTIONS = ["German", "English", "Spanish", "Turkish", "Arabic", "Polish", "Russian"];

interface CustomSelectProps {
  label: string;
  value: any;
  onChange: (val: any) => void;
  options: { label: string; value: any }[];
  isMulti?: boolean;
  isMobile?: boolean;
}

function CustomSelect({ label, value, onChange, options, isMulti, isMobile }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLabel = () => {
    if (isMulti) {
      const selected = value as string[];
      if (selected.length === 0) return label;
      if (selected.length === 1) return selected[0];
      return `${selected[0]} +${selected.length - 1}`;
    }
    return options.find(o => o.value === value)?.label || label;
  };

  const toggleMulti = (val: string) => {
    const selected = value as string[];
    if (selected.includes(val)) {
      onChange(selected.filter(s => s !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  const hasValue = isMulti ? (value as string[]).length > 0 : value !== 0;

  return (
    <div className="relative flex-1" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-full flex items-center justify-between gap-2 border-[1.5px] transition-all duration-300 rounded-full backdrop-blur-md",
          isMobile ? "px-3 py-2 text-[10px]" : "px-4 py-2.5 text-[11px]",
          "font-[900] tracking-tight uppercase",
          isOpen 
             ? "border-zinc-900 bg-white text-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] scale-[1.02]" 
             : (hasValue ? "border-rose-200 bg-rose-50/70 text-rose-600 hover:bg-rose-100/70 shadow-sm" : "border-zinc-200/60 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-zinc-600 hover:shadow-md")
        )}
      >
        <span className={clsx("truncate", isOpen ? "text-zinc-900" : (hasValue ? "text-rose-600" : "text-zinc-600"))}>
          {getLabel()}
        </span>
        <ChevronDown size={12} strokeWidth={3} className={clsx("transition-transform duration-300 shrink-0", isOpen ? "rotate-180 text-zinc-900" : "text-zinc-400")} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+10px)] left-0 min-w-[180px] bg-white/95 backdrop-blur-xl border border-zinc-100 rounded-[24px] shadow-[0_24px_50px_rgba(0,0,0,0.1),0_0_1px_rgba(0,0,0,0.1)] py-2 z-[100] max-h-64 overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-200 origin-top">
          {options.map(opt => {
            const isSelected = isMulti ? (value as string[]).includes(opt.value) : value === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => { 
                  if (isMulti) toggleMulti(opt.value);
                  else { onChange(opt.value); setIsOpen(false); }
                }}
                className={clsx(
                  "w-full text-left px-5 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-between",
                  isSelected ? "bg-rose-50 text-rose-600" : "hover:bg-zinc-50 text-zinc-600"
                )}
              >
                {opt.label}
                {isSelected && <Check size={14} strokeWidth={4} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function FiltersBar({ isCompact, isMobile }: { isCompact?: boolean; isMobile?: boolean }) {
  const { filters, comparisonLimitReached, setLimitReached } = useStore();

  useEffect(() => {
    if (comparisonLimitReached) {
      const timer = setTimeout(() => setLimitReached(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [comparisonLimitReached, setLimitReached]);

  return (
    <div className={clsx(
      "w-full transition-all duration-300 z-30 flex flex-col gap-4",
      isCompact ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 px-6 py-3 shadow-sm" : "bg-white px-8 py-5",
      isMobile && "!px-3.5"
    )}>
      {/* Selection Limit Alert */}
      {comparisonLimitReached && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-2 z-[60] animate-in slide-in-from-bottom-2 fade-in">
           <Info size={14} className="text-amber-400" />
           Max 3 selection reached
        </div>
      )}

      {/* Actual Filters Row */}
      <div className="flex items-center gap-1.5 sm:gap-2">
          <CustomSelect 
            label="Languages"
            isMulti
            isMobile={isMobile}
            value={filters.languages}
            onChange={(v) => filters.setLanguages(v)}
            options={LANGUAGE_OPTIONS.map(l => ({ label: l, value: l }))}
          />

          <CustomSelect 
            label="Passing rate"
            isMobile={isMobile}
            value={filters.passRateMin}
            onChange={(v) => filters.setPassRateMin(v)}
            options={[
              { label: 'Passing rate', value: 0 },
              { label: '70%+', value: 70 },
              { label: '80%+', value: 80 },
              { label: '90%+', value: 90 },
            ]}
          />

          <CustomSelect 
            label="User rating"
            isMobile={isMobile}
            value={filters.ratingMin}
            onChange={(v) => filters.setRatingMin(v)}
            options={[
              { label: 'User rating', value: 0 },
              { label: '4.0+ Stars', value: 4 },
              { label: '4.5+ Stars', value: 4.5 },
            ]}
          />
      </div>

      {!isCompact && (
        <div className="flex items-center justify-between">
            {/* iOS STYLE TOGGLE: FORCED VISIBILITY */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => filters.toggleIntensiveCourse()}
                className={clsx(
                  "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ease-in-out focus:outline-none items-center",
                  filters.hasIntensiveCourse ? "!bg-rose-500" : "!bg-zinc-300"
                )}
                style={{ backgroundColor: filters.hasIntensiveCourse ? '#ff385c' : '#d4d4d8' }}
              >
                {/* Thumb */}
                <span 
                  className={clsx(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition-all duration-300 ease-in-out",
                    filters.hasIntensiveCourse ? "translate-x-6" : "translate-x-1"
                  )} 
                />
              </button>
              
              <span className={clsx(
                "text-[10px] font-black tracking-[0.1em] uppercase transition-colors pt-0.5",
                filters.hasIntensiveCourse ? "text-rose-600" : "text-gray-600"
              )}>
                Intensive Fast-Track
              </span>
            </div>

            <button 
              onClick={() => { filters.setLanguages([]); filters.setPassRateMin(0); filters.setRatingMin(0); filters.setIntensiveCourse(false); }}
              className="text-[10px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-[0.2em] transition-all bg-rose-50/50 hover:bg-rose-50 px-3 py-1.5 rounded-full"
            >
              Reset
            </button>
        </div>
      )}
    </div>
  );
}
