"use client";

import { useState } from "react";
import HabitContent from "@/components/dashboard/habit/habit-content";
import HabitHeader from "@/components/dashboard/habit/habit-header";
import { Separator } from "@/components/ui/separator";
import { IHabitRootProps } from "@/lib/interfaces";

export default function HabitRoot({ habit }: IHabitRootProps) {
  const [habitStreak, setHabitStreak] = useState<number>(habit.streak);

  return (
    <section className="mx-auto w-full max-w-[1410px] p-10">
      <HabitHeader habitName={habit.name} habitStreak={habitStreak} />
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
