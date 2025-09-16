import Link from "next/link";
import { Button } from "../ui/button";

export default function Nav() {
  return (
    <nav className="bg-blue-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-10 px-5 py-10">
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
      </div>
    </nav>
  );
}
