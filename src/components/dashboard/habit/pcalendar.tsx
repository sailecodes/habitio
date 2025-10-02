import { DayButton } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { THabitDay } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function PCalendar({
  createdAt,
  habitDays,
}: {
  createdAt: Date;
  habitDays: THabitDay[];
}) {
  return (
    <div>
      <Calendar
        mode="single"
        components={{
          DayButton: ({ day }: React.ComponentProps<typeof DayButton>) => {
            const key = day.date.toISOString().split("T")[0];
            let style = "";

            if (
              day.date.getTime() >= createdAt.setHours(0, 0, 0, 0) &&
              day.date.getTime() <= new Date().setHours(23, 59, 59, 999)
            ) {
              const hd = habitDays.find(
                (hd) => hd.date.toISOString().split("T")[0] === key,
              );

              if (!hd || hd.progress === "SKIPPED") {
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
                  "grid h-full w-full place-items-center rounded-md",
                  style,
                )}
              >
                {day.date.getDate()}
              </div>
            );
          },
        }}
        className="w-full rounded-md"
      />
    </div>
  );
}
