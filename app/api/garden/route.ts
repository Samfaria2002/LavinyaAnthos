// import { desc, eq } from "drizzle-orm";
// import { NextResponse } from "next/server";
// import { db } from "@/db";
// import { gardenMessages } from "@/db/schema";

// export const runtime = "nodejs";

// const allowedFlowers = new Set(["margarida", "girassol", "rosa", "tulipa", "lavanda", "calendula"]);

// export async function GET() {
//   try {
//     const messages = await db.select({
//       id: gardenMessages.id,
//       message: gardenMessages.message,
//       flower: gardenMessages.flower,
//       createdAt: gardenMessages.createdAt,
//     }).from(gardenMessages)
//       .where(eq(gardenMessages.status, "approved"))
//       .orderBy(desc(gardenMessages.createdAt))
//       .limit(100);
//     return NextResponse.json({ messages });
//   } catch {
//     return NextResponse.json({ error: "Não foi possível carregar o jardim. Verifique a configuração do banco de dados." }, { status: 503 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json() as { message?: unknown; flower?: unknown };
//     const message = typeof body.message === "string" ? body.message.trim() : "";
//     const flower = typeof body.flower === "string" && allowedFlowers.has(body.flower) ? body.flower : "margarida";

//     if (message.length < 3 || message.length > 280) {
//       return NextResponse.json({ error: "Escreva uma mensagem entre 3 e 280 caracteres." }, { status: 400 });
//     }

//     await db.insert(gardenMessages).values({ message, flower, status: "pending" });
//     return NextResponse.json({ ok: true, message: "Sua palavra foi recebida e aparecerá no jardim depois da aprovação." }, { status: 201 });
//   } catch {
//     return NextResponse.json({ error: "Não foi possível enviar sua mensagem. Tente novamente mais tarde." }, { status: 503 });
//   }
// }
