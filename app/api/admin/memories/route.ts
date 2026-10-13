// import { desc, eq } from "drizzle-orm";
// import { NextResponse } from "next/server";
// import { db } from "@/db";
// import { exhibitionMemories } from "@/db/schema";
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
//     const memories = await db.select().from(exhibitionMemories).orderBy(desc(exhibitionMemories.createdAt));
//     return NextResponse.json({ memories });
//   } catch {
//     return NextResponse.json({ error: "Não foi possível carregar as memórias." }, { status: 503 });
//   }
// }

// export async function POST(request: Request) {
//   if (!authorized(request)) return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
//   try {
//     const body = await request.json() as { title?: unknown; description?: unknown; imageUrl?: unknown; eventDate?: unknown; published?: unknown };
//     const title = typeof body.title === "string" ? body.title.trim() : "";
//     const description = typeof body.description === "string" ? body.description.trim() : "";
//     const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";
//     const eventDate = typeof body.eventDate === "string" && body.eventDate ? new Date(body.eventDate) : null;
//     if (title.length < 2 || title.length > 120 || description.length < 3 || description.length > 3000) {
//       return NextResponse.json({ error: "Informe um título e uma descrição válidos." }, { status: 400 });
//     }
//     if (imageUrl && !/^https:\/\//i.test(imageUrl)) {
//       return NextResponse.json({ error: "A imagem deve usar uma URL HTTPS." }, { status: 400 });
//     }
//     if (eventDate && Number.isNaN(eventDate.getTime())) {
//       return NextResponse.json({ error: "A data informada é inválida." }, { status: 400 });
//     }
//     await db.insert(exhibitionMemories).values({
//       title,
//       description,
//       imageUrl: imageUrl || null,
//       eventDate,
//       published: body.published === true,
//     });
//     return NextResponse.json({ ok: true }, { status: 201 });
//   } catch {
//     return NextResponse.json({ error: "Não foi possível salvar a memória." }, { status: 503 });
//   }
// }

// export async function PATCH(request: Request) {
//   if (!authorized(request)) return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
//   try {
//     const body = await request.json() as { id?: unknown; published?: unknown };
//     const id = Number(body.id);
//     if (!Number.isInteger(id) || id < 1 || typeof body.published !== "boolean") {
//       return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
//     }
//     await db.update(exhibitionMemories).set({ published: body.published }).where(eq(exhibitionMemories.id, id));
//     return NextResponse.json({ ok: true });
//   } catch {
//     return NextResponse.json({ error: "Não foi possível atualizar a memória." }, { status: 503 });
//   }
// }

// export async function DELETE(request: Request) {
//   if (!authorized(request)) return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
//   try {
//     const body = await request.json() as { id?: unknown };
//     const id = Number(body.id);
//     if (!Number.isInteger(id) || id < 1) return NextResponse.json({ error: "ID inválido." }, { status: 400 });
//     await db.delete(exhibitionMemories).where(eq(exhibitionMemories.id, id));
//     return NextResponse.json({ ok: true });
//   } catch {
//     return NextResponse.json({ error: "Não foi possível remover a memória." }, { status: 503 });
//   }
// }
