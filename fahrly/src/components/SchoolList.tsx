'use client';

import { useStore } from '@/store/useStore';
import { SchoolCard } from './SchoolCard';

interface SchoolListProps {
  schools: any[];
}

export function SchoolList({ schools }: SchoolListProps) {
  if (schools.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-400 font-bold">No schools match your filters. Try adjusting them!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {schools?.map((school) => (
        <SchoolCard key={school.id} school={school} />
      ))}
    </div>
  );
}
