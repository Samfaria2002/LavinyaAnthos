"use client";

import Link from "next/link";
import { ArrowLeft, Camera, Flower2 } from "lucide-react";

const memories = [
  { id: 1, title: "O começo de FLORESCER", description: "Entre estudos, flores e muitas ideias, começou a tomar forma uma coleção sobre tempo, fé e crescimento.", imageUrl: "/florescer-jardim.jpg", date: "17 de outubro de 2026" },
  { id: 2, title: "Detalhes que contam histórias", description: "Texturas, cores e pequenos detalhes do processo criativo que deram vida às obras.", imageUrl: "/florescer-campo.jpg", date: "17 de outubro de 2026" },
  { id: 3, title: "Um encontro para guardar", description: "Este espaço será dedicado às fotografias e aos relatos compartilhados durante a exposição.", imageUrl: null, date: "FLORESCER · 2026" },
];

export default function MemoriasPage() {
  return (
    <main className="site-root feature-page memories-page">
      <header className="feature-header">
        <Link href="/" className="feature-back"><ArrowLeft size={16} /> Voltar à exposição</Link>
        <span className="feature-brand">ÁNTHOS <i>coleção florescer</i></span>
      </header>
      <section className="feature-hero">
        <p className="eyebrow ink"><Camera size={16} /> Depois da exposição</p>
        <h1>O que fica<br /><em>quando florescemos.</em></h1>
        <p>Alguns encontros terminam, mas aquilo que despertam continua crescendo. Este espaço reúne lembranças, registros e pequenos capítulos da exposição FLORESCER.</p>
      </section>
      <section className="memories-content">
        <div className="memories-heading"><span>02 / MEMÓRIAS</span><h2>Um álbum de momentos</h2></div>
        <p className="privacy-note">Prévia visual com conteúdo ilustrativo. Os registros reais poderão ser conectados ao banco de dados futuramente.</p>
        <div className="memories-grid">{memories.map((memory) => <article className="memory-card" key={memory.id}>
          {memory.imageUrl ? <img src={memory.imageUrl} alt={memory.title} loading="lazy" /> : <div className="memory-placeholder"><Flower2 size={32} /><span>FLORESCER · 2026</span></div>}
          <div className="memory-copy"><small>{memory.date}</small><h3>{memory.title}</h3><p>{memory.description}</p></div>
        </article>)}</div>
      </section>
      <footer className="site-footer"><span>ÁNTHOS · FLORESCER</span><span>Lavinya Chaves · 2026</span></footer>
    </main>
  );
}
