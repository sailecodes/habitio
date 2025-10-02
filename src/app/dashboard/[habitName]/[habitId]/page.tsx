import HabitContent from "@/components/dashboard/habit/habit-content";
import HabitHeader from "@/components/dashboard/habit/habit-header";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma/prismaClient";

interface HabitProps {
  params: Promise<{ habitName: string; habitId: string }>;
}

export default async function Habit({ params }: HabitProps) {
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
