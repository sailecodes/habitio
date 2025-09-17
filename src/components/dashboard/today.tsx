import { Button } from '../ui/button';

export default function Today() {
  return (
    <div className="space-y-5">
      <header className="text-2xl -tracking-[2px]">Today&apos;s Habit</header>
      <div className="space-x-2">
        <Button className="bg-red-400 hover:cursor-pointer hover:bg-red-400/80">
          Skipping
        </Button>
        <Button className="bg-orange-400 hover:cursor-pointer hover:bg-orange-400/80">
          In-progress
        </Button>
        <Button className="bg-green-400 hover:cursor-pointer hover:bg-green-400/80">
          Completed
        </Button>
      </div>
    </div>
  );
}
