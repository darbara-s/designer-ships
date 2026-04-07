import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { schools as mockDataSchools } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse filters from query params
    const languages = searchParams.get('languages')?.split(';').filter(Boolean) || [];
    const minPassRate = parseInt(searchParams.get('minPassRate') || '0');
    const minRating = parseFloat(searchParams.get('minRating') || '0');
    const intensiveOnly = searchParams.get('intensiveOnly') === 'true';

    let schools: any[] = [];
    
    try {
      // Build Prisma query
      const where: any = {
        passRate: { gte: minPassRate },
        overallRating: { gte: minRating },
      };

      if (intensiveOnly) {
        where.hasIntensiveCourse = true;
      }

      schools = await prisma.school.findMany({
        where,
        orderBy: { overallRating: 'desc' },
      });
      
      if (schools.length === 0 && !intensiveOnly && minPassRate === 0 && minRating === 0) {
        throw new Error("Database returned 0 schools on default load, falling back to mock data");
      }
    } catch (dbError) {
      console.warn("Database failed or empty, falling back to mock data:", dbError);
      
      schools = mockDataSchools.filter(s => {
        if (s.pass_rate < minPassRate) return false;
        if (s.overall_rating < minRating) return false;
        if (intensiveOnly && !s.has_intensive_course) return false;
        return true;
      }).map(s => ({
        id: s.id,
        name: s.name,
        address: s.address,
        lat: s.coordinates.lat,
        lng: s.coordinates.lng,
        logoUrl: s.logo_url,
        imgUrl: s.img_url,
        overallRating: s.overall_rating,
        totalReviews: s.total_reviews,
        passRate: s.pass_rate,
        priceClass: s.price_class,
        baseFee: s.base_fee,
        lessonPrice: s.lesson_price,
        specialDrivePrice: s.special_drive_price,
        languages: s.languages.join(';'),
        hasIntensiveCourse: s.has_intensive_course,
        acceptingStudents: s.accepting_students ?? true,
      }));
    }

    // Client-side filtering for languages (since they are stored as a string in SQLite)
    const filteredSchools = schools.filter(school => {
      if (languages.length === 0) return true;
      const schoolLangs = school.languages.split(';');
      return languages.some(lang => schoolLangs.includes(lang));
    });

    // Format back to the app's School interface
    const formattedSchools = filteredSchools.map(school => ({
      id: school.id,
      name: school.name,
      address: school.address,
      coordinates: { lat: school.lat, lng: school.lng },
      logo_url: school.logoUrl,
      img_url: school.imgUrl,
      overall_rating: school.overallRating,
      total_reviews: school.totalReviews,
      pass_rate: school.passRate,
      price_class: school.priceClass,
      price_range: "€".repeat(school.priceClass),
      base_fee: school.baseFee,
      lesson_price: school.lessonPrice,
      special_drive_price: school.specialDrivePrice,
      languages: school.languages.split(';'),
      has_intensive_course: school.hasIntensiveCourse,
      accepting_students: school.acceptingStudents,
    }));

    return NextResponse.json(formattedSchools);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
  }
}
