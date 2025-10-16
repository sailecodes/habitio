import { IHabitsHeaderProps } from "@/lib/interfaces";
import HabitsDrawer from "./habits-drawer";

export default function HabitsHeader({ setHabits }: IHabitsHeaderProps) {
  return (
    <header className="flex justify-between items-center gap-10">
      <div className="flex items-center gap-5">
        <span className="text-header">Projects</span>
        <HabitsDrawer setHabits={setHabits} />
      </div>
    </header>
  );
}
