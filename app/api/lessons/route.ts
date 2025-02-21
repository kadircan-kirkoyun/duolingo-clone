import { type NextRequest, NextResponse } from "next/server";

import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async () => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const dummyLessons = [
    { id: 1, title: "Lesson 1", unitId: 1, order: 1 },
    { id: 2, title: "Lesson 2", unitId: 1, order: 2 },
  ];

  const data = await db.query.lessons.findMany();
  if (data.length === 0) return NextResponse.json(dummyLessons);

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = (await req.json()) as typeof lessons.$inferSelect;

  db.insert(lessons).values({
    ...body,
  });

  return NextResponse.json({ message: "Lesson added successfully" });
};
