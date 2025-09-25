import prisma from "@/lib/prisma/prismaClient";
import AddNewProjectButton from "./add-new-project-button";
import { ProjectsCarousel } from "./projects-carousel";

export default async function Projects() {
  const projects = await prisma.project.findMany();

  return (
    <section className="relative mx-auto w-[1410px] space-y-5 p-10">
      <header className="flex items-center justify-between gap-10">
        <div className="flex items-center gap-5">
          <span className="text-header">Projects</span>
          <AddNewProjectButton />
        </div>
      </header>
      <ProjectsCarousel projects={projects} />
    </section>
  );
}
