import ReactPlayer from "react-player";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStore } from "../zustand-store";

export function Video() {
  const { next, isLoading } = useStore((store) => ({
    next: store.next,
    isLoading: store.isLoading,
  }));

  const { currentLesson } = useCurrentLesson();

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader className="size-6 text-zinc-400 animate-spin" />
        </div>
      )}

      {!isLoading && (
        <ReactPlayer
          width="100%"
          height="100%"
          playing={true}
          controls={true}
          onEnded={next}
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  );
}
