import { DayButton } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { IHabitCalendarProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

export default function HabitCalendar({
  createdAt,
  habitDays,
}: IHabitCalendarProps) {
  return (
    <div>
      <Calendar
        mode="single"
        components={{
          DayButton: ({ day }: React.ComponentProps<typeof DayButton>) => {
            const key = day.date.toISOString().split("T")[0];
            let style;

            if (
              day.date.getTime() >= createdAt.setHours(0, 0, 0, 0) &&
              day.date.getTime() <= new Date().setHours(23, 59, 59, 999)
            ) {
              // Every entry in habitDays is guaranteed to be in the correct timezone.
              // Either an entry is added in habit-progress-btns.tsx or habits.actions.ts,
              // both of which account for timezone differences
              const hd = habitDays.find(
                (hd) => hd.date.toISOString().split("T")[0] === key,
              );

              if (!hd) {
                style = "";
              } else if (!hd || hd.progress === "SKIPPED") {
                style = "bg-red-400 text-white hover-translate";
              } else if (hd.progress === "COMPLETED") {
                style = "bg-green-400 text-white hover-translate";
              } else {
                style = "bg-orange-400 text-white hover-translate";
              }
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
        className="w-full rounded-md p-0"
        classNames={{
          weekday:
            "text-muted-foreground rounded-md flex-1 font-normal text-xs select-none",
          caption_label: "text-sm font-medium",
        }}
      />
    </div>
  );
}
