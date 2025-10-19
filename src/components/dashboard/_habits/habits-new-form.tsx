"use client";

import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createNewHabit } from "@/actions/habits.action";
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
import { IHabitsNewFormProps } from "@/lib/interfaces";
import { useUserStore } from "@/lib/providers/user-provider";
import { newHabitSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { DrawerClose } from "../../ui/drawer";

export default function HabitsNewForm({ setHabits }: IHabitsNewFormProps) {
  const { user } = useUserStore((state) => state);

  const form = useForm<z.infer<typeof newHabitSchema>>({
    resolver: zodResolver(newHabitSchema),
    defaultValues: {
      name: "",
    },
  });
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleAddNewHabit(values: z.infer<typeof newHabitSchema>) {
    const optimisticId = Math.random().toString(36).substring(2, 9);
    const optimisticHabit = {
      id: optimisticId,
      name: values.name,
      streak: 0,
      userId: user ? user.id : optimisticId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setHabits((prev) => [optimisticHabit, ...prev]);

    drawerCloseRef.current?.click();

    startTransition(async () => {
      const res = await createNewHabit(values, user!.id);

      if (res.success) {
        toast.success("Habit created successfully!", {
          description: "Click the habit to view all kinds of statistics.",
          icon: <span>😀</span>,
        });

        // Replace optimistic habit with real data
        setHabits((prev) => prev.map((habit) => (habit.id === optimisticId ? res.data : habit)));
      } else {
        console.error(res.error);
        toast.error("Whoops, error creating habit.", {
          description: "Please try adding a new habit again.",
          icon: <span>😯</span>,
        });

        // Rollback optimistic update
        setHabits((prev) => prev.filter((habit) => habit.id !== optimisticId));
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAddNewHabit)}
        className="space-y-8 mx-auto px-10 max-w-7xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habit</FormLabel>
              <FormControl>
                <Input
                  placeholder="Walk my cat"
                  {...field}
                />
              </FormControl>
              <FormDescription>Name your habit to something you will remember.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center gap-5">
          <DrawerClose
            className="flex-1/2"
            asChild>
            <Button
              className="w-full hover-translate hover-pointer"
              variant="outline"
              ref={drawerCloseRef}
              disabled={isPending}>
              Cancel
            </Button>
          </DrawerClose>
          <Button
            type="submit"
            className="flex-1/2 hover-translate hover-pointer"
            disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
