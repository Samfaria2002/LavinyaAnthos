import { NextResponse } from "next/server";

// Autenticação desativada durante o desenvolvimento visual.
export async function POST() {
  return NextResponse.json({ error: "A autenticação será implementada junto ao backend." }, { status: 501 });
}
