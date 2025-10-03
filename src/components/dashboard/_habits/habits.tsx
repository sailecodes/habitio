"use client";

import { useState } from "react";
import { IHabitsProps } from "@/lib/interfaces";
import { THabit } from "@/lib/types";
import { HabitsCarousel } from "./habits-carousel";
import HabitsHeader from "./habits-header";

export default function Habits({ habitsData }: IHabitsProps) {
  const [habits, setHabits] = useState<THabit[]>(habitsData);

  return (
    <section className="relative mx-auto w-[1410px] space-y-5 p-10">
      <HabitsHeader setHabits={setHabits} />
      <HabitsCarousel habits={habits} />
    </section>
  );
}
