import Today from '@/components/dashboard/today';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function Dashboard() {
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
          {/* Today's Habit */}
          <Today />

          {/* Goals */}
          <div className="space-y-5">
            <header className="text-2xl -tracking-[2px]">Goals</header>
            <ul className="space-y-2">
              <li>
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
                  <Checkbox
                    id="toggle-2"
                    className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                  />
                  <div>Reach XFA by 20 days</div>
                </Label>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-2/3">
          {/* Calendar */}
          <div className="h-[550px] w-full rounded-md bg-gray-200" />
        </div>
      </div>
    </section>
  );
}
