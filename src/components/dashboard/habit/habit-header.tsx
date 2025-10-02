interface HabitHeaderProps {
  name: string;
  streak: number;
}

export default function HabitHeader({ name, streak }: HabitHeaderProps) {
  return (
    <header className="flex items-end justify-between gap-10">
      <span className="text-title">{name}</span>
      <div className="flex flex-col self-end text-right">
        <span className="text-header">
          <span className="text-[38px]">{streak}</span> day streak
        </span>
        <span className="text-sm">You've done this before, haven't you?</span>
      </div>
    </header>
  );
}
