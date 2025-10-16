import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="flex justify-between items-center gap-10 mx-auto p-10 max-w-[1410px] text-sm">
        <div className="flex flex-col">
          <span className="font-bold text-4xl -tracking-[2px]">Habits</span>
          <span>Where consistency meets intelligence.</span>
        </div>
        <div className="space-x-2">
          <Link href="/">Home</Link>
          {/* <Link href="/about">About</Link>
          <Link href="/terms-and-privacy">Terms & Privacy</Link> */}
        </div>
      </div>
    </footer>
  );
}
