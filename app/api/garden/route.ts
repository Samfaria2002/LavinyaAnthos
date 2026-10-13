import { NextResponse } from "next/server";

// Endpoint temporariamente neutro. A interface funciona com dados locais;
// a persistência será implementada quando o backend estiver pronto.
export async function GET() {
  return NextResponse.json({ messages: [], demo: true });
}

export async function POST() {
  return NextResponse.json(
    { error: "A API do Jardim de Palavras ainda não está configurada." },
    { status: 501 },
  );
}
