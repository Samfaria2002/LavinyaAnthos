import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Florescer — Exposição de Lavinya Chaves",
  description:
    "Conheça FLORESCER, coleção de telas de Lavinya Chaves inspirada em fé, resiliência e no tempo certo de florescer.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
