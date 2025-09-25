"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { TProject } from "@/lib/types";
import { getSimplifiedDate } from "@/lib/utils";
import ProjectsCard from "./projects-card";

export function ProjectsCarousel({ projects }: { projects: TProject[] }) {
  const [currInd, setCurrInd] = useState<number>(0);

  function moveCarouselLeft() {
    if (currInd === 0) {
      return;
    }

    setCurrInd(currInd - 1);
  }

  function moveCarouselRight() {
    if (currInd === Math.ceil(projects.length / 5) - 1) {
      return;
    }

    setCurrInd(currInd + 1);
  }

  return (
    <div className="w-[1330px] overflow-x-hidden">
      <div className="flex items-center gap-5">
        <button onClick={moveCarouselLeft} disabled={currInd === 0}>
          <ArrowLeft
            className={`icon absolute top-[48px] right-[80px] ${currInd === 0 ? "pointer-events-none opacity-50" : "hover-translate opacity-100"}`}
          />
        </button>
        <button
          onClick={moveCarouselRight}
          disabled={currInd === Math.ceil(projects.length / 5 - 1)}
        >
          <ArrowRight
            className={`icon absolute top-[48px] right-[40px] ${currInd === Math.ceil(projects.length / 5 - 1) ? "pointer-events-none opacity-50" : "hover-translate opacity-100"}`}
          />
        </button>
      </div>
      <ul
        className={`flex items-center gap-5 py-2 transition-transform duration-550 -translate-x-[${101.5 * currInd}%]`}
      >
        {/* TODO:
          - Order from most recent to oldest.
          - Add a sorter
          - Add a search bar  */}
        {projects.map((project) => (
          <ProjectsCard
            key={project.id}
            name={project.habitName}
            streak={project.streak}
            startDate={getSimplifiedDate(project.createdAt)}
          />
        ))}
      </ul>
    </div>
  );
}
