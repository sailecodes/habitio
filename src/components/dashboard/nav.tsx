import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-10 py-5">
      <span className="text-3xl font-bold -tracking-[2px]">Habits</span>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">
            <Link href="/dashboard">Overview</Link>
          </TabsTrigger>
          <TabsTrigger value="password">
            <Link href="/dashboard">Settings</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
}
