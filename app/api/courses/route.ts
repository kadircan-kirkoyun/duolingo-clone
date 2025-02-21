import { type NextRequest, NextResponse } from "next/server";

import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async () => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const dummyCourses = [
    { id: 1, title: 'Spanish Course', imageSrc: 'course-image.png' },
  ];

  const data = await db.query.courses.findMany();
  if (data.length === 0) return NextResponse.json(dummyCourses);

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = (await req.json()) as typeof courses.$inferSelect;

  // db.insert(courses).values(...) dönen değer Promise değilse, await ve atama gerekmez
  db.insert(courses).values({
    ...body,
  });

  return NextResponse.json({ message: 'Course added successfully' });
};
