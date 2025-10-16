import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IHabitsDrawerProps } from "@/lib/interfaces";
import HabitsNewForm from "./habits-new-form";

export default function HabitsDrawer({ setHabits }: IHabitsDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="hover-translate hover-pointer">
          <Plus />
          <span>Add new habit</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="pt-5">
        <DrawerHeader className="p-0">
          <DrawerTitle className="pt-5 pb-0 text-subheader">Start a new habit</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="px-0 pt-5 pb-10">
          <HabitsNewForm setHabits={setHabits} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
