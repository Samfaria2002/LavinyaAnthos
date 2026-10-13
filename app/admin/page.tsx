"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Eye, EyeOff, Flower2, Plus, RefreshCw, Trash2 } from "lucide-react";

type GardenMessage = { id: number; message: string; flower: string; status: "pending" | "approved" | "rejected"; createdAt: string };
type Memory = { id: number; title: string; description: string; imageUrl: string; date: string; published: boolean };
type Tab = "garden" | "memories";

const initialMessages: GardenMessage[] = [
  { id: 1, message: "Que a gente nunca perca a coragem de florescer de novo.", flower: "Girassol", status: "pending", createdAt: "17/10/2026, 14:10" },
  { id: 2, message: "Que a beleza das pequenas coisas continue nos lembrando do cuidado de Deus.", flower: "Margarida", status: "approved", createdAt: "17/10/2026, 14:22" },
  { id: 3, message: "Toda estação tem seu tempo.", flower: "Lavanda", status: "rejected", createdAt: "17/10/2026, 14:35" },
];

const initialMemories: Memory[] = [
  { id: 1, title: "O começo de FLORESCER", description: "Um registro do processo criativo.", imageUrl: "/florescer-jardim.jpg", date: "17/10/2026", published: true },
  { id: 2, title: "Detalhes que contam histórias", description: "Texturas, cores e pequenos detalhes da coleção.", imageUrl: "/florescer-campo.jpg", date: "17/10/2026", published: false },
];

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("garden");
  const [messages, setMessages] = useState<GardenMessage[]>(initialMessages);
  const [memories, setMemories] = useState<Memory[]>(initialMemories);
  const [notice, setNotice] = useState("Modo de demonstração: alterações não são salvas no servidor.");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState("");

  function updateMessage(id: number, status: GardenMessage["status"]) {
    setMessages((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    setNotice("Status atualizado apenas nesta demonstração.");
  }

  function createMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    if (!cleanTitle || !cleanDescription) return;
    setMemories((current) => [{ id: Date.now(), title: cleanTitle, description: cleanDescription, imageUrl: imageUrl.trim(), date: date ? new Date(date + "T12:00:00").toLocaleDateString("pt-BR") : "Sem data", published: false }, ...current]);
    setTitle("");
    setDescription("");
    setImageUrl("");
    setDate("");
    setNotice("Memória criada como rascunho nesta demonstração.");
    setTab("memories");
  }

  function toggleMemory(id: number) {
    setMemories((current) => current.map((item) => item.id === id ? { ...item, published: !item.published } : item));
    setNotice("Visibilidade alterada apenas nesta demonstração.");
  }

  function deleteMemory(id: number) {
    setMemories((current) => current.filter((item) => item.id !== id));
    setNotice("Memória removida apenas desta demonstração.");
  }

  function resetDemo() {
    setMessages(initialMessages);
    setMemories(initialMemories);
    setNotice("Dados de exemplo restaurados.");
  }

  return (
    <main className="site-root feature-page admin-page">
      <header className="feature-header">
        <Link href="/" className="feature-back"><ArrowLeft size={16} /> Ver exposição</Link>
        <span className="feature-brand">ÁNTHOS <i>painel de demonstração</i></span>
      </header>
      <section className="admin-dashboard">
        <p className="eyebrow ink">BASTIDORES DA EXPOSIÇÃO</p>
        <h1>O jardim também<br /><em>precisa de cuidado.</em></h1>
        <p className="admin-lead">Prévia da área administrativa para testar a moderação das palavras e a organização das memórias antes de conectar o backend.</p>
        <div className="admin-stats">
          <div><strong>{messages.length}</strong><span>Palavras recebidas</span></div>
          <div><strong>{messages.filter((item) => item.status === "pending").length}</strong><span>Aguardando aprovação</span></div>
          <div><strong>{memories.filter((item) => item.published).length}</strong><span>Memórias publicadas</span></div>
        </div>
        <div className="admin-tabs">
          <button className={tab === "garden" ? "selected" : ""} onClick={() => setTab("garden")}>Jardim de palavras</button>
          <button className={tab === "memories" ? "selected" : ""} onClick={() => setTab("memories")}>Memórias</button>
          <button className="admin-refresh" onClick={resetDemo} aria-label="Restaurar dados de exemplo" title="Restaurar dados de exemplo"><RefreshCw size={16} /></button>
        </div>
        {notice && <p className="feature-status" role="status">{notice}</p>}
        {tab === "garden" ? (
          <section className="admin-section">
            <div className="admin-section-heading"><h2>Mensagens recebidas</h2><span>{messages.length} registros de exemplo</span></div>
            <div className="admin-list">{messages.map((item) => (
              <article className="admin-list-item" key={item.id}>
                <div className="admin-list-copy">
                  <span className={"status-pill status-" + item.status}>{item.status === "pending" ? "Pendente" : item.status === "approved" ? "Aprovada" : "Rejeitada"}</span>
                  <p>“{item.message}”</p><small>{item.flower} · {item.createdAt}</small>
                </div>
                <div className="admin-actions">
                  {item.status !== "approved" && <button onClick={() => updateMessage(item.id, "approved")}><Check size={17} /> Aprovar</button>}
                  {item.status !== "rejected" && <button onClick={() => updateMessage(item.id, "rejected")}><EyeOff size={17} /> Rejeitar</button>}
                  {item.status !== "pending" && <button onClick={() => updateMessage(item.id, "pending")}>Pendente</button>}
                </div>
              </article>
            ))}</div>
          </section>
        ) : (
          <section className="admin-section">
            <div className="admin-section-heading"><h2>Adicionar memória</h2><span>Novos registros começam como rascunho</span></div>
            <form className="feature-form admin-memory-form" onSubmit={createMemory}>
              <label htmlFor="memory-title">Título</label><input id="memory-title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} required />
              <label htmlFor="memory-description">Descrição</label><textarea id="memory-description" value={description} onChange={(event) => setDescription(event.target.value)} maxLength={3000} required />
              <label htmlFor="memory-image">Caminho ou URL da imagem (opcional)</label><input id="memory-image" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="/florescer-jardim.jpg" />
              <label htmlFor="memory-date">Data do momento (opcional)</label><input id="memory-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              <button className="feature-submit" type="submit"><Plus size={16} /> Criar memória de demonstração</button>
            </form>
            <div className="admin-section-heading existing-memories-heading"><h2>Memórias cadastradas</h2><span>{memories.length} registros de exemplo</span></div>
            {memories.length === 0 ? <p className="empty-state">Nenhuma memória. Use o formulário acima para criar uma.</p> : (
              <div className="admin-list">{memories.map((item) => (
                <article className="admin-list-item" key={item.id}>
                  <div className="admin-list-copy">
                    <span className={"status-pill status-" + (item.published ? "approved" : "pending")}>{item.published ? "Publicada" : "Rascunho"}</span>
                    <p><strong>{item.title}</strong></p><small>{item.date} · {item.description}</small>
                  </div>
                  <div className="admin-actions">
                    <button onClick={() => toggleMemory(item.id)}>{item.published ? <><EyeOff size={16} /> Ocultar</> : <><Eye size={16} /> Publicar</>}</button>
                    <button onClick={() => deleteMemory(item.id)}><Trash2 size={16} /> Excluir</button>
                  </div>
                </article>
              ))}</div>
            )}
          </section>
        )}
      </section>
      <footer className="site-footer"><span>ÁNTHOS · FLORESCER</span><span>Dados de demonstração · não persistentes</span></footer>
    </main>
  );
}
