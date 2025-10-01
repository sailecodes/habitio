import { Button } from "../../ui/button";

export default function TodaysHabit() {
  return (
    <div className="space-y-5">
      <header className="text-header font-normal">Today&apos;s habit</header>
      <div className="space-x-2">
        <Button className="hover-translate bg-red-500 hover:bg-red-500/80">
          Skipped
        </Button>
        <Button className="hover-translate bg-orange-500 hover:bg-orange-500/80">
          In-progress
        </Button>
        <Button className="hover-translate bg-green-500 hover:bg-green-500/80">
          Completed
        </Button>
      </div>
    </div>
  );
}
