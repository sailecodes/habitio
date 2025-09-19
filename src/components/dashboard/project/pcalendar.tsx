"use client";

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

export default function PCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-full rounded-md"
      ></Calendar>
    </div>
  );
}
