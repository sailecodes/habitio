"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { register } from "@/actions/auth";
import { FieldControllerInput } from "@/components/auth/field-controller-input";
import EmailVerificationAlert from "@/components/auth/register/email-verification-alert";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
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
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  async function handleRegister(data: z.infer<typeof registerSchema>) {
    setIsRegistering(true);

    const res = await register(data);

    if (res.success) {
      registerForm.reset();
      setIsDialogOpen(true);
    } else if (!res.success) {
      console.error(res.error);

      if (res.error.includes("taken")) {
        toast.error("One step too slow!", {
          description: "Seems like your email or username are already taken.",
          icon: <span>☹</span>,
        });
      } else {
        toast.error("Uh oh. Something went wrong!", {
          description: "Please try again or refresh the page.",
          icon: <span>😯</span>,
        });
      }
    }

    setIsRegistering(false);
  }

  return (
    <>
      <EmailVerificationAlert
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      <main className="flex justify-center items-center mx-auto p-10 max-w-2xl h-dvh">
        <div className="space-y-10 shadow-md sm:p-10 px-5 py-15 sm:py-18 border-1 rounded-lg w-full shrink-0">
          <header className="text-center">
            <span className="block text-title">Habits</span>
            <span>A smarter way to be consistent.</span>
          </header>
          <form
            id="register-form"
            onSubmit={registerForm.handleSubmit(handleRegister)}
            className="space-y-10">
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
                description="A 6-character or more secret. Make it hard to guess!"
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
              size="lg"
              variant="outline"
              disabled={isRegistering}
              className="bg-indigo-400 hover:bg-indigo-400/80 w-full text-white hover:text-white hover-translate hover-pointer">
              {isRegistering ? <Spinner /> : "Start creating habits"}
            </Button>
            <Separator />
            <span className="block text-sm text-center">
              Already registered? Sign in{" "}
              <Link
                href="/"
                className="text-blue-500 underline underline-offset-2">
                here
              </Link>
              .
            </span>
          </form>
        </div>
      </main>
    </>
  );
}
