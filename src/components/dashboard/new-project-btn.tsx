import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import NewProjectForm from "./new-project-form";

export default function NewProjectBtn() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          variant="secondary"
          className="transition-all hover:-translate-y-0.5 hover:cursor-pointer hover:bg-indigo-300"
        >
          <Plus />
          <span>Add New Project</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="pt-5">
        <DrawerHeader className="p-0">
          <DrawerTitle className="mx-auto max-w-7xl p-10 pt-5 pb-0 text-2xl font-normal -tracking-[2px]">
            Start a new habit.
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="px-0 pt-5 pb-10">
          <NewProjectForm
            closeBtn={
              <DrawerClose className="flex-1/2">
                <Button
                  variant="outline"
                  className="w-full transition-all hover:-translate-y-0.5 hover:cursor-pointer"
                >
                  Cancel
                </Button>
              </DrawerClose>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
