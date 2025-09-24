import { Plus } from "lucide-react";
import NewProjectBtn from "@/components/dashboard/new-project-btn";
import ProjectCard from "@/components/dashboard/project-card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-10 p-10">
      {/* Projects */}
      <div className="space-y-5">
        <header className="flex items-center gap-5">
          <span className="text-3xl font-medium -tracking-[2px]">Projects</span>
          <NewProjectBtn />
        </header>
        <ul className="flex gap-5">
          <ProjectCard name="NQ Trading" streak={51} startDate="Aug 2, 2025" />
          <ProjectCard name="Coding" streak={9} startDate="Sep 18, 2023" />
        </ul>
      </div>

      {/* Stats */}
      {/* <div>
        <header className="text-3xl font-medium -tracking-[2px]">
          Statistics
        </header>
        <div></div>
      </div> */}
    </section>
  );
}
