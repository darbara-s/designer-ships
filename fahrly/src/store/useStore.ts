import { create } from 'zustand';
import { School } from '@/lib/mockData';
import { Map as LeafletMap } from 'leaflet';

interface FilterState {
  languages: string[];
  passRateMin: number;
  ratingMin: number;
  hasIntensiveCourse: boolean;
  priceRange: string[];
  setLanguages: (languages: string[]) => void;
  setPassRateMin: (rate: number) => void;
  setRatingMin: (rating: number) => void;
  setIntensiveCourse: (val: boolean) => void;
  toggleIntensiveCourse: () => void;
  setPriceRange: (ranges: string[]) => void;
}

interface AppState {
  schools: School[];
  loading: boolean;
  selectedSchoolId: string | null;
  hoveredSchoolId: string | null;
  detailSchoolId: string | null;
  compareIds: string[];
  isComparing: boolean;
  comparisonLimitReached: boolean;
  mapInstance: LeafletMap | null;
  setSchools: (schools: School[]) => void;
  setLoading: (loading: boolean) => void;
  setSelectedSchoolId: (id: string | null) => void;
  setHoveredSchoolId: (id: string | null) => void;
  setDetailSchoolId: (id: string | null) => void;
  setMapInstance: (map: LeafletMap | null) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  setComparing: (val: boolean) => void;
  setLimitReached: (val: boolean) => void;
  panToSchool: (school: School) => void;
  filters: FilterState;
  fetchSchools: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  schools: [],
  loading: false,
  selectedSchoolId: null,
  hoveredSchoolId: null,
  detailSchoolId: null,
  compareIds: [],
  isComparing: false,
  comparisonLimitReached: false,
  mapInstance: null,
  setSchools: (schools) => set({ schools }),
  setLoading: (loading) => set({ loading }),
  setSelectedSchoolId: (id) => set({ selectedSchoolId: id }),
  setHoveredSchoolId: (id) => set({ hoveredSchoolId: id }),
  setDetailSchoolId: (id) => set({ detailSchoolId: id }),
  setMapInstance: (map) => set({ mapInstance: map }),
  setLimitReached: (val) => set({ comparisonLimitReached: val }),
  
  toggleCompare: (id) => set((state) => {
    if (state.compareIds.includes(id)) {
      return { compareIds: state.compareIds.filter((c) => c !== id), comparisonLimitReached: false };
    }
    if (state.compareIds.length >= 3) {
      return { comparisonLimitReached: true };
    }
    return { compareIds: [...state.compareIds, id], comparisonLimitReached: false };
  }),

  clearCompare: () => set({ compareIds: [], isComparing: false, comparisonLimitReached: false }),
  setComparing: (val) => set({ isComparing: val }),

  panToSchool: (school) => {
    const map = get().mapInstance;
    if (map) {
      map.flyTo([school.coordinates.lat, school.coordinates.lng], 15, { duration: 1.5 });
      set({ selectedSchoolId: school.id });
    }
  },

  filters: {
    languages: [],
    passRateMin: 0,
    ratingMin: 0,
    hasIntensiveCourse: false,
    priceRange: [],
    setLanguages: (languages) => {
      set((state) => ({ filters: { ...state.filters, languages } }));
      get().fetchSchools();
    },
    setPassRateMin: (passRateMin) => {
      set((state) => ({ filters: { ...state.filters, passRateMin } }));
      get().fetchSchools();
    },
    setRatingMin: (ratingMin) => {
      set((state) => ({ filters: { ...state.filters, ratingMin } }));
      get().fetchSchools();
    },
    toggleIntensiveCourse: () => {
      set((state) => ({
        filters: { ...state.filters, hasIntensiveCourse: !state.filters.hasIntensiveCourse }
      }));
      get().fetchSchools();
    },
    setIntensiveCourse: (hasIntensiveCourse: boolean) => {
      set((state) => ({ filters: { ...state.filters, hasIntensiveCourse } }));
      get().fetchSchools();
    },
    setPriceRange: (priceRange) => {
      set((state) => ({ filters: { ...state.filters, priceRange } }));
      get().fetchSchools();
    },
  },

  fetchSchools: async () => {
    set({ loading: true });
    try {
      const { filters } = get();
      const params = new URLSearchParams();
      if (filters.languages.length > 0) params.append('languages', filters.languages.join(';'));
      if (filters.passRateMin > 0) params.append('minPassRate', filters.passRateMin.toString());
      if (filters.ratingMin > 0) params.append('minRating', filters.ratingMin.toString());
      if (filters.hasIntensiveCourse) params.append('intensiveOnly', 'true');

      const response = await fetch(`/api/schools?${params.toString()}`);
      const data = await response.json();
      set({ schools: data });
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      set({ loading: false });
    }
  }
}));
