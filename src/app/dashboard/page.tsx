import Link from 'next/link';

export default function Dashboard() {
  return (
    <section className="mx-auto w-full max-w-7xl p-10">
      <Link href="/dashboard/project">Trading</Link>
    </section>
  );
}
