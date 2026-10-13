"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, Flower2 } from "lucide-react";

type Memory = { id: number; title: string; description: string; imageUrl: string | null; eventDate: string | null };

export default function MemoriasPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/memories", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Não foi possível carregar as memórias.");
        setMemories(data.memories ?? []);
      })
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Não foi possível carregar as memórias."))
      .finally(() => setLoading(false));
  }, []);

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
        {loading ? <p className="empty-state">Reunindo as memórias...</p> : error ? <p className="empty-state" role="status">{error}</p> : memories.length === 0 ? <div className="memories-empty"><Flower2 size={28} /><h3>As memórias estão criando raízes.</h3><p>Em breve, este espaço poderá receber fotografias, relatos e momentos especiais da exposição.</p></div> :
          <div className="memories-grid">{memories.map((memory) => <article className="memory-card" key={memory.id}>
            {memory.imageUrl ? <img src={memory.imageUrl} alt={memory.title} loading="lazy" /> : <div className="memory-placeholder"><Flower2 size={32} /><span>FLORESCER · 2026</span></div>}
            <div className="memory-copy">{memory.eventDate && <small>{new Date(memory.eventDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</small>}<h3>{memory.title}</h3><p>{memory.description}</p></div>
          </article>)}</div>}
      </section>
      <footer className="site-footer"><span>ÁNTHOS · FLORESCER</span><span>Lavinya Chaves · 2026</span></footer>
    </main>
  );
}
