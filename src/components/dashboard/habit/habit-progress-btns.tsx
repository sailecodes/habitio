"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateDailyProgress } from "@/actions/habits.actions";
import { HabitProgress } from "@/app/generated/prisma";
import { THabitDay } from "@/lib/types";
import { cn, getLocalDay, getNewDate } from "@/lib/utils";
import { Button } from "../../ui/button";

interface ITodaysHabitProps {
  habitId: string;
  habitDays: THabitDay[];
  setHabitDays: React.Dispatch<React.SetStateAction<THabitDay[]>>;
}

export default function HabitProgressBtns({
  habitId,
  habitDays,
  setHabitDays,
}: ITodaysHabitProps) {
  const [prevDailyProgress, setPrevDailyProgress] =
    useState<HabitProgress | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDailyProgressUpdate(updatedDailyProgress: HabitProgress) {
    const currDate = getNewDate();
    const currDay = getLocalDay(currDate);
    let isNewEntry = false;

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
    }

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
      <header className="text-header font-normal">Today&apos;s habit</header>
      <div className="space-x-2">
        <Button
          className={cn(
            "hover-translate bg-red-500 hover:bg-red-500/80",
            isPending ? "opacity-80" : "",
          )}
          onClick={() => handleDailyProgressUpdate(HabitProgress.SKIPPED)}
          disabled={isPending}
        >
          Skipped
        </Button>
        <Button
          className={cn(
            "hover-translate bg-orange-500 hover:bg-orange-500/80",
            isPending ? "opacity-80" : "",
          )}
          onClick={() => handleDailyProgressUpdate(HabitProgress.IN_PROGRESS)}
          disabled={isPending}
        >
          In-progress
        </Button>
        <Button
          className={cn(
            "hover-translate bg-green-500 hover:bg-green-500/80",
            isPending ? "opacity-80" : "",
          )}
          onClick={() => handleDailyProgressUpdate(HabitProgress.COMPLETED)}
          disabled={isPending}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
