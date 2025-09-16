import Footer from "@/components/dashboard/footer";
import Nav from "@/components/dashboard/nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-dvh flex-col">
      <Nav />
      {children}
      <Footer />
    </main>
  );
}
