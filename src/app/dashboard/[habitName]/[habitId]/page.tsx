import HabitRoot from "@/components/dashboard/habit/habit-root";
import { IHabitProps } from "@/lib/interfaces";
import prisma from "@/lib/prisma/prismaClient";

/**
 * Sentinel page for server-side data fetching
 *
 * Pattern: Root Layout
 * 1. Fetch data in dedicated server component,
 *    typically the page.tsx file
 * 2. Pass data to client component as props
 *
 * Solves issues regarding optimistic UI updates
 * with multiple components. Pass data as props
 * to the highest component in the tree in which
 * all the children components that need it can
 * access it.
 *
 * Possible optimization is to use React Context.
 */
export default async function Habit({ params }: IHabitProps) {
  const { habitId } = await params;
  const dHabitId = decodeURIComponent(habitId);

  const habit = await prisma.habit.findUnique({
    where: { id: dHabitId },
    include: { habitDays: true },
  });

  return <HabitRoot habit={habit!} />;
}
