import { NextResponse } from "next/server";

import { getIsAdmin } from "@/lib/admin";
import { dummyChallenges } from "@/store/dummy-data";

export async function GET(
  req: Request,
  { params }: { params: { challengeId: string } }
) {
  try {
    // Linter uyarısını önlemek için dummy await ekliyoruz
    await Promise.resolve();

    const challenge = dummyChallenges.find(
      (challenge) => challenge.id === parseInt(params.challengeId)
    );

    if (!challenge) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(challenge);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params: _params }: { params: { challengeId: string } }
) {
  // Kullanılmayan _params değişkenini işaretleyerek linter uyarısını engelliyoruz
  void _params;
  try {
    const isAdmin = getIsAdmin();

    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    interface PutBody {
      question: string;
      type: string;
    }
    const { question, type } = (await req.json()) as PutBody;

    if (!question) {
      return new NextResponse("Question is required", { status: 400 });
    }

    if (!type) {
      return new NextResponse("Type is required", { status: 400 });
    }

    // Demo sürümünde güncelleme yapılmıyor
    return NextResponse.json({ question, type });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params: _params }: { params: { challengeId: string } }
) {
  // Kullanılmayan _req ve _params değişkenlerini işaretleyerek linter uyarısını engelliyoruz
  void _req;
  void _params;
  try {
    const isAdmin = getIsAdmin();

    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Linter uyarısını önlemek için dummy await ekliyoruz
    await Promise.resolve();

    // Demo sürümünde silme yapılmıyor
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
