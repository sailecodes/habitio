"use client";

import { useState } from "react";
import { DayButton } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { THabitDay } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function PCalendar({
  createdAt,
  habitDays,
}: {
  createdAt: Date;
  habitDays: THabitDay[];
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  console.log(createdAt.toISOString().split("T")[0]);
  console.log(habitDays);

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        components={{
          DayButton: ({ day }: React.ComponentProps<typeof DayButton>) => {
            const key = day.date.toISOString().split("T")[0];
            let style = "";

            if (day.date.getTime() >= createdAt.setHours(0, 0, 0, 0)) {
              const hd = habitDays.find(
                (hd) => hd.date.toISOString().split("T")[0] === key,
              );

              if (!hd || hd.progress === "SKIPPED") {
                style = "bg-red-400 text-white";
              } else if (hd.progress === "COMPLETED") {
                style = "bg-green-400 text-white";
              } else {
                style = "bg-orange-400 text-white";
              }
            }

            return (
              <div
                className={cn(
                  "hover-translate grid h-full w-full place-items-center rounded-md",
                  style,
                )}
              >
                {day.date.getDate()}
              </div>
            );
          },
        }}
        className="w-full rounded-md"
      />
    </div>
  );
}
