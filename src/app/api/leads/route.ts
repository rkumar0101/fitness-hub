import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ ok: true, received: body });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Lead capture failed" },
      { status: 500 }
    );
  }
}