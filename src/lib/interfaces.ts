import { TProject } from "./types";

export interface IProjects {
  projectsData: TProject[];
}

export interface IProjectsHeader {
  setProjects: React.Dispatch<React.SetStateAction<TProject[]>>;
}

export interface IProjectsNewForm {
  setProjects: React.Dispatch<React.SetStateAction<TProject[]>>;
}

export interface IProjectsCarousel {
  projects: TProject[];
}

export interface IProjectsCard {
  id: string;
  name: string;
  streak: number;
  startDate: string;
}
