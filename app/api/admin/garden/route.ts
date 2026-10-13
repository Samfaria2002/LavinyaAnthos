// import { desc, eq } from "drizzle-orm";
// import { NextResponse } from "next/server";
// import { db } from "@/db";
// import { gardenMessages } from "@/db/schema";
// import { isAdminSessionValid } from "@/lib/admin-auth";

// export const runtime = "nodejs";

// function authorized(request: Request) {
//   const cookie = request.headers.get("cookie") ?? "";
//   const value = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith("anthos_admin="))?.slice("anthos_admin=".length);
//   return isAdminSessionValid(value ? decodeURIComponent(value) : undefined);
// }

// export async function GET(request: Request) {
//   if (!authorized(request)) return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
//   try {
//     const messages = await db.select().from(gardenMessages).orderBy(desc(gardenMessages.createdAt));
//     return NextResponse.json({ messages });
//   } catch {
//     return NextResponse.json({ error: "Não foi possível carregar as mensagens." }, { status: 503 });
//   }
// }

// export async function PATCH(request: Request) {
//   if (!authorized(request)) return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
//   try {
//     const body = await request.json() as { id?: unknown; status?: unknown };
//     const id = Number(body.id);
//     if (!Number.isInteger(id) || id < 1 || !["approved", "rejected", "pending"].includes(String(body.status))) {
//       return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
//     }
//     await db.update(gardenMessages).set({ status: String(body.status) }).where(eq(gardenMessages.id, id));
//     return NextResponse.json({ ok: true });
//   } catch {
//     return NextResponse.json({ error: "Não foi possível atualizar a mensagem." }, { status: 503 });
//   }
// }
