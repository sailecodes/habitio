"use client";

import { useState } from "react";
import { toast } from "sonner";
import { changeUsername } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/lib/providers/user-provider";

export default function SettingsUsername() {
  const { user } = useUserStore((state) => state);
  const [username, setUsername] = useState<string>(user!.username);

  function handleCancel() {
    setUsername(user!.username);
  }

  async function handleUsernameChange() {
    const res = await changeUsername(user!.username, username);

    if (res.success) {
      toast.success("Username changed successfully!", {
        description: "A new username means a new you and more habits to conquer.",
        icon: <span>😀</span>,
      });
    } else {
      console.error(res.error);
      toast.error("Uh oh. Something went wrong.", {
        description: "Please try again or refresh the page.",
        icon: <span>😯</span>,
      });

      setUsername(user!.username);
    }
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label
          htmlFor="username"
          className="text-base">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="max-w-[600px]"
        />
      </div>
      <div className="space-x-3">
        <Button
          variant="outline"
          disabled={username === user!.username}
          onClick={handleCancel}
          className="hover:cursor-pointer hover-translate">
          Cancel
        </Button>
        <Button
          disabled={username === user!.username}
          onClick={handleUsernameChange}
          className="hover:cursor-pointer hover-translate">
          Change
        </Button>
      </div>
    </div>
  );
}
