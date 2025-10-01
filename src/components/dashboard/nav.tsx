import Link from "next/link";
import Profile from "./profile";

export default function Nav() {
  return (
    <nav className="mx-auto flex w-full max-w-[1410px] items-center justify-between gap-10 p-10">
      <Link className="text-3xl font-bold -tracking-[2px]" href="/dashboard">
        Habits
      </Link>
      <Profile />
    </nav>
  );
}
