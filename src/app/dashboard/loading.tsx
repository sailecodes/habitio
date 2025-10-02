import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="relative mx-auto w-[1410px] space-y-5 p-10">
      <header className="space-y-5">
        <div className="flex items-center gap-5">
          <span className="text-header">Projects</span>
          <div>
            <Button disabled>
              <Plus />
              <span>Add new habit</span>
            </Button>
          </div>
        </div>
        <div className="w-[1330px] overflow-x-hidden">
          <div className="flex items-center gap-5">
            <button disabled>
              <ArrowLeft className="icon pointer-events-none absolute top-[48px] right-[80px] opacity-50" />
            </button>
            <button disabled>
              <ArrowRight className="icon pointer-events-none absolute top-[48px] right-[40px] opacity-50" />
            </button>
          </div>
          <ul className="flex items-center gap-5 py-2">
            {Array.from([1, 2, 3, 4, 5]).map((ind) => (
              <Skeleton
                key={`skeleton-habit-card-${ind}`}
                className="card h-[138px] w-[250px]"
              ></Skeleton>
            ))}
          </ul>
        </div>
      </header>
    </section>
  );
}
