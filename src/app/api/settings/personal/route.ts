import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getPersonalPricing, setPersonalPricing } from "@/services/settingsService";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getPersonalPricing());
}

// Admin: change the monthly personal class price.
export async function PUT(req: Request) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    return NextResponse.json(await setPersonalPricing(body));
  } catch {
    return NextResponse.json({ error: "Could not save" }, { status: 400 });
  }
}
