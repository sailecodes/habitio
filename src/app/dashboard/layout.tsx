import { toast } from "sonner";
import Footer from "@/components/dashboard/footer";
import InitStores from "@/components/dashboard/init-stores";
import Nav from "@/components/dashboard/nav";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { THabit } from "@/lib/types";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = null;
  let habits: THabit[] = [];

  try {
    const supabase = await createClient();
    user = (await supabase.auth.getUser()).data.user;

    habits = await prisma.habit.findMany({
      where: { userId: user?.id ?? undefined },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error(`[DASHBOARD LAYOUT ERROR] ${err}`);

    // TODO: Sign user out
  }

  return (
    <main className="flex flex-col h-dvh">
      <InitStores
        user={user}
        habits={habits}>
        <Nav />
        {children}
        <Footer />
      </InitStores>
    </main>
  );
}
