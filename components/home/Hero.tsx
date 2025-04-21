"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CITIES } from '@/lib/constants';
import { Search } from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let queryParams = new URLSearchParams();
    
    if (searchQuery) {
      queryParams.append('query', searchQuery);
    }
    
    if (selectedCity) {
      queryParams.append('location', selectedCity);
    }
    
    router.push(`/activities?${queryParams.toString()}`);
  };

  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-[600px] w-full">
        <Image
          src="https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Group of friends celebrating"
          fill
          priority
          className="object-cover brightness-[0.65]"
        />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
            Find Unforgettable Group Experiences
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Discover and book amazing activities for hen parties, stag dos, team building, birthdays and more
          </p>
          
          {/* Search Form */}
          <form 
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl bg-white p-4 rounded-lg shadow-xl"
          >
            <Input
              placeholder="Search activities..."
              className="flex-grow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}