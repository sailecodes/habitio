import { IHabitHeaderProps } from "@/lib/interfaces";

export default function HabitHeader({
  habitName,
  habitStreak,
}: IHabitHeaderProps) {
  return (
    <header className="flex items-end justify-between gap-10">
      <span className="text-title">{habitName}</span>
      <div className="flex flex-col self-end text-right">
        <span className="text-header">
          <span className="text-[38px]">{habitStreak}</span> day streak
        </span>
      </div>
    </header>
  );
}
