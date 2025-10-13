"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { register } from "@/actions/auth";
import { FieldControllerInput } from "@/components/auth/field-controller-input";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { registerSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  async function handleRegister(data: z.infer<typeof registerSchema>) {
    const res = await register(data);

    if (res.success) {
      toast.info(`✉️ Sent email verification`, {
        description: "Please check your email for the confirmation link.",
      });
    } else if (!res.success) {
      console.error(res.error);

      if (res.isPublic) {
        toast.error("❌ Uh oh. Something went wrong", { description: res.error });
      } else {
        toast.error("❌ Uh oh. Something went wrong", {
          description: "Please refresh the page or try again!",
        });
      }
    }
  }

  return (
    <main className="space-y-5 mx-auto p-10 max-w-xl h-dvh">
      <header className="text-center">
        <span className="block text-header">
          Ha
          <span className="">bits</span>
        </span>
        <span>A smarter way to be consistent.</span>
      </header>
      <form
        id="register-form"
        onSubmit={registerForm.handleSubmit(handleRegister)}
        className="space-y-5">
        <FieldGroup>
          <FieldControllerInput
            name="email"
            control={registerForm.control}
            label="Email"
            type="email"
          />
          <FieldControllerInput
            name="password"
            control={registerForm.control}
            label="Password"
            type="password"
            description="Must be a 6-character password. Make it hard to guess!"
          />
          <FieldControllerInput
            name="username"
            control={registerForm.control}
            label="Username"
            type="text"
            description="A unique name that defines you."
          />
        </FieldGroup>
        <Button
          type="submit"
          variant="outline"
          className="w-full">
          Start habits
        </Button>
      </form>
    </main>
  );
}
