import { Checkbox } from '../../ui/checkbox';
import { Label } from '../../ui/label';

export default function GoalsItem({ goal }: { goal: string }) {
  return (
    <li>
      <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
        <Checkbox className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700" />
        <div>{goal}</div>
      </Label>
    </li>
  );
}
