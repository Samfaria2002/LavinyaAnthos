import { NextResponse } from "next/server";

// Endpoint temporariamente neutro. A página pública usa conteúdo demonstrativo.
export async function GET() {
  return NextResponse.json({ memories: [], demo: true });
}
