import prisma from "@/lib/prisma/prismaClient";
import Habits from "./habits";

export default async function HabitsRoot() {
  const habitsData = await prisma.habit.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <Habits habitsData={habitsData} />;
}
