import Link from "next/link";
import { IProjectsCard } from "@/lib/interfaces";

export default function ProjectsCard({
  id,
  name,
  streak,
  startDate,
}: IProjectsCard) {
  return (
    <li>
      <Link
        href={`/dashboard/${name}/${id}`}
        className="card hover-translate flex w-[250px] flex-col"
      >
        <header className="text-subheader line-clamp-1">{name}</header>
        <span className="text-sm">
          <span className="text-base">{streak}</span> day streak
        </span>
        <span className="mt-5 text-sm">Started on {startDate}</span>
      </Link>
    </li>
  );
}
