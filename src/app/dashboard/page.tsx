import Link from "next/link";

export default function Dashboard() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-10 p-10">
      {/* Projects */}
      <div className="space-y-5">
        <header className="text-3xl font-medium -tracking-[2px]">
          Projects
        </header>
        <ul className="flex gap-5">
          <li>
            <Link
              href="/dashboard/project-name"
              className="flex w-[250px] flex-col rounded-md border-1 p-5 shadow-md transition-all hover:-translate-y-0.5"
            >
              <header className="line-clamp-1 text-2xl -tracking-[2px]">
                Project Name
              </header>
              <span className="text-sm">
                <span className="text-base">134</span> day streak
              </span>
              <span className="mt-5 text-sm">Jun 2, 2024 - Sep 5, 2025</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/project-name"
              className="flex w-[250px] flex-col rounded-md border-1 p-5 shadow-md transition-all hover:-translate-y-0.5"
            >
              <header className="line-clamp-1 text-2xl -tracking-[2px]">
                Project Name
              </header>
              <span className="text-sm">
                <span className="text-base">134</span> day streak
              </span>
              <span className="mt-5 text-sm">Jun 2, 2024 - Sep 5, 2025</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Stats */}
      <div>
        <header className="text-3xl font-medium -tracking-[2px]">
          Statistics
        </header>
        <div></div>
      </div>
    </section>
  );
}
