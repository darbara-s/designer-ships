import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse filters from query params
    const languages = searchParams.get('languages')?.split(';').filter(Boolean) || [];
    const minPassRate = parseInt(searchParams.get('minPassRate') || '0');
    const minRating = parseFloat(searchParams.get('minRating') || '0');
    const intensiveOnly = searchParams.get('intensiveOnly') === 'true';

    // Build Prisma query
    const where: any = {
      passRate: { gte: minPassRate },
      overallRating: { gte: minRating },
    };

    // FIX: Strictly handle the Boolean filter
    if (intensiveOnly) {
      where.hasIntensiveCourse = true;
    }

    const schools = await prisma.school.findMany({
      where,
      orderBy: { overallRating: 'desc' },
    });

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
