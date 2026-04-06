'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { useStore } from '@/store/useStore';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

// Dynamic imports with specific hydration handling
const FiltersBar = dynamic(
  () => import('@/components/FiltersBar').then(mod => mod.FiltersBar),
  { ssr: false }
);

const SchoolList = dynamic(
  () => import('@/components/SchoolList').then(mod => mod.SchoolList),
  { ssr: false }
);

const CompareBar = dynamic(
  () => import('@/components/CompareBar').then(mod => mod.CompareBar),
  { ssr: false }
);

const SchoolDetailModal = dynamic(
  () => import('@/components/SchoolDetailModal').then(mod => mod.SchoolDetailModal),
  { ssr: false }
);

const ComparisonOverlay = dynamic(
  () => import('@/components/ComparisonOverlay').then(mod => mod.ComparisonOverlay),
  { ssr: false }
);

const MapComponent = dynamic(
  () => import('@/components/MapComponent'),
  {
    ssr: false,
    loading: () => (
      <div style={{ width: '100%', height: '100%', background: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontWeight: 900 }}>
        Loading Map…
      </div>
    )
  }
);

export default function Home() {
  const { schools, loading, fetchSchools, detailSchoolId, setDetailSchoolId } = useStore();
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerFull, setDrawerFull] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setIsScrolled(scrollRef.current.scrollTop > 80);
      }
    };
    const node = scrollRef.current;
    if (node) node.addEventListener('scroll', handleScroll, { passive: true });
    return () => node?.removeEventListener('scroll', handleScroll);
  }, []);

  const detailSchool = detailSchoolId
    ? schools.find(s => s.id === detailSchoolId) ?? null
    : null;

  if (!isMounted) return <div className="h-screen bg-white" />;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white selection:bg-rose-100 font-sans">
      <Header />

      <main className="flex-1 flex overflow-hidden relative">
        {/* DESKTOP VIEW */}
        {!isMobile ? (
          <>
            {/* List Sidebar (45% Balanced) */}
            <div 
              ref={scrollRef}
              style={{ width: '45%', minWidth: '460px' }}
              className="flex flex-col h-full bg-white relative z-10 overflow-y-auto no-scrollbar scroll-smooth"
            >
              <div className="sticky top-0 z-40 w-full transition-all duration-300">
                <FiltersBar isCompact={isScrolled} />
              </div>
              
              <div className="px-8 pb-32"> {/* REDUCED BOTTOM PADDING */}
                <div className="mt-2 mb-2 flex items-center justify-between"> {/* REDUCED VERTICAL MT-4 TO MT-2 */}
                   <div className="flex items-center gap-2 opacity-30">
                       {loading && <Loader2 size={10} className="animate-spin text-rose-500" />}
                       <span className="text-[9px] font-black uppercase tracking-[0.2em]">{schools.length} Local Schools</span>
                   </div>
                </div>
                <SchoolList schools={schools} />
              </div>
            </div>

            {/* Map (55%) */}
            <div style={{ width: '55%' }} className="h-full relative z-0 border-l border-gray-50">
              <MapComponent key="map-desktop" schools={schools} />
            </div>
          </>
        ) : (
          /* MOBILE VIEW */
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                <MapComponent key="map-mobile" schools={schools} />
            </div>

            <div 
              className={clsx(
                "absolute left-0 right-0 bottom-0 z-20 bg-white rounded-t-[32px] shadow-[0_-20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 ease-in-out flex flex-col",
                drawerFull ? "h-[85vh]" : "h-[28vh]"
              )}
            >
              <button 
                onClick={() => setDrawerFull(!drawerFull)}
                className="w-full flex flex-col items-center pt-4 pb-2 shrink-0 group active:scale-95 transition-transform"
              >
                <div className="w-10 h-1 bg-gray-200 rounded-full group-hover:bg-rose-100 transition-colors" />
              </button>

              <div className="flex-1 overflow-y-auto px-5 pb-32 no-scrollbar scroll-smooth">
                {drawerFull && (
                   <div className="mb-4 pt-0 pb-4 animate-in fade-in slide-in-from-top-1 duration-300">
                      <FiltersBar isMobile />
                   </div>
                )}
                
                <div className="mt-0"> {/* REMOVED MT-2 */}
                   {!drawerFull && <p className="text-[10px] font-black text-gray-200 uppercase tracking-widest text-center mb-6">{schools.length} Schools in Berlin</p>}
                   <SchoolList schools={schools} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <CompareBar />
      <ComparisonOverlay />

      {detailSchool && (
        <SchoolDetailModal
          school={detailSchool}
          onClose={() => setDetailSchoolId(null)}
        />
      )}
    </div>
  );
}
