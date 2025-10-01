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
import { IHabitsHeader } from "@/lib/interfaces";
import HabitsNewForm from "./habits-new-form";

export default function HabitsHeader({ setHabits }: IHabitsHeader) {
  return (
    <header className="flex items-center justify-between gap-10">
      <div className="flex items-center gap-5">
        <span className="text-header">Projects</span>
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="hover-translate">
              <Plus />
              <span>Add new habit</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="pt-5">
            <DrawerHeader className="p-0">
              <DrawerTitle className="text-subheader container-dm pt-5 pb-0">
                Start a new habit
              </DrawerTitle>
            </DrawerHeader>
            <DrawerFooter className="px-0 pt-5 pb-10">
              <HabitsNewForm setHabits={setHabits} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
