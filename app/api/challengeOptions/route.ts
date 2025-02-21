import { NextResponse } from "next/server";

import { getIsAdmin } from "@/lib/admin";
import { dummyChallengeOptions } from "@/store/dummy-data";

export async function GET() {
  try {
    // Linter uyarısını önlemek için küçük bir await ekliyoruz
    await Promise.resolve();
    return NextResponse.json(dummyChallengeOptions);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAdmin = getIsAdmin();

    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // JSON'dan dönen değerin tipini belirtmek için tip ataması yapıyoruz
    const { text, correct, challengeId } = (await req.json()) as {
      text: string;
      correct: boolean;
      challengeId: string;
    };

    if (!text) {
      return new NextResponse("Text is required", { status: 400 });
    }

    if (!challengeId) {
      return new NextResponse("Challenge ID is required", { status: 400 });
    }

    // Demo sürümünde ekleme yapılmıyor
    return NextResponse.json({
      id: Math.floor(Math.random() * 1000),
      text,
      correct,
      challengeId,
    });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
