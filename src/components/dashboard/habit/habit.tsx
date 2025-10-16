"use client";

import { useState } from "react";
import HabitContent from "@/components/dashboard/habit/habit-content";
import HabitHeader from "@/components/dashboard/habit/habit-header";
import { Separator } from "@/components/ui/separator";
import { IHabitProps } from "@/lib/interfaces";

export default function Habit({ habit }: IHabitProps) {
  const [habitStreak, setHabitStreak] = useState<number>(habit.streak);

  return (
    <section className="mx-auto p-10 w-full max-w-[1410px]">
      <HabitHeader
        habitName={habit.name}
        habitStreak={habitStreak}
      />
      <Separator className="my-10 border-2" />
      <HabitContent
        habitId={habit.id}
        habitDays={habit.habitDays!}
        createdAt={habit.createdAt}
        habitStreak={habitStreak}
        setHabitStreak={setHabitStreak}
      />
    </section>
  );
}
