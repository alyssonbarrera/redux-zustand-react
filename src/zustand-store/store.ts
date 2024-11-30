import { createWithEqualityFn as create } from "zustand/traditional";
import { api } from "../lib/axios";

type Course = {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
};

export type PlayerState = {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;

  load: () => Promise<void>;
  play: (moduleAndLessonIndex: [number, number]) => void;
  next: () => void;
};

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    isLoading: true,
    currentModuleIndex: 0,
    currentLessonIndex: 0,

    load: async () => {
      set({ isLoading: true });

      const { data: course } = await api.get("/courses/1");

      set({ course, isLoading: false });
    },

    play: ([moduleIndex, lessonIndex]: [number, number]) => {
      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex,
      });
    },
    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get();

      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({ currentLessonIndex: nextLessonIndex });
      } else {
        const nextModuleIndex = currentModuleIndex + 1;
        const nextModule = course?.modules[nextModuleIndex];

        if (nextModule) {
          set({ currentModuleIndex: nextModuleIndex, currentLessonIndex: 0 });
        }
      }
    },
  };
});

export const useCurrentLesson = () => {
  return useStore((state) => {
    const { currentLessonIndex, currentModuleIndex, course } = state;

    const currentModule = course?.modules[currentModuleIndex];
    const currentLesson = currentModule?.lessons[currentLessonIndex];

    return { currentModule, currentLesson };
  });
};
