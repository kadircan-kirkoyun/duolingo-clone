// import { neon } from "@neondatabase/serverless";
import "dotenv/config";
// import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

// const sql = neon(process.env.DATABASE_URL);

// const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Dummy veriler
    const dummyCourses = [{ title: "Spanish", imageSrc: "/es.svg" }];
    const dummyUnits = [
      { courseId: 1, title: "Unit 1", description: "Learn the basics of Spanish", order: 1 },
      { courseId: 1, title: "Unit 2", description: "Learn intermediate Spanish", order: 2 },
    ];
    const dummyLessons = [
      { unitId: 1, title: "Nouns", order: 1 },
      { unitId: 1, title: "Verbs", order: 2 },
    ];

    console.log("Dummy veriler eklendi.");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

void main();
