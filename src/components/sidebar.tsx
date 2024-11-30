import { useAppSelector } from "../store";
import { Module } from "./module";

export function Sidebar() {
  const modules = useAppSelector((state) => state.player.course?.modules);

  return (
    <aside className="w-80 border-l border-zinc-800 bg-zinc-900 overflow-y-scroll absolute top-0 divide-y-2 divide-zinc-900 bottom-0 right-0 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
      {modules?.map((module, index) => (
        <Module
          key={module.id}
          moduleIndex={index}
          title={module.title}
          amountOfLessons={module.lessons.length}
        />
      ))}
    </aside>
  );
}
