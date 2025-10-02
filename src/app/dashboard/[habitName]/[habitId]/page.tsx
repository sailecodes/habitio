import HabitContent from "@/components/dashboard/habit/habit-content";
import HabitHeader from "@/components/dashboard/habit/habit-header";
import { Separator } from "@/components/ui/separator";
import { IHabit } from "@/lib/interfaces";
import prisma from "@/lib/prisma/prismaClient";

export default async function Habit({ params }: IHabit) {
  const { habitId } = await params;
  const dHabitId = decodeURIComponent(habitId);

  const habit = await prisma.habit.findUnique({
    where: { id: dHabitId },
    include: { habitDays: true },
  });

  return (
    <section className="mx-auto w-full max-w-[1410px] p-10">
      <HabitHeader name={habit!.name} streak={habit!.streak} />
      <Separator className="my-10 border-2" />
      <HabitContent habit={habit!} />
    </section>
  );
}
