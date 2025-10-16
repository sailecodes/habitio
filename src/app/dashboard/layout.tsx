import Footer from "@/components/dashboard/footer";
import Nav from "@/components/dashboard/nav";
import prisma from "@/lib/prisma";
import { UserStoreProvider } from "@/lib/providers/user-provider";
import { createClient } from "@/lib/supabase/server";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const spUser = (await supabase.auth.getUser()).data.user;

  const user = spUser
    ? await prisma.user.findFirst({
        where: {
          email: spUser.email,
        },
      })
    : null;

  return (
    <main className="flex flex-col h-dvh">
      <UserStoreProvider initialState={{ user }}>
        <Nav />
        {children}
        <Footer />
      </UserStoreProvider>
    </main>
  );
}
