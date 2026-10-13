"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flower2, Send } from "lucide-react";

type GardenMessage = { id: number; message: string; flower: string; createdAt: string };
const flowers = [
  { id: "margarida", label: "Margarida", symbol: "✿" },
  { id: "girassol", label: "Girassol", symbol: "✺" },
  { id: "rosa", label: "Rosa", symbol: "❀" },
  { id: "tulipa", label: "Tulipa", symbol: "❁" },
  { id: "lavanda", label: "Lavanda", symbol: "❋" },
  { id: "calendula", label: "Calêndula", symbol: "✼" },
];

export default function JardimDePalavrasPage() {
  const [message, setMessage] = useState("");
  const [flower, setFlower] = useState("margarida");
  const [messages, setMessages] = useState<GardenMessage[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  async function loadMessages() {
    try {
      const response = await fetch("/api/garden", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível carregar o jardim.");
      setMessages(data.messages ?? []);
      setStatus("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Não foi possível carregar o jardim.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadMessages(); }, []);

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/garden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, flower }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível enviar sua palavra.");
      setMessage("");
      setStatus(data.message || "Sua palavra foi recebida.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Não foi possível enviar sua palavra.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="site-root feature-page">
      <header className="feature-header">
        <Link href="/" className="feature-back"><ArrowLeft size={16} /> Voltar à exposição</Link>
        <span className="feature-brand">ÁNTHOS <i>coleção florescer</i></span>
      </header>
      <section className="feature-hero">
        <p className="eyebrow ink"><Flower2 size={16} /> Um jardim feito de palavras</p>
        <h1>O que floresce<br /><em>em você?</em></h1>
        <p>Deixe uma palavra, um desejo ou um pequeno pensamento que gostaria de ver florescer. Cada mensagem é uma semente neste jardim coletivo.</p>
      </section>
      <section className="garden-layout">
        <form className="feature-form" onSubmit={submitMessage}>
          <label htmlFor="garden-message">Sua palavra</label>
          <textarea id="garden-message" value={message} onChange={(event) => setMessage(event.target.value)} minLength={3} maxLength={280} placeholder="Que algo bonito floresça..." required />
          <div className="character-count">{message.length}/280</div>
          <span className="field-label">Escolha uma flor para acompanhar sua mensagem</span>
          <div className="flower-options">
            {flowers.map((item) => <button type="button" key={item.id} className={flower === item.id ? "flower-option selected" : "flower-option"} onClick={() => setFlower(item.id)} aria-pressed={flower === item.id}><span>{item.symbol}</span>{item.label}</button>)}
          </div>
          <button className="feature-submit" type="submit" disabled={sending}><Send size={16} /> {sending ? "Enviando..." : "Plantar minha palavra"}</button>
          <p className="privacy-note">As mensagens passam por aprovação antes de aparecer publicamente.</p>
          {status && <p className="feature-status" role="status">{status}</p>}
        </form>
        <div className="garden-wall">
          <div className="garden-wall-heading"><span>01 / COMUNIDADE</span><h2>Palavras que ficam</h2><p>Mensagens deixadas por quem passou por aqui.</p></div>
          {loading ? <p className="empty-state">Preparando o jardim...</p> : messages.length === 0 ? <p className="empty-state">As primeiras palavras aprovadas aparecerão aqui. Que tal plantar a sua?</p> :
            <div className="garden-message-grid">{messages.map((item) => {
              const selectedFlower = flowers.find((entry) => entry.id === item.flower) ?? flowers[0];
              return <article className="garden-note" key={item.id}><span className="garden-note-flower">{selectedFlower.symbol}</span><p>“{item.message}”</p><small>{selectedFlower.label}</small></article>;
            })}</div>}
        </div>
      </section>
      <footer className="site-footer"><span>ÁNTHOS · FLORESCER</span><span>Uma palavra também pode ser semente.</span></footer>
    </main>
  );
}
