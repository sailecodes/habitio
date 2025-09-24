"use client";

import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const newProjectSchema = z.object({
  projectName: z.string().min(1, {
    message: "Must be at least 1 character.",
  }),
});

export default function NewProjectForm({
  closeBtn: CloseBtn,
}: {
  closeBtn: ReactNode;
}) {
  const form = useForm<z.infer<typeof newProjectSchema>>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      projectName: "",
    },
  });

  function onSubmit(values: z.infer<typeof newProjectSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-7xl space-y-8 px-10"
      >
        <FormField
          control={form.control}
          name="projectName"
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
          {CloseBtn}
          <Button
            type="submit"
            className="flex-1/2 bg-purple-400 transition-all hover:-translate-y-0.5 hover:cursor-pointer"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
