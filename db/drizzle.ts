import { courses, lessons, units } from "@/db/schema";

const db = {
  query: {
    courses: {
      findMany: () => Promise.resolve([]),
      findFirst: (where?: unknown) => {
        void where;
        return Promise.resolve(null);
      },
    },
    units: {
      findMany: () => Promise.resolve([]),
      findFirst: (where?: unknown) => {
        void where;
        return Promise.resolve(null);
      },
    },
    lessons: {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
    },
    challenges: {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
    },
    challengeOptions: {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
    },
    userProgress: {
      findFirst: () => Promise.resolve(null),
    },
    userSubscription: {
      findFirst: () => Promise.resolve(null),
    },
  },
  insert: (_table: typeof courses | typeof lessons | typeof units) => {
    void _table;
    return {
      values: (data: object) => ({
        returning: () => Promise.resolve([data]),
      }),
    };
  },
  update: (_table: typeof units) => {
    void _table;
    return {
      set: (data: object) => ({
        where: (condition: unknown) => ({
          returning: () => Promise.resolve([data]),
        }),
      }),
    };
  },
  delete: (_table: typeof units) => {
    void _table;
    return {
      where: () => ({
        returning: () => Promise.resolve([]),
      }),
    };
  },
};

export default db;
