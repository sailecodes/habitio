import Link from "next/link";

export default function ProjectsCard({
  name,
  streak,
  startDate,
}: {
  name: string;
  streak: number;
  startDate: string;
}) {
  return (
    <li>
      <Link
        href="/dashboard/project-name"
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
