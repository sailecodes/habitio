"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { IHabitsCarousel } from "@/lib/interfaces";
import { getSimplifiedDate } from "@/lib/utils";
import HabitsCard from "./habits-card";

export function HabitsCarousel({ habits }: IHabitsCarousel) {
  const [currInd, setCurrInd] = useState<number>(0);

  function moveCarouselLeft() {
    if (currInd === 0) {
      return;
    }

    setCurrInd(currInd - 1);
  }

  function moveCarouselRight() {
    if (currInd === Math.ceil(habits.length / 5) - 1) {
      return;
    }

    setCurrInd(currInd + 1);
  }

  if (habits.length === 0) {
    return (
      <div className="text-subheader grid h-[154px] w-full place-items-center py-2">
        Create a new habit!
      </div>
    );
  }

  return (
    <div className="w-[1330px] overflow-x-hidden">
      <div className="flex items-center gap-5">
        <button onClick={moveCarouselLeft} disabled={currInd === 0}>
          <ArrowLeft
            className={`icon absolute top-[48px] right-[80px] ${currInd === 0 ? "pointer-events-none opacity-50" : "hover-translate opacity-100"}`}
          />
        </button>
        <button
          onClick={moveCarouselRight}
          disabled={currInd === Math.ceil(habits.length / 5) - 1}
        >
          <ArrowRight
            className={`icon absolute top-[48px] right-[40px] ${currInd === Math.ceil(habits.length / 5) - 1 ? "pointer-events-none opacity-50" : "hover-translate opacity-100"}`}
          />
        </button>
      </div>
      <ul
        className={`flex items-center gap-5 py-2 transition-transform duration-550`}
        style={{ transform: `translateX(-${101.5 * currInd}%)` }}
      >
        {/* TODO:
          - Add a sorter
          - Add a search bar  */}
        {habits.map((habit) => (
          <HabitsCard
            key={habit.id}
            id={habit.id}
            name={habit.name}
            streak={habit.streak}
            startDate={getSimplifiedDate(habit.createdAt)}
          />
        ))}
      </ul>
    </div>
  );
}
