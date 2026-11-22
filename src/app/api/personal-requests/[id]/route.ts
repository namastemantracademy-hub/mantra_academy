import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import { PersonalRequest } from "@/models/personal-request";
import { isAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
const STATUSES = ["new", "contacted", "confirmed", "closed"];

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { status } = await req.json().catch(() => ({}));
  if (!STATUSES.includes(status)) return NextResponse.json({ error: "Bad status" }, { status: 400 });
  await connectToDatabase();
  const doc = await PersonalRequest.findByIdAndUpdate(id, { $set: { status } }, { new: true }).lean();
  return doc ? NextResponse.json(doc) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await connectToDatabase();
  await PersonalRequest.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
