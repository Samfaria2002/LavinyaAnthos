"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flower2, Send } from "lucide-react";

type GardenMessage = { id: number; message: string; flower: string };
const flowers = [
  { id: "margarida", label: "Margarida", symbol: "✿" },
  { id: "girassol", label: "Girassol", symbol: "✺" },
  { id: "rosa", label: "Rosa", symbol: "❀" },
  { id: "tulipa", label: "Tulipa", symbol: "❁" },
  { id: "lavanda", label: "Lavanda", symbol: "❋" },
  { id: "calendula", label: "Calêndula", symbol: "✼" },
];

const sampleMessages: GardenMessage[] = [
  { id: 1, message: "Que a gente nunca perca a coragem de florescer de novo.", flower: "girassol" },
  { id: 2, message: "Que a beleza das pequenas coisas continue nos lembrando do cuidado de Deus.", flower: "margarida" },
  { id: 3, message: "Toda estação tem seu tempo. Que a esperança sempre encontre espaço.", flower: "lavanda" },
];

export default function JardimDePalavrasPage() {
  const [message, setMessage] = useState("");
  const [flower, setFlower] = useState("margarida");
  const [messages, setMessages] = useState<GardenMessage[]>(sampleMessages);
  const [status, setStatus] = useState("");

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = message.trim();
    if (trimmed.length < 3) {
      setStatus("Escreva pelo menos 3 caracteres para plantar sua palavra.");
      return;
    }
    setMessages((current) => [{ id: Date.now(), message: trimmed, flower }, ...current]);
    setMessage("");
    setStatus("Sua palavra foi adicionada à prévia visual. Ela não foi enviada a um servidor.");
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
          <button className="feature-submit" type="submit"><Send size={16} /> Plantar minha palavra</button>
          <p className="privacy-note">Modo de demonstração: as mensagens aparecem apenas enquanto esta página estiver aberta.</p>
          {status && <p className="feature-status" role="status">{status}</p>}
        </form>
        <div className="garden-wall">
          <div className="garden-wall-heading"><span>01 / COMUNIDADE</span><h2>Palavras que ficam</h2><p>Mensagens que inspiram quem passa por aqui.</p></div>
          <div className="garden-message-grid">{messages.map((item) => {
            const selectedFlower = flowers.find((entry) => entry.id === item.flower) ?? flowers[0];
            return <article className="garden-note" key={item.id}><span className="garden-note-flower">{selectedFlower.symbol}</span><p>“{item.message}”</p><small>{selectedFlower.label}</small></article>;
          })}</div>
        </div>
      </section>
      <footer className="site-footer"><span>ÁNTHOS · FLORESCER</span><span>Uma palavra também pode ser semente.</span></footer>
    </main>
  );
}
