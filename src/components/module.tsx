import { ChevronDown } from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";

import { Lesson } from "./lesson";
import { useStore } from "../zustand-store";

type ModuleProps = {
  title: string;
  moduleIndex: number;
  amountOfLessons: number;
};

export function Module({ title, moduleIndex, amountOfLessons }: ModuleProps) {
  const { play, lessons, currentModuleIndex, currentLessonIndex } = useStore(
    (store) => ({
      currentModuleIndex: store.currentModuleIndex,
      currentLessonIndex: store.currentLessonIndex,
      play: store.play,
      lessons: store.course?.modules[moduleIndex].lessons,
    })
  );

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger
        type="button"
        className="flex w-full items-center gap-3 bg-zinc-800 p-4"
      >
        <div className="flex size-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          <span>{moduleIndex + 1}</span>
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="size-5 ml-auto text-zinc-400 group-data-[state=open]:-rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons?.map((lesson, lessonIndex) => {
            const isCurrent =
              currentModuleIndex === moduleIndex &&
              currentLessonIndex === lessonIndex;

            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                isCurrent={isCurrent}
                duration={lesson.duration}
                onPlay={() => play([moduleIndex, lessonIndex])}
              />
            );
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
