import Footer from "@/components/home/footer";
import Nav from "@/components/home/nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-dvh flex-col justify-between">
      <Nav />
      {children}
      <Footer />
    </main>
  );
}
