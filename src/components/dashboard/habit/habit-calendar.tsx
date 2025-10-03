import { CalendarDay, DayButton } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { IHabitCalendarProps } from "@/lib/interfaces";
import { THabitDay } from "@/lib/types";
import { cn } from "@/lib/utils";

function isDayButtonInValidRange(day: CalendarDay, start: Date) {
  const dayTime = day.date.getTime();
  return (
    dayTime >= start.setHours(0, 0, 0, 0) &&
    dayTime <= new Date().setHours(23, 59, 59, 999)
  );
}

function getStyle(hd: THabitDay | undefined) {
  return !hd
    ? ""
    : hd.progress === "SKIPPED"
      ? "bg-red-400 text-white hover-translate"
      : hd.progress === "IN_PROGRESS"
        ? "bg-orange-400 text-white hover-translate"
        : "bg-green-400 text-white hover-translate";
}

export default function HabitCalendar({
  createdAt,
  habitDays,
}: IHabitCalendarProps) {
  return (
    <div>
      <Calendar
        mode="single"
        className="w-full rounded-md p-0"
        classNames={{
          weekday:
            "text-muted-foreground rounded-md flex-1 font-normal text-xs select-none",
          caption_label: "text-sm font-medium",
        }}
        showOutsideDays={false}
        components={{
          DayButton: ({ day }: React.ComponentProps<typeof DayButton>) => {
            const key = day.date.toISOString().split("T")[0];
            let style;

            if (isDayButtonInValidRange(day, createdAt)) {
              // Every entry in habitDays is guaranteed to be in the correct timezone.
              // Either an entry is added in habit-progress-btns.tsx or habits.actions.ts,
              // both of which account for timezone differences
              const hd = habitDays.find(
                (hd) => hd.date.toISOString().split("T")[0] === key,
              );

              style = getStyle(hd);
            }

            return (
              <div
                className={cn(
                  "grid h-full w-full place-items-center rounded-md text-sm",
                  style,
                )}
              >
                {day.date.getDate()}
              </div>
            );
          },
        }}
      />
    </div>
  );
}
