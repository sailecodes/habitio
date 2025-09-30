import prisma from "@/lib/prisma/prismaClient";
import Projects from "./projects";

export default async function ProjectsRoot() {
  const projectsData = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <Projects projectsData={projectsData} />;
}
