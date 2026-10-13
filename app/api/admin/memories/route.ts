import { NextResponse } from "next/server";

// Stubs para preservar rotas válidas sem acoplar o build ao banco.
export async function GET() {
  return NextResponse.json({ error: "API administrativa ainda não configurada." }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ error: "API administrativa ainda não configurada." }, { status: 501 });
}

export async function PATCH() {
  return NextResponse.json({ error: "API administrativa ainda não configurada." }, { status: 501 });
}

export async function DELETE() {
  return NextResponse.json({ error: "API administrativa ainda não configurada." }, { status: 501 });
}
