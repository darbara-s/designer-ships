export interface School {
  id: string;
  name: string;
  address: string;
  overall_rating: number;
  total_reviews: number;
  pass_rate: number;
  price_class: number;
  price_range: string;
  base_fee: number;
  lesson_price: number;
  special_drive_price: number;
  languages: string[];
  has_intensive_course: boolean;
  accepting_students?: boolean;
  logo_url: string;
  img_url: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const schools: School[] = [
  {
    id: "1",
    name: "Asphalt Profis Fahrschule",
    address: "Danziger Str. 50, 10435 Berlin (Prenzlauer Berg)",
    overall_rating: 4.9,
    total_reviews: 184,
    pass_rate: 94,
    price_class: 2,
    price_range: "€€",
    base_fee: 149,
    lesson_price: 52,
    special_drive_price: 68,
    languages: ["German", "English", "Spanish"],
    has_intensive_course: true,
    logo_url: "https://ui-avatars.com/api/?name=Asphalt+Profis&background=18181b&color=71717a&size=128&font-size=0.33&bold=true",
    img_url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop",
    coordinates: { lat: 52.5401, lng: 13.4150 }
  },
  {
    id: "2",
    name: "Driving School Berlin",
    address: "Waitzstraße 12, 10629 Berlin (Charlottenburg)",
    overall_rating: 4.8,
    total_reviews: 215,
    pass_rate: 88,
    price_class: 3,
    price_range: "€€€",
    base_fee: 250,
    lesson_price: 58,
    special_drive_price: 72,
    languages: ["German", "English", "Arabic"],
    has_intensive_course: true,
    logo_url: "https://ui-avatars.com/api/?name=Driving+School&background=e11d48&color=fda4af&size=128&font-size=0.33&bold=true",
    img_url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
    coordinates: { lat: 52.5020, lng: 13.3050 }
  },
  {
    id: "3",
    name: "Fahrschule Ziel",
    address: "Torstraße 164, 10115 Berlin (Mitte)",
    overall_rating: 4.7,
    total_reviews: 142,
    pass_rate: 84,
    price_class: 1,
    price_range: "€",
    base_fee: 99,
    lesson_price: 49,
    special_drive_price: 64,
    languages: ["German", "Turkish"],
    has_intensive_course: false,
    logo_url: "https://ui-avatars.com/api/?name=Fahrschule+Ziel&background=2563eb&color=93c5fd&size=128&font-size=0.33&bold=true",
    img_url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    coordinates: { lat: 52.5285, lng: 13.3980 }
  },
  {
    id: "4",
    name: "The English Driving School",
    address: "Kantstraße 45, 10625 Berlin (Charlottenburg)",
    overall_rating: 4.9,
    total_reviews: 96,
    pass_rate: 96,
    price_class: 3,
    price_range: "€€€",
    base_fee: 299,
    lesson_price: 65,
    special_drive_price: 69,
    languages: ["English", "Spanish", "German"],
    has_intensive_course: true,
    logo_url: "https://ui-avatars.com/api/?name=English+School&background=16a34a&color=86efac&size=128&font-size=0.33&bold=true",
    img_url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop",
    coordinates: { lat: 52.5065, lng: 13.3180 }
  },
  {
    id: "5",
    name: "Fahrschule Oscar",
    address: "Schönhauser Allee 108, 10439 Berlin (Prenzlauer Berg)",
    overall_rating: 4.6,
    total_reviews: 128,
    pass_rate: 82,
    price_class: 2,
    price_range: "€€",
    base_fee: 150,
    lesson_price: 48,
    special_drive_price: 62,
    languages: ["German", "Russian", "Polish"],
    has_intensive_course: false,
    logo_url: "https://ui-avatars.com/api/?name=Fahrschule+Oscar&background=d97706&color=fcd34d&size=128&font-size=0.33&bold=true",
    img_url: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
    coordinates: { lat: 52.5488, lng: 13.4120 }
  },
  {
    id: "6",
    name: "Fahrschule am Alexanderplatz",
    address: "Karl-Liebknecht-Str. 13, 10178 Berlin (Mitte)",
    overall_rating: 4.5,
    total_reviews: 312,
    pass_rate: 79,
    price_class: 1,
    price_range: "€",
    base_fee: 80,
    lesson_price: 45,
    special_drive_price: 66,
    languages: ["German", "English"],
    has_intensive_course: true,
    logo_url: "https://ui-avatars.com/api/?name=Fahrschule+Alex&background=9333ea&color=d8b4fe&size=128&font-size=0.33&bold=true",
    img_url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
    coordinates: { lat: 52.5219, lng: 13.4132 }
  },
  {
    id: "7",
    name: "Fahrschule City West",
    address: "Tauentzienstraße 18, 10789 Berlin (Schöneberg)",
    overall_rating: 4.8,
    total_reviews: 167,
    pass_rate: 91,
    price_class: 3,
    price_range: "€€€",
    base_fee: 210,
    lesson_price: 60,
    special_drive_price: 75,
    languages: ["German", "English", "French"],
    has_intensive_course: true,
    logo_url: "https://ui-avatars.com/api/?name=City+West&background=0891b2&color=67e8f9&size=128&font-size=0.33&bold=true",
    img_url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop",
    coordinates: { lat: 52.5028, lng: 13.3400 }
  },
  {
    id: "8",
    name: "Fahrschule Neukölln Express",
    address: "Karl-Marx-Straße 112, 12043 Berlin (Neukölln)",
    overall_rating: 4.4,
    total_reviews: 245,
    pass_rate: 75,
    price_class: 1,
    price_range: "€",
    base_fee: 89,
    lesson_price: 42,
    special_drive_price: 60,
    languages: ["German", "Arabic", "Turkish"],
    has_intensive_course: true,
    logo_url: "https://ui-avatars.com/api/?name=Neukolln+Express&background=be123c&color=fda4af&size=128&font-size=0.33&bold=true",
    img_url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
    coordinates: { lat: 52.4795, lng: 13.4350 }
  }
];
