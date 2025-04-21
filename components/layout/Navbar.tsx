"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Menu, Search, X, PartyPopper } from 'lucide-react';

const navLinks = [
  { href: '/activities', label: 'Activities' },
  { href: '/locations', label: 'Locations' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border">
      {/* Main navbar */}
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Mobile menu button */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="text-xl font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <PartyPopper className="h-6 w-6 text-primary mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Party Pulse
            </span>
          </Link>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-xl font-medium transition-colors hover:text-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search button and mobile search */}
        <div className="flex items-center">
          <div className={`${searchVisible ? 'flex' : 'hidden'} absolute inset-x-0 top-0 h-16 bg-background lg:static lg:inset-auto lg:h-auto lg:w-[260px] lg:flex`}>
            <Input 
              placeholder="Search activities or locations..." 
              className="h-10 text-[1rem] w-full border-0 bg-muted px-4 lg:border lg:bg-background"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-3 lg:right-0 lg:top-0"
              onClick={() => setSearchVisible(false)}
            >
              <X className="h-5 w-5 lg:hidden" />
              <span className="sr-only">Close search</span>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={`${searchVisible ? 'hidden' : 'flex'} lg:hidden`}
            onClick={() => setSearchVisible(true)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
  );
}