import Goals from '@/components/dashboard/project/goals';
import Today from '@/components/dashboard/project/today';
import { Separator } from '@/components/ui/separator';

export default function Project() {
  return (
    <section className="mx-auto w-full max-w-7xl p-10">
      <header className="flex justify-between gap-10">
        {/* Project Name */}
        <span className="text-6xl font-medium -tracking-[3px]">
          Project:
          <br />
          Trading
        </span>

        {/* Streak */}
        <span className="self-end text-3xl font-medium -tracking-[2px]">
          <span>145</span> day streak
        </span>
      </header>

      <Separator className="my-10 border-2" />

      <div className="flex gap-10">
        <div className="flex-1/3 space-y-10">
          <Today />
          <Goals />
        </div>
        <div className="flex-2/3">
          {/* Calendar */}
          <div className="h-[550px] w-full rounded-md bg-gray-200" />
        </div>
      </div>
    </section>
  );
}
