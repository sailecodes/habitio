import PCalendar from "@/components/dashboard/habit/pcalendar";
import TodaysHabit from "@/components/dashboard/habit/todays-habit";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma/prismaClient";

interface HabitProps {
  params: Promise<{ habitName: string; habitId: string }>;
}

export default async function Habit({ params }: HabitProps) {
  const { habitName, habitId } = await params;

  const dHabitName = decodeURIComponent(habitName);
  const dHabitId = decodeURIComponent(habitId);

  const habit = await prisma.habit.findUnique({
    where: { id: dHabitId },
    include: { habitDays: true },
  });

  return (
    <section className="mx-auto w-full max-w-[1410px] p-10">
      <header className="flex justify-between gap-10">
        <span className="text-title">{dHabitName}</span>
        <div className="flex flex-col self-end text-right">
          <span className="text-header">
            <span className="text-[38px]">{habit!.streak}</span> day streak
          </span>
          <span className="text-sm">You've done this before, haven't you?</span>
        </div>
      </header>
      <Separator className="my-10 border-2" />
      <div className="flex gap-20">
        <div className="flex-1/3 space-y-10">
          <TodaysHabit />
        </div>
        <div className="flex-2/3">
          {/* Calendar */}
          {/* <div className="h-[550px] w-full rounded-md bg-gray-200" /> */}
          <PCalendar
            createdAt={habit!.createdAt}
            habitDays={habit!.habitDays}
          />
        </div>
      </div>
    </section>
  );
}
