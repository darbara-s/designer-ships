'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { School } from '@/lib/mockData';
import { useStore } from '@/store/useStore';
import { MapPin } from 'lucide-react';
import { useEffect } from 'react';

const TILE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

// Simple Diamond Marker Icon
const createCustomIcon = (passRate: number, isSelected: boolean) => {
  const color = passRate >= 90 ? '#10b981' : passRate >= 75 ? '#f59e0b' : '#ef4444';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative flex items-center justify-center transition-all duration-300">
        <div class="flex items-center justify-center w-12 h-12 transition-all ${isSelected ? 'scale-125' : 'scale-100 hover:scale-110'}">
          <div class="w-9 h-9 rotate-45 rounded-lg flex items-center justify-center overflow-hidden border-2 border-white shadow-2xl" 
               style="background: linear-gradient(135deg, ${color}, ${color}dd); box-shadow: 0 4px 12px ${color}40;">
            <span class="rotate-[-45deg] text-[10px] font-black text-white tracking-tighter">${passRate}%</span>
          </div>
        </div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -20],
  });
};

function MapEventHandler() {
  const map = useMap();
  const setMapInstance = useStore(state => state.setMapInstance);

  useEffect(() => {
    setMapInstance(map);
    return () => setMapInstance(null);
  }, [map, setMapInstance]);

  return null;
}

export default function MapComponent({ schools }: { schools: School[] }) {
  const { selectedSchoolId, setSelectedSchoolId } = useStore();

  return (
    <div className="w-full h-full relative group">
      <MapContainer
        center={[52.52, 13.405]} // Berlin
        zoom={12}
        style={{ height: '100%', width: '100%', background: '#f8fafc' }}
        zoomControl={false}
      >
        <TileLayer url={TILE_LAYER} />
        <MapEventHandler />
        <ZoomControl position="bottomright" />

        {schools.map((school) => (
          <Marker
            key={school.id}
            position={[school.coordinates.lat, school.coordinates.lng]}
            icon={createCustomIcon(school.pass_rate, selectedSchoolId === school.id)}
            eventHandlers={{
              click: () => {
                setSelectedSchoolId(school.id);
                // Bi-directional Sync: Auto-scroll list to card
                const el = document.getElementById(`school-card-${school.id}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
          >
            <Popup className="premium-popup shadow-2xl" maxWidth={280}>
              {/* MINIMAL POPUP: NO METRICS, NO CTA */}
              <div className="p-4 flex gap-4 min-w-[240px] items-start bg-white">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white shrink-0">
                  <img src={school.logo_url} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 pr-1">
                  <h3 className="text-sm font-black text-zinc-900 tracking-tight leading-tight mb-1 uppercase">{school.name}</h3>
                  <div className="flex items-start gap-1 opacity-40">
                     <MapPin size={10} className="mt-0.5 shrink-0" />
                     <span className="text-[10px] font-bold break-words line-clamp-2">{school.address}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend: Count Indicator */}
      <div className="absolute top-6 right-6 z-[1000]">
         <div className="bg-white/95 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">{schools.length} Schools in Sight</span>
         </div>
      </div>
    </div>
  );
}
