import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-7xl justify-between gap-10 px-5 py-10">
      <div className="flex-1/3">
        <header className="mb-2 text-5xl font-bold">
          Consistent habits with AI
        </header>
        <p className="mb-4 leading-relaxed">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates
          eveniet ea, laborum rem ad nesciunt dolore inventore impedit nam
          provident, ex, iure debitis ullam cupiditate molestias totam nostrum
          delectus nemo.
        </p>
        <Button variant="secondary" className="hover:cursor-pointer">
          Pricing
        </Button>
      </div>
      <div className="flex-2/3"></div>
    </section>
  );
}
