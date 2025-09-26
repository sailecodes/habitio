import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Profile from "./profile";

export default function Nav() {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-10 p-10">
      <span className="text-3xl font-bold -tracking-[2px]">Habits</span>

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">
            <Link href="/dashboard">Dashboard</Link>
          </TabsTrigger>
          <TabsTrigger value="password">
            <Link href="/dashboard/settings">Settings</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center">
        <Profile />
      </div>
    </nav>
  );
}
