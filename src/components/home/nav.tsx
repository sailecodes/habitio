import Link from "next/link";
import { Button } from "../ui/button";

export default function Nav() {
  return (
    <nav className="flex h-full items-center justify-between gap-10">
      <div className="flex items-center gap-5">
        <span className="text-3xl font-bold tracking-tight">HabitIO</span>
        <Link href="/pricing" className="text-sm">
          Pricing
        </Link>
      </div>
      <div className="space-x-5 text-sm">
        <Button variant="outline" className="hover:cursor-pointer">
          Login
        </Button>
        <Button className="hover:cursor-pointer">Sign Up</Button>
      </div>
    </nav>
  );
}
