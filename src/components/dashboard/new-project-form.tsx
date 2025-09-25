"use client";

import { useForm } from "react-hook-form";
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
import { newProjectSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { DrawerClose } from "../ui/drawer";

export default function NewProjectForm() {
  const form = useForm<z.infer<typeof newProjectSchema>>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      habitName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newProjectSchema>) {
    const res = await createNewProject(values);

    if (!res.success) console.error(res.error);
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
