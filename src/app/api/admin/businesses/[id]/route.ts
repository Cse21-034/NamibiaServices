import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import type { NextRequest } from 'next/server';
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const id = params.id;
  const body = await req.json();
  // Allow updating status, verified, featured, etc.
  const allowed = ['status', 'verified', 'featured', 'name', 'description', 'categoryId', 'location', 'phone', 'email'];
  const data = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));
  const business = await prisma.business.update({
    where: { id },
    data
  });
  return NextResponse.json({ business });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const id = params.id;
  await prisma.business.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
