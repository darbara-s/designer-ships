import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SCHOOLS_DATA = [
  {
    id: "1",
    name: "Asphalt Profis Fahrschule",
    address: "Danziger Str. 50, 10435 Berlin (Prenzlauer Berg)",
    lat: 52.5401,
    lng: 13.4150,
    logoUrl: "https://ui-avatars.com/api/?name=Asphalt+Profis&background=18181b&color=71717a&size=128&font-size=0.33&bold=true",
    imgUrl: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop",
    overallRating: 4.9,
    totalReviews: 184,
    passRate: 94,
    priceClass: 2,
    baseFee: 190,
    lessonPrice: 58,
    specialDrivePrice: 68,
    languages: "German;English;Spanish",
    hasIntensiveCourse: true,
    acceptingStudents: true,
  },
  {
    id: "2",
    name: "Driving School Berlin",
    address: "Waitzstraße 12, 10629 Berlin (Charlottenburg)",
    lat: 52.5020,
    lng: 13.3050,
    logoUrl: "https://ui-avatars.com/api/?name=Driving+School&background=e11d48&color=fda4af&size=128&font-size=0.33&bold=true",
    imgUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
    overallRating: 4.8,
    totalReviews: 215,
    passRate: 89,
    priceClass: 3,
    baseFee: 210,
    lessonPrice: 62,
    specialDrivePrice: 72,
    languages: "German;English;Arabic",
    hasIntensiveCourse: true,
    acceptingStudents: true,
  },
  {
    id: "3",
    name: "Fahrschule Ziel",
    address: "Torstraße 164, 10115 Berlin (Mitte)",
    lat: 52.5285,
    lng: 13.3980,
    logoUrl: "https://ui-avatars.com/api/?name=Fahrschule+Ziel&background=2563eb&color=93c5fd&size=128&font-size=0.33&bold=true",
    imgUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    overallRating: 4.7,
    totalReviews: 142,
    passRate: 82,
    priceClass: 1,
    baseFee: 160,
    lessonPrice: 54,
    specialDrivePrice: 64,
    languages: "German;Turkish",
    hasIntensiveCourse: false,
    acceptingStudents: true,
  },
  {
    id: "4",
    name: "The English Driving School",
    address: "Kantstraße 45, 10625 Berlin (Charlottenburg)",
    lat: 52.5065,
    lng: 13.3180,
    logoUrl: "https://ui-avatars.com/api/?name=English+School&background=16a34a&color=86efac&size=128&font-size=0.33&bold=true",
    imgUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop",
    overallRating: 4.9,
    totalReviews: 96,
    passRate: 91,
    priceClass: 2,
    baseFee: 195,
    lessonPrice: 59,
    specialDrivePrice: 69,
    languages: "English;Spanish;German",
    hasIntensiveCourse: true,
    acceptingStudents: true,
  },
  {
    id: "5",
    name: "Fahrschule Oscar",
    address: "Schönhauser Allee 108, 10439 Berlin (Prenzlauer Berg)",
    lat: 52.5488,
    lng: 13.4120,
    logoUrl: "https://ui-avatars.com/api/?name=Fahrschule+Oscar&background=d97706&color=fcd34d&size=128&font-size=0.33&bold=true",
    imgUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
    overallRating: 4.6,
    totalReviews: 128,
    passRate: 78,
    priceClass: 1,
    baseFee: 155,
    lessonPrice: 52,
    specialDrivePrice: 62,
    languages: "German;Russian;Polish",
    hasIntensiveCourse: false,
    acceptingStudents: true,
  },
  {
    id: "6",
    name: "Fahrschule am Alexanderplatz",
    address: "Karl-Liebknecht-Str. 13, 10178 Berlin (Mitte)",
    lat: 52.5219,
    lng: 13.4132,
    logoUrl: "https://ui-avatars.com/api/?name=Fahrschule+Alex&background=9333ea&color=d8b4fe&size=128&font-size=0.33&bold=true",
    imgUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
    overallRating: 4.5,
    totalReviews: 312,
    passRate: 75,
    priceClass: 2,
    baseFee: 180,
    lessonPrice: 56,
    specialDrivePrice: 66,
    languages: "German;English",
    hasIntensiveCourse: true,
    acceptingStudents: true,
  },
  {
    id: "7",
    name: "Fahrschule City West",
    address: "Tauentzienstraße 18, 10789 Berlin (Schöneberg)",
    lat: 52.5028,
    lng: 13.3400,
    logoUrl: "https://ui-avatars.com/api/?name=City+West&background=0891b2&color=67e8f9&size=128&font-size=0.33&bold=true",
    imgUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop",
    overallRating: 4.8,
    totalReviews: 167,
    passRate: 87,
    priceClass: 3,
    baseFee: 220,
    lessonPrice: 65,
    specialDrivePrice: 75,
    languages: "German;English;French",
    hasIntensiveCourse: true,
    acceptingStudents: true,
  },
  {
    id: "8",
    name: "Fahrschule Neukölln Express",
    address: "Karl-Marx-Straße 112, 12043 Berlin (Neukölln)",
    lat: 52.4795,
    lng: 13.4350,
    logoUrl: "https://ui-avatars.com/api/?name=Neukolln+Express&background=be123c&color=fda4af&size=128&font-size=0.33&bold=true",
    imgUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
    overallRating: 4.4,
    totalReviews: 245,
    passRate: 72,
    priceClass: 1,
    baseFee: 145,
    lessonPrice: 50,
    specialDrivePrice: 60,
    languages: "German;Arabic;Turkish",
    hasIntensiveCourse: true,
    acceptingStudents: true,
  }
];

async function main() {
  console.log('🌱 Starting seed...');
  
  // Clear existing schools
  await prisma.school.deleteMany();
  
  for (const school of SCHOOLS_DATA) {
    await prisma.school.create({
      data: school,
    });
  }
  
  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
