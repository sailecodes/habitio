"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateDailyProgress } from "@/actions/habits.actions";
import { HabitProgress } from "@/app/generated/prisma";
import { IHabitProgressBtnsProps } from "@/lib/interfaces";
import { cn, getLocalDay, getNewDate } from "@/lib/utils";
import { Button } from "../../ui/button";

export default function HabitProgressBtns({
  habitId,
  habitDays,
  setHabitDays,
  habitStreak,
  setHabitStreak,
}: IHabitProgressBtnsProps) {
  const [prevDailyProgress, setPrevDailyProgress] =
    useState<HabitProgress | null>(null);
  const [prevHabitStreak, setPrevHabitStreak] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleUpdateDailyProgress(updatedDailyProgress: HabitProgress) {
    const currDate = getNewDate();
    const currDay = getLocalDay(currDate);
    let isNewEntry = false;
    let streakChange = 0;

    // Find if an entry exists for today
    const currHd = habitDays.find((hd) => {
      const hdDate = getNewDate(hd.date);

      return getLocalDay(hdDate) === currDay;
    });

    if (currHd) {
      setPrevDailyProgress(currHd.progress);

      // Optimistically update existing entry
      setHabitDays((prev) =>
        prev.map((hd) => {
          const hdDate = getNewDate(hd.date);

          return getLocalDay(hdDate) === currDay
            ? { ...hd, progress: updatedDailyProgress }
            : hd;
        }),
      );

      if (
        currHd.progress !== HabitProgress.COMPLETED &&
        updatedDailyProgress === HabitProgress.COMPLETED
      ) {
        streakChange = 1;
      } else if (
        currHd.progress === HabitProgress.COMPLETED &&
        updatedDailyProgress !== HabitProgress.COMPLETED
      ) {
        streakChange = -1;
      }
    } else {
      isNewEntry = true;

      // Optimistically add new entry
      setHabitDays((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          date: currDate,
          progress: updatedDailyProgress,
          habitId,
          createdAt: currDate,
          updatedAt: currDate,
        },
      ]);

      if (updatedDailyProgress === HabitProgress.COMPLETED) {
        streakChange = 1;
      }
    }

    setPrevHabitStreak(habitStreak);
    setHabitStreak((prev) => prev + streakChange);

    startTransition(async () => {
      const res = await updateDailyProgress(habitId, updatedDailyProgress);

      if (!res.success) {
        console.error(res.error);
        toast.error("Something went wrong. Please try again.");

        // Rollback optimistic update
        setHabitDays((prev) => {
          if (isNewEntry) {
            return prev.filter((hd) => {
              const hdDate = getNewDate(hd.date);

              return getLocalDay(hdDate) === currDay;
            });
          } else {
            return prev.map((hd) => {
              const hdDate = getNewDate(hd.date);

              return getLocalDay(hdDate) === currDay
                ? { ...hd, progress: prevDailyProgress! }
                : hd;
            });
          }
        });

        setHabitStreak(prevHabitStreak!);
      } else {
        toast.success("Habit status updated successfully.");

        // Replace optimistic update with real data
        setHabitDays((prev) =>
          prev.map((hd) => {
            const hdDate = getNewDate(hd.date);

            return getLocalDay(hdDate) === currDay ? res.data : hd;
          }),
        );
      }
    });
  }

  return (
    <div className="space-y-5">
      <header className="text-header font-normal">Daily Progress</header>
      <div className="space-x-2">
        <Button
          className={cn(
            "hover-translate bg-red-500 hover:bg-red-500/80",
            isPending ? "opacity-80" : "",
          )}
          onClick={() => handleUpdateDailyProgress(HabitProgress.SKIPPED)}
          disabled={isPending}
        >
          Skipped
        </Button>
        <Button
          className={cn(
            "hover-translate bg-orange-500 hover:bg-orange-500/80",
            isPending ? "opacity-80" : "",
          )}
          onClick={() => handleUpdateDailyProgress(HabitProgress.IN_PROGRESS)}
          disabled={isPending}
        >
          In-progress
        </Button>
        <Button
          className={cn(
            "hover-translate bg-green-500 hover:bg-green-500/80",
            isPending ? "opacity-80" : "",
          )}
          onClick={() => handleUpdateDailyProgress(HabitProgress.COMPLETED)}
          disabled={isPending}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
