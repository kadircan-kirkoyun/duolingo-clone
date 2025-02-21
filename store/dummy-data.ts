// dummy-data.ts

// Tip tanımları
export type ChallengeOption = {
  id: number;
  imageSrc: string | null;
  text: string;
  correct: boolean;
  challengeId: number;
  audioSrc: string | null;
};

export type Challenge = {
  id: number;
  lessonId: number;
  type: "SELECT" | "ASSIST";
  question: string;
  order: number;
  challengeOptions: ChallengeOption[];
};

export type Lesson = {
  id: number;
  unitId: number;
  title: string;
  order: number;
};

export type Unit = {
  id: number;
  courseId: number;
  title: string;
  description: string;
  order: number;
};

export type LessonWithChallenges = Lesson & {
  challenges: (Challenge & { completed: boolean })[];
  completed: boolean;
  unit?: Unit;
};

export type UnitWithLessons = Unit & {
  lessons: LessonWithChallenges[];
};

// Dummy veriler
export const dummyUserProgress = {
  userId: "dummy_user_id",
  userName: "Demo User",
  userImageSrc: "/mascot.svg",
  activeCourseId: 1,
  activeCourse: {
    id: 1,
    title: "Spanish",
    imageSrc: "/es.svg",
  },
  hearts: 5,
  points: 100,
};

export const dummyCourses = [
  {
    id: 1,
    title: "Spanish",
    imageSrc: "/es.svg",
  },
  {
    id: 2,
    title: "French",
    imageSrc: "/fr.svg",
  },
  {
    id: 3,
    title: "Italian",
    imageSrc: "/it.svg",
  },
];

export const dummyUnits = [
  {
    id: 1,
    courseId: 1,
    title: "Unit 1",
    description: "Basic Phrases",
    order: 1,
  },
  {
    id: 2,
    courseId: 1,
    title: "Unit 2",
    description: "Greetings",
    order: 2,
  },
];

export const dummyLessons = [
  {
    id: 1,
    unitId: 1,
    title: "Lesson 1",
    order: 1,
  },
  {
    id: 2,
    unitId: 1,
    title: "Lesson 2",
    order: 2,
  },
];

export const dummyChallengeOptions: ChallengeOption[] = [
  {
    id: 1,
    challengeId: 1,
    text: "Hola",
    correct: true,
    imageSrc: null,
    audioSrc: null,
  },
  {
    id: 2,
    challengeId: 1,
    text: "Adiós",
    correct: false,
    imageSrc: null,
    audioSrc: null,
  },
  {
    id: 3,
    challengeId: 1,
    text: "Gracias",
    correct: false,
    imageSrc: null,
    audioSrc: null,
  },
];

export const dummyChallenges: (Challenge & { completed: boolean })[] = [
  {
    id: 1,
    lessonId: 1,
    type: "SELECT",
    question: "Which one means 'Hello'?",
    order: 1,
    completed: false,
    challengeOptions: dummyChallengeOptions.filter(
      (option) => option.challengeId === 1
    ),
  },
  {
    id: 2,
    lessonId: 1,
    type: "ASSIST",
    question: "Complete: '¡H_la!'",
    order: 2,
    completed: false,
    challengeOptions: [],
  },
];
