import { cache } from "react";
import {
  dummyChallenges,
  dummyCourses,
  dummyLessons,
  dummyUnits,
  dummyUserProgress
} from "@/store/dummy-data";

type Challenge = {
  id: number;
  lessonId: number;
  type: string;
  question: string;
  order: number;
};

type Lesson = {
  id: number;
  unitId: number;
  title: string;
  order: number;
};

type Unit = {
  id: number;
  courseId: number;
  title: string;
  description: string;
  order: number;
};

type LessonWithChallenges = Lesson & {
  challenges: (Challenge & { completed: boolean })[];
  completed: boolean;
};

type LessonWithUnit = LessonWithChallenges & {
  unit: Unit;
};

// Removed unused types and constants (UnitWithLessons, DAY_IN_MS)

export const getCourses = cache(() => Promise.resolve(dummyCourses));

export const getUserProgress = cache(() => Promise.resolve(dummyUserProgress));

export const getUnits = cache(() =>
  Promise.resolve(
    dummyUnits.map((unit) => ({
      ...unit,
      lessons: dummyLessons
        .filter((lesson) => lesson.unitId === unit.id)
        .map((lesson) => ({
          ...lesson,
          challenges: dummyChallenges
            .filter((challenge) => challenge.lessonId === lesson.id)
            .map((challenge) => ({
              ...challenge,
              completed: Math.random() > 0.5,
            })),
          completed: Math.random() > 0.5,
        })),
    }))
  )
);

export const getCourseById = cache((id: number) => {
  const course = dummyCourses.find((course) => course.id === id);
  if (!course) return Promise.resolve(null);

  return Promise.resolve({
    ...course,
    units: dummyUnits
      .filter((unit) => unit.courseId === course.id)
      .map((unit) => ({
        ...unit,
        lessons: dummyLessons.filter((lesson) => lesson.unitId === unit.id),
      })),
  });
});

export const getCourseProgress = cache(async () => {
  const units = await getUnits();
  const firstIncompleteLesson = units
    .flatMap((unit) => unit.lessons)
    .find((lesson) => !lesson.completed);

  let activeLesson: LessonWithUnit | undefined;

  if (firstIncompleteLesson) {
    const unit = units.find((unit) =>
      unit.lessons.some((lesson) => lesson.id === firstIncompleteLesson.id)
    );
    if (unit) {
      activeLesson = {
        ...firstIncompleteLesson,
        unit: {
          id: unit.id,
          title: unit.title,
          description: unit.description,
          courseId: unit.courseId,
          order: unit.order,
        },
      };
    }
  }

  return {
    activeLesson,
    activeLessonId: activeLesson?.id,
  };
});

export const getLesson = cache((id?: number) => {
  if (!id) return Promise.resolve(null);

  const lesson = dummyLessons.find((lesson) => lesson.id === id);
  if (!lesson) return Promise.resolve(null);

  return Promise.resolve({
    ...lesson,
    challenges: dummyChallenges
      .filter((challenge) => challenge.lessonId === lesson.id)
      .map((challenge) => ({
        ...challenge,
        completed: Math.random() > 0.5,
      })),
  });
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();
  if (!courseProgress?.activeLessonId) return 0;

  const lesson = await getLesson(courseProgress.activeLessonId);
  if (!lesson) return 0;

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );
  return Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );
});

export const getUserSubscription = () => {
  return {
    isActive: false,
    userId: "demo-user",
  };
};

export const getTopTenUsers = () => {
  return [
    {
      userId: "1",
      userName: "Ahmet",
      userImageSrc: "/avatars/1.png",
      points: 1200,
    },
    {
      userId: "2",
      userName: "Mehmet",
      userImageSrc: "/avatars/2.png",
      points: 1000,
    },
    {
      userId: "3",
      userName: "Ayşe",
      userImageSrc: "/avatars/3.png",
      points: 800,
    },
    {
      userId: "4",
      userName: "Fatma",
      userImageSrc: "/avatars/4.png",
      points: 600,
    },
    {
      userId: "5",
      userName: "Ali",
      userImageSrc: "/avatars/5.png",
      points: 400,
    },
  ];
};
