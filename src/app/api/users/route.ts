import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();

    return NextResponse.json({ data: users });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);

    const prisma = new PrismaClient();

    const newUser = await prisma.user.create({
      data: body,
    });

    return NextResponse.json({ data: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create a user" },
      { status: 500 }
    );
  }
}
