import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    /**
     * API
     * - /api/users/1 -> params.id = "1"
     * - /api/users/1?field=name,surname,email -> params.id = "1", request.nextUrl.searchParams.get("field") = "name,surname,email"
     * - /api/users?id=1 -> request.nextUrl.searchParams.get("id") = "1"
     */
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        {
          error: "Id is required",
        },
        { status: 400 }
      );
    }

    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
