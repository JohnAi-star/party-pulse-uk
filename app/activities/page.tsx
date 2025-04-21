"use client";

import { useState } from 'react';
import ActivityFilters from '@/components/activities/ActivityFilters';
import ActivityGrid from '@/components/activities/ActivityGrid';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { MOCK_ACTIVITIES } from '@/lib/constants';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    priceRange: [0, 100],
    groupSize: '',
  });

  const updateFilters = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
    // In a real app, we would filter the activities based on the filters
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Activities</h1>
      <p className="text-muted-foreground mb-8">Find and book the perfect activity for your group</p>
      
      <div className="lg:grid lg:grid-cols-4 gap-8">
        {/* Mobile filter button */}
        <div className="lg:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <ActivityFilters filters={filters} updateFilters={updateFilters} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Desktop filters */}
        <div className="hidden lg:block">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <ActivityFilters filters={filters} updateFilters={updateFilters} />
        </div>
        
        {/* Activity grid */}
        <div className="lg:col-span-3">
          <ActivityGrid activities={activities} />
        </div>
      </div>
    </div>
  );
}