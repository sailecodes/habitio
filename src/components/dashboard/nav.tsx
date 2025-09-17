import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

export default function Nav() {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-10 p-10">
      <span className="text-3xl font-bold -tracking-[2px]">Habits</span>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">
            <Link href="/dashboard">Habits</Link>
          </TabsTrigger>
          <TabsTrigger value="password">
            <Link href="/settings">Settings</Link>
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
