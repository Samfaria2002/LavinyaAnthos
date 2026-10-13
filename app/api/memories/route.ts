// import { desc, eq } from "drizzle-orm";
// import { NextResponse } from "next/server";
// import { db } from "@/db";
// import { exhibitionMemories } from "@/db/schema";

// export const runtime = "nodejs";

// export async function GET() {
//   try {
//     const memories = await db.select({
//       id: exhibitionMemories.id,
//       title: exhibitionMemories.title,
//       description: exhibitionMemories.description,
//       imageUrl: exhibitionMemories.imageUrl,
//       eventDate: exhibitionMemories.eventDate,
//     }).from(exhibitionMemories)
//       .where(eq(exhibitionMemories.published, true))
//       .orderBy(desc(exhibitionMemories.eventDate), desc(exhibitionMemories.createdAt));
//     return NextResponse.json({ memories });
//   } catch {
//     return NextResponse.json({ error: "Não foi possível carregar as memórias. Verifique a configuração do banco de dados." }, { status: 503 });
//   }
// }
