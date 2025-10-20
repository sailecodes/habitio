"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { changePassword } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/lib/providers/user-provider";

export default function SettingsUserInformationPassword() {
  const { user } = useUserStore((state) => state);
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  async function handlePasswordChange() {
    const res = await changePassword(user!.email, password);

    if (res.success) {
      toast.success("Password changed successfully!", {
        description: "Hint, hint. Please write it down somewhere for your sanity.",
        icon: <span>😀</span>,
      });
    } else {
      console.error(res.error);
      toast.error("Uh oh, something went wrong.", {
        description: "Please try again or refresh the page.",
        icon: <span>😯</span>,
      });

      setPassword("");
    }
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-base">
          Password
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="max-w-[600px]"
          />
          {isPasswordVisible ? (
            <button
              onClick={() => setIsPasswordVisible(false)}
              className="hover:cursor-pointer">
              <Eye className="h-[36px] size-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsPasswordVisible(true)}
              className="hover:cursor-pointer">
              <EyeClosed className="size-5" />
            </button>
          )}
        </div>
      </div>
      <div className="space-x-3">
        <Button
          variant="outline"
          disabled={password === ""}
          onClick={() => setPassword("")}
          className="hover:cursor-pointer hover-translate">
          Cancel
        </Button>
        <Button
          disabled={password === ""}
          onClick={handlePasswordChange}
          className="hover:cursor-pointer hover-translate">
          Change
        </Button>
      </div>
    </div>
  );
}
