"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Eye, EyeOff, Flower2, LogOut, Plus, RefreshCw, Trash2 } from "lucide-react";

type GardenMessage = { id: number; message: string; flower: string; status: string; createdAt: string };
type Memory = { id: number; title: string; description: string; imageUrl: string | null; eventDate: string | null; published: boolean; createdAt: string };
type Tab = "garden" | "memories";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("garden");
  const [messages, setMessages] = useState<GardenMessage[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [eventDate, setEventDate] = useState("");

  const loadData = useCallback(async () => {
    const [gardenResponse, memoriesResponse] = await Promise.all([
      fetch("/api/admin/garden", { cache: "no-store" }),
      fetch("/api/admin/memories", { cache: "no-store" }),
    ]);
    if (gardenResponse.status === 401 || memoriesResponse.status === 401) {
      setAuthenticated(false);
      return;
    }
    const gardenData = await gardenResponse.json();
    const memoryData = await memoriesResponse.json();
    if (!gardenResponse.ok) throw new Error(gardenData.error || "Falha ao carregar mensagens.");
    if (!memoriesResponse.ok) throw new Error(memoryData.error || "Falha ao carregar memórias.");
    setMessages(gardenData.messages ?? []);
    setMemories(memoryData.memories ?? []);
    setAuthenticated(true);
  }, []);

  useEffect(() => { void loadData().catch((error: unknown) => setNotice(error instanceof Error ? error.message : "Falha ao carregar painel.")); }, [loadData]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível entrar.");
      setAuthenticated(true);
      setPassword("");
      await loadData();
      setNotice("Sessão iniciada.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível entrar.");
    } finally { setBusy(false); }
  }

  async function updateMessage(id: number, status: string) {
    const response = await fetch("/api/admin/garden", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Não foi possível atualizar a mensagem.");
    await loadData();
    setNotice("Mensagem atualizada.");
  }

  async function createMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/memories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, description, imageUrl, eventDate: eventDate || null, published: false }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível salvar a memória.");
      setTitle(""); setDescription(""); setImageUrl(""); setEventDate("");
      await loadData();
      setNotice("Memória salva como rascunho. Publique quando estiver pronta.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível salvar a memória.");
    } finally { setBusy(false); }
  }

  async function updateMemory(id: number, published: boolean) {
    const response = await fetch("/api/admin/memories", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, published }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Não foi possível atualizar a memória.");
    await loadData();
    setNotice(published ? "Memória publicada." : "Memória retirada da área pública.");
  }

  async function deleteMemory(id: number) {
    if (!window.confirm("Tem certeza de que deseja excluir esta memória?")) return;
    const response = await fetch("/api/admin/memories", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Não foi possível excluir a memória.");
    await loadData();
    setNotice("Memória excluída.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setNotice("Você saiu da área administrativa.");
  }

  async function runAction(action: () => Promise<void>) {
    setNotice("");
    try { await action(); } catch (error) { setNotice(error instanceof Error ? error.message : "A operação não foi concluída."); }
  }

  if (!authenticated) {
    return <main className="site-root feature-page admin-page"><header className="feature-header"><Link href="/" className="feature-back"><ArrowLeft size={16} /> Voltar à exposição</Link><span className="feature-brand">ÁNTHOS <i>administração</i></span></header>
      <section className="admin-login-wrap"><div className="admin-login-mark"><Flower2 size={28} /></div><p className="eyebrow ink">ÁREA RESTRITA</p><h1>Bem-vinda,<br /><em>Lavinya.</em></h1><p>Entre para moderar as palavras do jardim e cuidar das memórias da exposição.</p>
        <form className="feature-form" onSubmit={login}><label htmlFor="admin-password">Senha administrativa</label><input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /><button className="feature-submit" type="submit" disabled={busy}>{busy ? "Entrando..." : "Entrar no painel"}</button></form>
        {notice && <p className="feature-status" role="status">{notice}</p>}<small className="privacy-note">Esta área é privada. A senha deve ser configurada nas variáveis de ambiente do servidor.</small>
      </section>
    </main>;
  }

  return <main className="site-root feature-page admin-page"><header className="feature-header"><Link href="/" className="feature-back"><ArrowLeft size={16} /> Ver exposição</Link><span className="feature-brand">ÁNTHOS <i>painel administrativo</i></span><button className="admin-logout" onClick={() => void logout()}><LogOut size={15} /> Sair</button></header>
    <section className="admin-dashboard"><p className="eyebrow ink">BASTIDORES DA EXPOSIÇÃO</p><h1>O jardim também<br /><em>precisa de cuidado.</em></h1><p className="admin-lead">Modere mensagens, organize os registros e escolha o que será compartilhado com os visitantes.</p>
      <div className="admin-stats"><div><strong>{messages.length}</strong><span>Palavras recebidas</span></div><div><strong>{messages.filter((item) => item.status === "pending").length}</strong><span>Aguardando aprovação</span></div><div><strong>{memories.filter((item) => item.published).length}</strong><span>Memórias publicadas</span></div></div>
      <div className="admin-tabs"><button className={tab === "garden" ? "selected" : ""} onClick={() => setTab("garden")}>Jardim de palavras</button><button className={tab === "memories" ? "selected" : ""} onClick={() => setTab("memories")}>Memórias</button><button className="admin-refresh" onClick={() => void runAction(loadData)} aria-label="Atualizar dados"><RefreshCw size={16} /></button></div>
      {notice && <p className="feature-status" role="status">{notice}</p>}
      {tab === "garden" ? <section className="admin-section"><div className="admin-section-heading"><h2>Mensagens recebidas</h2><span>{messages.length} registros</span></div>{messages.length === 0 ? <p className="empty-state">Ainda não há mensagens.</p> : <div className="admin-list">{messages.map((item) => <article className="admin-list-item" key={item.id}><div className="admin-list-copy"><span className={`status-pill status-${item.status}`}>{item.status === "pending" ? "Pendente" : item.status === "approved" ? "Aprovada" : "Rejeitada"}</span><p>“{item.message}”</p><small>{item.flower} · {new Date(item.createdAt).toLocaleString("pt-BR")}</small></div><div className="admin-actions">{item.status !== "approved" && <button onClick={() => void runAction(() => updateMessage(item.id, "approved"))} aria-label="Aprovar mensagem"><Check size={17} /> Aprovar</button>}{item.status !== "rejected" && <button onClick={() => void runAction(() => updateMessage(item.id, "rejected"))} aria-label="Rejeitar mensagem"><EyeOff size={17} /> Rejeitar</button>}{item.status !== "pending" && <button onClick={() => void runAction(() => updateMessage(item.id, "pending"))}>Pendente</button>}</div></article>)}</div>}</section> :
        <section className="admin-section"><div className="admin-section-heading"><h2>Adicionar memória</h2><span>Novos registros começam como rascunho</span></div><form className="feature-form admin-memory-form" onSubmit={createMemory}><label htmlFor="memory-title">Título</label><input id="memory-title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} required /><label htmlFor="memory-description">Descrição</label><textarea id="memory-description" value={description} onChange={(event) => setDescription(event.target.value)} maxLength={3000} required /><label htmlFor="memory-image">URL da imagem (opcional)</label><input id="memory-image" type="url" placeholder="https://..." value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} /><label htmlFor="memory-date">Data do momento (opcional)</label><input id="memory-date" type="date" value={eventDate} onChange={(event) => setEventDate(event.target.value)} /><button className="feature-submit" type="submit" disabled={busy}><Plus size={16} /> {busy ? "Salvando..." : "Salvar memória"}</button></form>
          <div className="admin-section-heading existing-memories-heading"><h2>Memórias cadastradas</h2><span>{memories.length} registros</span></div>{memories.length === 0 ? <p className="empty-state">Nenhuma memória cadastrada.</p> : <div className="admin-list">{memories.map((item) => <article className="admin-list-item" key={item.id}><div className="admin-list-copy"><span className={`status-pill status-${item.published ? "approved" : "pending"}`}>{item.published ? "Publicada" : "Rascunho"}</span><p><strong>{item.title}</strong></p><small>{item.description}</small></div><div className="admin-actions"><button onClick={() => void runAction(() => updateMemory(item.id, !item.published))}>{item.published ? <><EyeOff size={16} /> Ocultar</> : <><Eye size={16} /> Publicar</>}</button><button onClick={() => void runAction(() => deleteMemory(item.id))}><Trash2 size={16} /> Excluir</button></div></article>)}</div>}
        </section>}
    </section>
    <footer className="site-footer"><span>ÁNTHOS · FLORESCER</span><span>Painel privado</span></footer>
  </main>;
}
