"use client";

import { useState } from "react";
import { THabit } from "@/lib/types";
import { HabitsCarousel } from "./habits-carousel";
import HabitsHeader from "./habits-header";

export default function Habits({ habits: hbs }: { habits: THabit[] }) {
  const [habits, setHabits] = useState<THabit[]>(hbs);

  return (
    <section className="relative space-y-5 mx-auto p-10 w-[1410px]">
      <HabitsHeader setHabits={setHabits} />
      <HabitsCarousel habits={habits} />
    </section>
  );
}
