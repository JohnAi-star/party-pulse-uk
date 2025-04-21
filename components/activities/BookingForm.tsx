"use client";

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface BookingFormProps {
  activity: {
    id: string;
    title: string;
    priceFrom: number;
  };
}

export default function BookingForm({ activity }: BookingFormProps) {
  const [date, setDate] = useState<Date>();
  const [groupSize, setGroupSize] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle form submission to the server
    setFormSubmitted(true);
  };
  
  if (formSubmitted) {
    return (
      <div className="text-center py-4">
        <h3 className="text-xl font-bold mb-2">Thank You!</h3>
        <p className="mb-4">
          Your enquiry for {activity.title} has been received. Our team will contact you shortly.
        </p>
        <Button 
          onClick={() => setFormSubmitted(false)} 
          variant="outline"
        >
          Make Another Enquiry
        </Button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Select Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="groupSize">Group Size</Label>
        <Select value={groupSize} onValueChange={setGroupSize}>
          <SelectTrigger>
            <SelectValue placeholder="Select group size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-5">1-5 people</SelectItem>
            <SelectItem value="6-10">6-10 people</SelectItem>
            <SelectItem value="11-15">11-15 people</SelectItem>
            <SelectItem value="16-20">16-20 people</SelectItem>
            <SelectItem value="21+">21+ people</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input id="name" placeholder="Enter your full name" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="Enter your email" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" placeholder="Enter your phone number" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Additional Requirements</Label>
        <Textarea id="message" placeholder="Tell us any specific requirements or questions" />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        Send Enquiry
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        By submitting this form, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
}