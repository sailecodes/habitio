"use client";

import { useState } from "react";
import { IHabitContentProps } from "@/lib/interfaces";
import { THabitDay } from "@/lib/types";
import HabitCalendar from "./habit-calendar";
import HabitProgressBtns from "./habit-progress-btns";

export default function HabitContent({
  habitId,
  habitDays: hds,
  createdAt,
  habitStreak,
  setHabitStreak,
}: IHabitContentProps) {
  const [habitDays, setHabitDays] = useState<THabitDay[]>(hds);

  return (
    <div className="flex gap-20">
      <div className="flex-1/3 space-y-10">
        <HabitProgressBtns
          habitId={habitId}
          habitDays={habitDays}
          setHabitDays={setHabitDays}
          habitStreak={habitStreak}
          setHabitStreak={setHabitStreak}
        />
      </div>
      <div className="flex-2/3">
        <HabitCalendar createdAt={createdAt} habitDays={habitDays} />
      </div>
    </div>
  );
}
