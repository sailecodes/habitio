"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createNewProject } from "@/actions/newProject.action";
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
import { IProjectsNewForm } from "@/lib/interfaces";
import { newProjectSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { DrawerClose } from "../../ui/drawer";

export default function ProjectsNewForm({ setProjects }: IProjectsNewForm) {
  const form = useForm<z.infer<typeof newProjectSchema>>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      habitName: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof newProjectSchema>) {
    const optimisticId = Math.random().toString(36).substring(2, 9);
    const optimisticProject = {
      id: optimisticId,
      habitName: values.habitName,
      streak: 0,
      userId: "temp", // TODO: Replace with current user's ID
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProjects((prev) => [optimisticProject, ...prev]);

    startTransition(async () => {
      const res = await createNewProject(values);

      if (!res.success) {
        console.error(res.error);
        toast.error("Error creating project. Please try again.");

        // Rollback optimistic update
        setProjects((prev) =>
          prev.filter((project) => project.id !== optimisticId),
        );
      } else {
        toast.success("Project created successfully!");

        // Replace optimistic project with real data
        setProjects((prev) =>
          prev.map((project) =>
            project.id === optimisticId ? res.data : project,
          ),
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
          name="habitName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
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
            <Button className="hover-translate w-full" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
          <Button type="submit" className="hover-translate flex-1/2">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
