import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-red-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-10 text-sm">
        <div className="flex flex-col">
          <span className="text-4xl font-bold tracking-tight">HabitIO</span>
          <span>Creating consistent habits.</span>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/elias-iv-roman/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
