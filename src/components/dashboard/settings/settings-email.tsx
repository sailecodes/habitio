"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { changeEmail } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/lib/providers/user-provider";

export default function SettingsEmail() {
  const { user } = useUserStore((state) => state);
  const [email, setEmail] = useState<string>(user!.email);

  function handleCancel() {
    setEmail(user!.email);
  }

  async function handleEmailUpdate() {
    const res = await changeEmail(user!.email, email);

    if (res.success) {
      toast.success("Email changed successfully!", {
        description: "New email? Sweet. Now to tackle those habits.",
        icon: <span>😀</span>,
      });
    } else {
      console.error(res.error);
      toast.error("Uh oh. Something went wrong.", {
        description: "Please try again or refresh the page.",
        icon: <span>😯</span>,
      });

      setEmail(user!.email);
    }
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-base">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="max-w-[600px]"
        />
      </div>
      <div className="space-x-3">
        <Button
          variant="outline"
          disabled={email === user!.email}
          onClick={handleCancel}
          className="hover:cursor-pointer hover-translate">
          Cancel
        </Button>
        <Button
          disabled={email === user!.email}
          onClick={handleEmailUpdate}
          className="hover:cursor-pointer hover-translate">
          Change
        </Button>
      </div>
    </div>
  );
}
