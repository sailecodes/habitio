import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import NewProjectForm from "./new-project-form";

export default function AddNewProjectButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="hover-translate">
          <Plus />
          <span>Add New Project</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="pt-5">
        <DrawerHeader className="p-0">
          <DrawerTitle className="text-subheader container-dm pt-5 pb-0">
            Start a new habit.
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="px-0 pt-5 pb-10">
          <NewProjectForm />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
