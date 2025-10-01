"use client";

import { useState } from "react";
import { DayButton } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

function PCalendarDay({ day }: React.ComponentProps<typeof DayButton>) {
  const key = day.date.toISOString().split("T")[0];
  let style = "";

  if (key === new Date().toISOString().split("T")[0]) style = "";
  if (key.includes("3")) style = "bg-green-400 text-white font-bold";
  else if (key.includes("4")) style = "bg-orange-400 text-white font-bold";

  return (
    <div
      className={cn("grid h-full w-full place-items-center rounded-md", style)}
    >
      {day.date.getDate()}
    </div>
  );
}

export default function PCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        components={{
          DayButton: PCalendarDay,
        }}
        className="w-full rounded-md"
      />
    </div>
  );
}
