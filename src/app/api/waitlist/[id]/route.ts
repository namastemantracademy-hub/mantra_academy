import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Waitlist } from "@/models/waitlist";
import { isAdminRequest } from "@/lib/admin-auth";

// Admin: mark as notified (PATCH) or remove (DELETE) one waitlist entry.
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { notified } = await req.json().catch(() => ({ notified: true }));
  await connectToDatabase();
  await Waitlist.updateOne({ _id: id }, notified ? { $set: { notifiedAt: new Date() } } : { $unset: { notifiedAt: 1 } });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await connectToDatabase();
  await Waitlist.deleteOne({ _id: id });
  return NextResponse.json({ ok: true });
}
