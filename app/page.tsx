"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Flower2,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type View = "inicio" | "quadros" | "presenca";

const navItems: Array<{ id: View; label: string }> = [
  { id: "inicio", label: "Início" },
  { id: "quadros", label: "Os quadros" },
  { id: "presenca", label: "Confirmar presença" },
];

function Header({ view, onNavigate }: { view: View; onNavigate: (view: View) => void }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={() => onNavigate("inicio")} aria-label="Ir para o início">
        <span className="brand-mark">A</span>
        <span>
          <strong>ÁNTHOS</strong>
          <small>coleção florescer</small>
        </span>
      </button>

      <nav className="main-nav" aria-label="Navegação principal">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={view === item.id ? "active" : ""}
            aria-current={view === item.id ? "page" : undefined}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function HomeView({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <img src="/florescer-campo.jpg" alt="Campo florido em tons suaves, imagem da coleção Florescer" />
        <div className="hero-wash" />
        <div className="hero-content">
          <p className="eyebrow mb-1">Exposição de TCC · Artes Visuais</p>
          <h1 id="hero-title">Ánthos</h1>
          <p className="eyebrow mt-1">Coleção FLORESCER</p>
          {/* <p className="hero-subtitle">Beleza que nasce da espera.</p> */}
          <div className="hero-actions">
            <Button className="primary-cta" size="lg" onClick={() => onNavigate("presenca")}>
              Confirmar presença <ArrowRight aria-hidden="true" />
            </Button>
            <button className="text-link" onClick={() => onNavigate("quadros")}>
              Conhecer a coleção
            </button>
          </div>
        </div>
        <div className="event-stamp" aria-label="Data da exposição">
          <span>06</span>
          <div>
            <strong>novembro</strong>
            <small>2026</small>
          </div>
        </div>
      </section>

      <section className="manifesto-section">
        <div className="section-kicker">
          <Flower2 aria-hidden="true" />
          <span>Um convite para florescer</span>
        </div>
        <div className="manifesto-grid">
          <h2>Há algo profundamente bonito no florescer.</h2>
          <div className="manifesto-copy">
            <p>
              Não se trata apenas de beleza — mas de resiliência, fé e tempo. Florescer é confiar no
              processo, crescer em silêncio, resistir às tempestades e ainda assim abrir-se à luz.
            </p>
            <p>
              Cada tela foi criada como um lembrete visual de que, mesmo em tempos difíceis, Deus
              continua trabalhando em nós. Toda estação tem propósito, e o florescimento vem no tempo
              certo, do jeito certo.
            </p>
          </div>
        </div>
      </section>

      <section className="verse-section">
        <div className="verse-image">
          <img src="/florescer-jardim.jpg" alt="Jardim florido em tons terrosos, imagem da coleção Florescer" />
        </div>
        <blockquote>
          <span>Salmo 92:12</span>
          “Os justos florescerão como a palmeira, crescerão como o cedro do Líbano.”
          <footer>Lavinya Chaves · Coleção FLORESCER</footer>
        </blockquote>
      </section>
    </>
  );
}

function GalleryView({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <section className="page-shell gallery-page" aria-labelledby="gallery-title">
      <div className="page-intro">
        <p className="eyebrow ink">Coleção FLORESCER · 2026</p>
        <h1 id="gallery-title">Uma antologia de flores.</h1>
        <p>
          Inspirada no grego <em>ánthos</em> (ἄνθος) — flor. Cada obra é uma pausa, um respiro de cor e
          significado na jornada entre os invernos da alma e a primavera que chega.
        </p>
      </div>

      <div className="art-grid">
        <article className="art-card tall">
          <div className="art-image">
            <img src="/florescer-jardim.jpg" alt="Prévia visual da coleção Florescer" />
          </div>
          <div className="art-meta">
            <span>Prévia 01</span>
            <strong>Estudo da coleção</strong>
            <small>Ficha técnica em breve</small>
          </div>
        </article>
        <article className="art-card offset">
          <div className="art-image">
            <img src="/florescer-campo.jpg" alt="Segunda prévia visual da coleção Florescer" />
          </div>
          <div className="art-meta">
            <span>Prévia 02</span>
            <strong>Estudo da coleção</strong>
            <small>Ficha técnica em breve</small>
          </div>
        </article>
      </div>

      <div className="gallery-note">
        <Flower2 aria-hidden="true" />
        <div>
          <strong>As obras completas chegam em breve.</strong>
          <p>Este espaço receberá todas as telas e suas fichas técnicas para a exposição.</p>
        </div>
        <Button variant="outline" onClick={() => onNavigate("presenca")}>
          Quero visitar
        </Button>
      </div>
    </section>
  );
}

function RSVPView() {
  const [attendance, setAttendance] = useState("sim");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="page-shell rsvp-page success-page" aria-live="polite">
        <div className="success-mark"><Check aria-hidden="true" /></div>
        <p className="eyebrow ink">Resposta registrada no protótipo</p>
        <h1>{attendance === "sim" ? "Será uma alegria receber você." : "Obrigada por nos avisar."}</h1>
        <p>
          {attendance === "sim"
            ? "Nos encontramos no dia 17 de outubro de 2026 para celebrar o florescer."
            : "Sua resposta foi registrada. Esperamos compartilhar a coleção com você em outro momento."}
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>Editar resposta</Button>
      </section>
    );
  }

  return (
    <section className="page-shell rsvp-page" aria-labelledby="rsvp-title">
      <div className="rsvp-aside">
        <p className="eyebrow">06 · 11 · 2026</p>
        <h1 id="rsvp-title">Venha florescer conosco.</h1>
        {/* <p>Confirme sua presença para a exposição de TCC da artista Lavinya Chaves.</p> */}
        <div className="event-details">
          <div><CalendarDays aria-hidden="true" /><span><strong>06 de novembro de 2026</strong><small>A partir das 14:00</small></span></div>
          <div><MapPin aria-hidden="true" /><span><strong>Estação Juventude</strong><small>Avenida João César de Oliveira, 174</small></span></div>
        </div>
      </div>

      <form className="rsvp-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <span>RSVP</span>
          <h2>Confirmação de presença</h2>
          <p>Preencha seus dados e conte para nós se poderá estar presente.</p>
        </div>

        <div className="field-group">
          <Label htmlFor="name">Nome completo</Label>
          <div className="input-wrap">
            <UserRound aria-hidden="true" />
            <Input id="name" name="name" autoComplete="name" placeholder="Como podemos chamar você?" required />
          </div>
        </div>

        <div className="field-group">
          <Label htmlFor="phone">Telefone</Label>
          <div className="input-wrap">
            <Phone aria-hidden="true" />
            <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(31) 99999-9999" required />
          </div>
        </div>

        <fieldset className="field-group attendance-field">
          <legend>Você estará presente?</legend>
          <RadioGroup value={attendance} onValueChange={setAttendance} className="attendance-options">
            <Label className={attendance === "sim" ? "attendance-option selected" : "attendance-option"}>
              <RadioGroupItem value="sim" />
              <span><strong>Sim, estarei presente</strong><small>Mal posso esperar!</small></span>
            </Label>
            <Label className={attendance === "nao" ? "attendance-option selected" : "attendance-option"}>
              <RadioGroupItem value="nao" />
              <span><strong>Não poderei comparecer</strong><small>Obrigada pelo convite.</small></span>
            </Label>
          </RadioGroup>
        </fieldset>

        <Button className="submit-button" size="lg" type="submit">
          Enviar confirmação <ArrowRight aria-hidden="true" />
        </Button>
        <small className="prototype-note">Protótipo visual: os dados não são enviados a um servidor.</small>
      </form>
    </section>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("inicio");

  function navigate(nextView: View) {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="site-root">
      <Header view={view} onNavigate={navigate} />
      {view === "inicio" && <HomeView onNavigate={navigate} />}
      {view === "quadros" && <GalleryView onNavigate={navigate} />}
      {view === "presenca" && <RSVPView />}
      <footer className="site-footer">
        <span>ÁNTHOS · FLORESCER</span>
        <span>Lavinya Chaves · 2026</span>
      </footer>
    </main>
  );
}
