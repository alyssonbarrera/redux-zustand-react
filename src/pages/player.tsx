import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { Video } from "../components/video";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import { loadCourse, useCurrentLesson } from "../store/slices/player";

export function Player() {
  const dispatch = useAppDispatch();
  const { currentLesson } = useCurrentLesson();

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`;
    }
  }, [currentLesson]);

  useEffect(() => {
    dispatch(loadCourse());
  }, [dispatch]);

  return (
    <div className="h-svh bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-full max-w-[1100px] flex-col gap-6">
        <Header />

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>

          <Sidebar />
        </main>
      </div>
    </div>
  );
}
