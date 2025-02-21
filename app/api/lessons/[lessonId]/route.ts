import { type NextRequest, NextResponse } from "next/server";

import { getIsAdmin } from "@/lib/admin";
import { dummyLessons } from "@/store/dummy-data";

export async function GET(
  req: Request,
  { params }: { params: { lessonId: string } }
) {
  try {
    // Linter uyarısını önlemek için dummy await ekleniyor
    await Promise.resolve();

    const isAdmin = getIsAdmin();
    if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

    const lesson = dummyLessons.find(
      (lesson) => lesson.id === parseInt(params.lessonId)
    );

    if (!lesson) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(lesson);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params: _params }: { params: { lessonId: string } }
) {
  // Kullanılmayan _params değişkenini işaretleyerek linter uyarısını engelliyoruz
  void _params;
  try {
    const isAdmin = getIsAdmin();
    if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

    interface PutBody {
      title: string;
      unitId: number;
      order: number;
    }
    const { title, unitId, order } = (await req.json()) as PutBody;

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!unitId) {
      return new NextResponse("Unit ID is required", { status: 400 });
    }

    if (typeof order !== "number") {
      return new NextResponse("Order must be a number", { status: 400 });
    }

    // Demo sürümünde güncelleme yapılmıyor
    return NextResponse.json({ title, unitId, order });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params: _params }: { params: { lessonId: string } }
) {
  // Kullanılmayan _req ve _params değişkenlerini işaretliyoruz
  void _req;
  void _params;
  try {
    // Linter uyarısını önlemek için dummy await ekleniyor
    await Promise.resolve();

    const isAdmin = getIsAdmin();
    if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

    // Demo sürümünde silme yapılmıyor
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
