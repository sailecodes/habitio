"use client";

import { useState } from "react";
import { THabit, THabitDay } from "@/lib/types";
import HabitProgressBtns from "./habit-progress-btns";
import PCalendar from "./pcalendar";

interface IHabitContentProps {
  habit: THabit;
}

export default function HabitContent({ habit }: IHabitContentProps) {
  const [habitDays, setHabitDays] = useState<THabitDay[]>(habit.habitDays!);

  return (
    <div className="flex gap-20">
      <div className="flex-1/3 space-y-10">
        <HabitProgressBtns
          habitId={habit.id}
          habitDays={habitDays}
          setHabitDays={setHabitDays}
        />
      </div>
      <div className="flex-2/3">
        <PCalendar createdAt={habit.createdAt} habitDays={habitDays} />
      </div>
    </div>
  );
}
