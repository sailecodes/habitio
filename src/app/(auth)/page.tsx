"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { signIn } from "@/actions/auth.action";
import { FieldControllerInput } from "@/components/auth/field-controller-input";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { signInSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignIn() {
  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const router = useRouter();

  async function handleSignIn(data: z.infer<typeof signInSchema>) {
    setIsSigningIn(true);

    const res = await signIn(data);

    if (res.success) {
      router.push("/dashboard");
    } else if (!res.success) {
      console.error(res.error);

      if (res.error.includes("confirmed")) {
        toast.error("Email isn't verified.", {
          description: "Please check your email for the verification link.",
          icon: <span>🤔</span>,
        });
      } else if (res.error.includes("credentials")) {
        toast.error("Well, something isn't right.", {
          description: "Please double-check your email and password.",
          icon: <span>💀</span>,
        });
      } else {
        toast.error("Uh oh. Something went wrong.", {
          description: "Please try again or refresh the page.",
          icon: <span>😯</span>,
        });
      }
    }

    setIsSigningIn(false);
  }

  return (
    <main className="flex justify-center items-center mx-auto p-10 max-w-2xl h-dvh">
      <div className="space-y-10 shadow-md sm:p-10 px-5 py-15 sm:py-18 border-1 rounded-lg w-full shrink-0">
        <header className="text-center">
          <span className="block text-title">
            Ha
            <span className="">bits</span>
          </span>
          <span>A smarter way to be consistent.</span>
        </header>
        <form
          id="register-form"
          onSubmit={signInForm.handleSubmit(handleSignIn)}
          className="space-y-10">
          <FieldGroup>
            <FieldControllerInput
              name="email"
              control={signInForm.control}
              label="Email"
              type="email"
            />
            <FieldControllerInput
              name="password"
              control={signInForm.control}
              label="Password"
              type="password"
            />
          </FieldGroup>
          <Button
            type="submit"
            variant="outline"
            disabled={isSigningIn}
            className="bg-indigo-400 hover:bg-indigo-400/80 w-full text-white hover:text-white hover:cursor-pointer hover-translate">
            {isSigningIn ? <Spinner /> : "Start your habits"}
          </Button>
        </form>
        <Separator />
        <span className="block text-sm text-center">
          Not registered? Sign up{" "}
          <Link
            href="/register"
            className="text-blue-500 underline underline-offset-2">
            here
          </Link>
          .
        </span>
      </div>
    </main>
  );
}
