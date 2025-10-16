import Habits from "@/components/dashboard/_habits/habits";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const spUser = (await supabase.auth.getUser()).data.user;

  const user = spUser
    ? await prisma.user.findFirst({
        where: {
          email: spUser.email,
        },
      })
    : null;

  const habits = user
    ? await prisma.habit.findMany({
        where: { userId: user.id ?? undefined },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div>
      <Habits habits={habits} />
      {/* Insert other sections */}
    </div>
  );
}
