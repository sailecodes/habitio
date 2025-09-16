import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-10 p-10 text-sm">
        <div className="flex flex-col">
          <span className="text-4xl font-bold -tracking-[2px]">Habits</span>
          <span>Where habits meet intelligence.</span>
        </div>
        <div className="space-x-2">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/terms-and-privacy">Terms & Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
