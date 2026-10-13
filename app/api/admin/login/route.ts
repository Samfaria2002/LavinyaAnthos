import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "Configure ADMIN_PASSWORD e ADMIN_SESSION_SECRET nas variáveis de ambiente." }, { status: 503 });
  }

  let password = "";
  try {
    const body = await request.json() as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const submitted = Buffer.from(password);
  const expected = Buffer.from(configuredPassword);
  if (submitted.length !== expected.length || !timingSafeEqual(submitted, expected)) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  try {
    const session = createAdminSession();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(session.cookieName, session.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: session.maxAge,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Não foi possível iniciar a sessão administrativa." }, { status: 503 });
  }
}
