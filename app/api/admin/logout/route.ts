import { NextResponse } from "next/server";

// Autenticação desativada durante o desenvolvimento visual.
export async function POST() {
  return NextResponse.json({ ok: true, demo: true });
}
