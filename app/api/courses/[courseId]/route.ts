import { type NextRequest, NextResponse } from "next/server";

import { getIsAdmin } from "@/lib/admin";
import { dummyCourses } from "@/store/dummy-data";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Linter uyarısını önlemek için dummy await ekleniyor
    await Promise.resolve();

    const isAdmin = getIsAdmin();
    if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

    const course = dummyCourses.find(
      (course) => course.id === parseInt(params.courseId)
    );

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params: _params }: { params: { courseId: string } }
) {
  // Kullanılmayan _params değişkenini işaretliyoruz
  void _params;
  try {
    const isAdmin = getIsAdmin();
    if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

    interface PutBody {
      title: string;
      imageSrc: string;
    }
    const { title, imageSrc } = (await req.json()) as PutBody;

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!imageSrc) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    // Demo sürümünde güncelleme yapılmıyor
    return NextResponse.json({ title, imageSrc });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params: _params }: { params: { courseId: string } }
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
