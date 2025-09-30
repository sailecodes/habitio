"use client";

import { useState } from "react";
import { IProjects } from "@/lib/interfaces";
import { TProject } from "@/lib/types";
import { ProjectsCarousel } from "./projects-carousel";
import ProjectsHeader from "./projects-header";

export default function Projects({ projectsData }: IProjects) {
  const [projects, setProjects] = useState<TProject[]>(projectsData);

  return (
    <section className="relative mx-auto w-[1410px] space-y-5 p-10">
      <ProjectsHeader setProjects={setProjects} />
      <ProjectsCarousel projects={projects} />
    </section>
  );
}
