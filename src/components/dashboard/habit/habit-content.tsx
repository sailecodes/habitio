"use client";

import { useState } from "react";
import { IHabitContent } from "@/lib/interfaces";
import { THabitDay } from "@/lib/types";
import HabitCalendar from "./habit-calendar";
import HabitProgressBtns from "./habit-progress-btns";

export default function HabitContent({ habit }: IHabitContent) {
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
        <HabitCalendar createdAt={habit.createdAt} habitDays={habitDays} />
      </div>
    </div>
  );
}
