import { type NextRequest, NextResponse } from "next/server";

import { getIsAdmin } from "@/lib/admin";
import { dummyChallenges } from "@/store/dummy-data";

export const GET = async () => {
  // Linter uyarısını önlemek için dummy await ekliyoruz
  await Promise.resolve();
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  return NextResponse.json(dummyChallenges);
};

export const POST = async (req: NextRequest) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  // Gelen veriyi Record<string, unknown> tipine cast ederek unsafe assignment hatasını gideriyoruz
  const body = (await req.json()) as Record<string, unknown>;

  // Demo sürümünde yeni challenge oluşturulmuş gibi yapıyoruz
  const newChallenge = {
    ...body,
    id: Math.floor(Math.random() * 1000),
  };

  return NextResponse.json(newChallenge);
};
