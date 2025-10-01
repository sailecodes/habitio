"use client";

import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createNewHabit } from "@/actions/newHabit.actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IHabitsNewForm } from "@/lib/interfaces";
import { newHabitSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { DrawerClose } from "../../ui/drawer";

export default function HabitsNewForm({ setHabits }: IHabitsNewForm) {
  const form = useForm<z.infer<typeof newHabitSchema>>({
    resolver: zodResolver(newHabitSchema),
    defaultValues: {
      name: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  function onSubmit(values: z.infer<typeof newHabitSchema>) {
    const optimisticId = Math.random().toString(36).substring(2, 9);
    const optimisticHabit = {
      id: optimisticId,
      name: values.name,
      streak: 0,
      userId: "temp", // TODO: Replace with current user's ID
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setHabits((prev) => [optimisticHabit, ...prev]);

    drawerCloseRef.current?.click();

    startTransition(async () => {
      const res = await createNewHabit(values);

      if (!res.success) {
        console.error(res.error);
        toast.error("Error creating habit. Please try again.");

        // Rollback optimistic update
        setHabits((prev) => prev.filter((habit) => habit.id !== optimisticId));
      } else {
        toast.success("Habit created successfully!");

        // Replace optimistic habit with real data
        setHabits((prev) =>
          prev.map((habit) => (habit.id === optimisticId ? res.data : habit)),
        );
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-7xl space-y-8 px-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habit</FormLabel>
              <FormControl>
                <Input placeholder="Walk my cat" {...field} />
              </FormControl>
              <FormDescription>
                Name your habit to something you will remember.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between gap-5">
          <DrawerClose className="flex-1/2" asChild>
            <Button
              className="hover-translate w-full"
              variant="outline"
              ref={drawerCloseRef}
              disabled={isPending}
            >
              Cancel
            </Button>
          </DrawerClose>
          <Button
            type="submit"
            className="hover-translate flex-1/2"
            disabled={isPending}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
