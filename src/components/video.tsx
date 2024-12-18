import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../store";
import { next, useCurrentLesson } from "../store/slices/player";
import { Loader } from "lucide-react";

export function Video() {
  const dispatch = useAppDispatch();
  const { currentLesson } = useCurrentLesson();
  const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  function handlePlayNext() {
    dispatch(next());
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isCourseLoading && (
        <div className="flex items-center justify-center">
          <Loader className="size-6 text-zinc-400 animate-spin" />
        </div>
      )}

      {!isCourseLoading && (
        <ReactPlayer
          width="100%"
          height="100%"
          playing={true}
          controls={true}
          onEnded={handlePlayNext}
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  );
}
