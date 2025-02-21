import { NextResponse } from "next/server";

import { getIsAdmin } from "@/lib/admin";
import { dummyChallengeOptions } from "@/store/dummy-data";

export async function GET(
  req: Request,
  { params }: { params: { challengeOptionId: string } }
) {
  try {
    // Linter uyarısını önlemek için küçük bir await ekliyoruz
    await Promise.resolve();

    const challengeOption = dummyChallengeOptions.find(
      (option) => option.id === parseInt(params.challengeOptionId)
    );

    if (!challengeOption) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(challengeOption);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params: _params }: { params: { challengeOptionId: string } }
) {
  // _params kullanılmadığı için linter uyarısını engellemek adına işaretliyoruz
  void _params;
  try {
    const isAdmin = getIsAdmin();

    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    interface PutRequestBody {
      text: string;
      correct: boolean;
    }

    const { text, correct } = (await req.json()) as PutRequestBody;

    if (!text) {
      return new NextResponse("Text is required", { status: 400 });
    }

    // Demo sürümünde güncelleme yapılmıyor
    return NextResponse.json({ text, correct });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params: _params }: { params: { challengeOptionId: string } }
) {
  // _params kullanılmadığı için linter uyarısını engellemek adına işaretliyoruz
  void _params;
  try {
    const isAdmin = getIsAdmin();

    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Linter uyarısını önlemek için küçük bir await ekliyoruz
    await Promise.resolve();

    // Demo sürümünde silme yapılmıyor
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
