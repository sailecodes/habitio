import { Bell, BellDot } from "lucide-react";

export default function Notifications() {
  return (
    <button className="hover:cursor-pointer">
      {/* <Bell className="size-5" /> */}
      <BellDot className="size-5" />
    </button>
  );
}
