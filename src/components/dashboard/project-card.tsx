import Link from "next/link";

export default function ProjectCard({
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
        className="flex w-[250px] flex-col rounded-md border-1 p-5 shadow-md transition-all hover:-translate-y-0.5"
      >
        <header className="line-clamp-1 text-2xl -tracking-[2px]">
          {name}
        </header>
        <span className="text-sm">
          <span className="text-base">{streak}</span> day streak
        </span>
        <span className="mt-5 text-sm">Started on {startDate}</span>
      </Link>
    </li>
  );
}
