import { type NextRequest, NextResponse } from "next/server";

import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async () => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const dummyUnits = [
    { id: 1, title: 'Unit 1', description: 'Learn the basics of Spanish', courseId: 1, order: 1 },
    { id: 2, title: 'Unit 2', description: 'Intermediate Spanish', courseId: 1, order: 2 },
  ];

  const data = await db.query.units.findMany();
  if (data.length === 0) return NextResponse.json(dummyUnits);

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = (await req.json()) as typeof units.$inferSelect;

  // db.insert(...).values(...) ifadesi promise döndürmüyorsa await'e gerek yoktur.
  db.insert(units).values({
    ...body,
  });

  return NextResponse.json({ message: 'Unit added successfully' });
};
