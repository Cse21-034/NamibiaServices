import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "BUSINESS") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const business = await prisma.business.findFirst({
    where: {
      ownerId: session.user.id,
      isBranch: false
    },
    include: { photos: true, category: true },
  });
  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }
  return NextResponse.json(business);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "BUSINESS") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();

  // First find the business
  const business = await prisma.business.findFirst({
    where: {
      ownerId: session.user.id,
      isBranch: false
    }
  });

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  // Then update it by its unique ID
  const updated = await prisma.business.update({
    where: { id: business.id },
    data,
  });

  return NextResponse.json(updated);
}
