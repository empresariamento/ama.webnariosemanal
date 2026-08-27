import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  TrendingUp,
  Building2,
  Users,
  History,
  Rocket,
  BrainCircuit,
  Database,
  Target,
  Layers,
  Check,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { LeadDialog } from "@/components/LeadDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webnário Result-First | Encontro gratuito com Márcio André" },
      {
        name: "description",
        content:
          "Encontro semanal gratuito, toda quarta-feira às 12h: a abordagem Result-First para fazer a IA que você já usa gerar resultado de verdade, com Márcio André.",
      },
      { property: "og:title", content: "Webnário Result-First com Márcio André" },
      {
        property: "og:description",
        content:
          "Você não precisa aprender mais IAs. Precisa fazer as que você já usa dar mais resultado. Participe do encontro gratuito.",
      },
    ],
  }),
  component: Index,
});

const steps = [
  { n: "01", text: "Entre no grupo exclusivo clicando no botão abaixo" },
  { n: "02", text: "Nesta quarta, acesse o link do encontro enviado lá" },
];

const credentials = [
  { icon: TrendingUp, text: "+R$ 45 milhões em vendas online no e-commerce" },
  { icon: Building2, text: "+50 empresas e operações atendidas" },
  { icon: Users, text: "+500 profissionais e alunos treinados" },
  { icon: History, text: "+20 anos de trajetória ligada à tecnologia" },
  { icon: Rocket, text: "+9 anos de atuação no mercado digital" },
  { icon: Database, text: "Experiência em operações com milhares de SKUs e centenas de leads processados por dia" },
  { icon: BrainCircuit, text: "Atuação prática em e-commerce, vendas, marketing, automação e Inteligência Artificial" },
];

const heroStats = [
  { n: "R$45M+", label: "em vendas gerado" },
  { n: "50+", label: "empresas atendidas" },
  { n: "20+", label: "anos em tecnologia" },
];

const valueCards = [
  {
    icon: Target,
    text: "O Márcio vai ensinar como encontrar oportunidades de IA que façam diferença mais rápido e com menos esforço.",
  },
  {
    icon: Layers,
    text: "Fazer mais com a mesma estrutura, aumentando sua capacidade sem depender de contratar mais pessoas.",
  },
  {
    icon: Rocket,
    text: "E transformar IA em resultado de verdade: mais velocidade, menos esforço e mais produtividade.",
  },
];

function getNextWednesdayNoon() {
  const now = new Date();
  const result = new Date(now);
  const daysUntilWednesday = (3 - now.getDay() + 7) % 7;
  result.setDate(now.getDate() + daysUntilWednesday);
  result.setHours(12, 0, 0, 0);
  if (result.getTime() <= now.getTime()) {
    result.setDate(result.getDate() + 7);
  }
  return result;
}

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      done: diff === 0,
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Index() {
  const [open, setOpen] = useState(false);
  const [statIdx, setStatIdx] = useState(0);
  const [statVisible, setStatVisible] = useState(true);
  const [eventDate] = useState(getNextWednesdayNoon);
  const countdown = useCountdown(eventDate);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatVisible(false);
      setTimeout(() => {
        setStatIdx(i => (i + 1) % heroStats.length);
        setStatVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const WhatsappIcon = () => (
    <svg className="ml-2 size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.862L.057 23.427a.75.75 0 0 0 .916.916l5.565-1.475A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.516-5.21-1.415l-.374-.22-3.304.875.875-3.304-.22-.374A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );

  const Cta = ({ className = "", label = "Quero ter resultado com IA", whatsapp = false }: { className?: string; label?: string; whatsapp?: boolean }) => (
    <Button
      onClick={() => setOpen(true)}
      className={`group relative overflow-hidden h-auto rounded-full bg-gold hover:bg-gold w-full px-5 py-3.5 text-sm sm:w-auto sm:px-8 tracking-[0.18em] text-white uppercase [animation:glow-pulse_3s_ease-in-out_infinite] transition-colors hover:opacity-90 after:absolute after:inset-y-0 after:w-1/3 after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] after:[animation:shimmer_2.5s_ease-in-out_infinite] ${className}`}
    >
      {label}
      {whatsapp ? <WhatsappIcon /> : <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
    </Button>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LeadDialog open={open} onOpenChange={setOpen} />

      {/* BARRA DE COUNTDOWN */}
      {!countdown.done && (
        <div className="w-full bg-brown px-4 py-2.5 text-center">
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.7rem] tracking-[0.15em] uppercase text-champagne">
            <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O encontro começa em</span>
            <span className="tabular-nums text-gold font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {String(countdown.days).padStart(2, "0")} dias{" · "}
              {String(countdown.hours).padStart(2, "0")} horas{" · "}
              {String(countdown.minutes).padStart(2, "0")} min{" · "}
              {String(countdown.seconds).padStart(2, "0")} seg
            </span>
          </p>
        </div>
      )}

      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-2xl px-5 py-10 md:py-24 lg:px-10">
          <div className="max-w-2xl">
            <p className="mx-auto max-w-[19rem] text-center tracking-[0.2em] uppercase text-gold [text-wrap:balance] sm:max-w-none" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(0.65rem, 2.6vw, 0.7rem)" }}>
              Encontro para usar IA com foco em resultado, não em novidade
            </p>
            <div className="mt-4 text-center">
              <h1 className="uppercase leading-[1.15]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span className="block [text-wrap:balance]" style={{ fontWeight: 500, fontSize: "clamp(1.4rem, 6vw, 2.6rem)", color: "var(--brown)" }}>Você já tem IA suficiente.</span>
                <span className="mt-3 block [text-wrap:balance]" style={{ fontWeight: 700, fontSize: "clamp(1.7rem, 7.2vw, 3.3rem)", color: "var(--gold)" }}>Agora falta fazer ela te entregar resultado de verdade.</span>
              </h1>
            </div>
            <p className="mt-10 max-w-xl text-center leading-relaxed text-foreground/80 [text-wrap:pretty]" style={{ fontSize: "clamp(0.875rem, 3.2vw, 1rem)" }}>
              Nesta <strong className="text-brown font-semibold">quarta-feira, às 12 horas</strong>, Márcio André vai apresentar a abordagem Resultado Primeiro (Result-First): a forma mais eficiente de aplicar IA, começando pelo ganho que você quer gerar, e não pela ferramenta que apareceu no seu feed.
            </p>
            <div className="mt-12 flex flex-col items-center">
              <Cta label="Quero ter resultado com IA" />
            </div>
            <p className="mt-12 text-center font-display leading-[1.35] text-brown/70 [text-wrap:balance]" style={{ fontWeight: 500, fontSize: "clamp(1.05rem, 4.6vw, 1.4rem)" }}>
              Você não precisa aprender mais IAs. Precisa fazer as IAs que você já usa dar mais resultado.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3">
              <div
                className="flex flex-col items-center transition-opacity duration-300 ease-in-out"
                style={{ opacity: statVisible ? 1 : 0 }}
              >
                <span className="leading-none text-gold" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2.6rem, 12vw, 4.5rem)" }}>
                  {heroStats[statIdx]!.n}
                </span>
                <div className="mt-3 flex items-center gap-3">
                  <div className="hairline-gold h-px w-10" />
                  <span className="text-[0.7rem] tracking-[0.2em] text-brown uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {heroStats[statIdx]!.label}
                  </span>
                  <div className="hairline-gold h-px w-10" />
                </div>
              </div>
              <div className="flex gap-1.5">
                {heroStats.map((_, i) => (
                  <span
                    key={i}
                    className="block size-1.5 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: i === statIdx ? "var(--gold)" : "color-mix(in oklab, var(--gold) 30%, transparent)" }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-14">
            <div className="absolute -inset-4 rounded-[2rem] bg-champagne/50 blur-2xl" aria-hidden />
            <div className="relative w-full rounded-[1.75rem] border border-border bg-card p-6 sm:p-8">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-destructive/60" />
                <span className="size-2.5 rounded-full bg-gold/60" />
                <span className="size-2.5 rounded-full bg-brown/40" />
                <span className="ml-auto text-[0.65rem] tracking-[0.2em] uppercase text-gold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Result-First
                </span>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-muted/60 px-4 py-3">
                  <X className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  <p className="text-sm text-muted-foreground [text-wrap:pretty]">Testar ferramenta nova sem direção clara</p>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-champagne/60 px-4 py-3">
                  <Check className="size-4 shrink-0 text-gold" aria-hidden />
                  <p className="text-sm font-medium text-brown [text-wrap:pretty]">Começar pelo resultado que você quer gerar</p>
                </div>
              </div>
            </div>
            <div className="relative mx-auto -mt-10 w-[85%] rounded-2xl border border-border bg-card/90 p-4 lg:p-6 backdrop-blur text-center">
              <p className="flex items-center justify-center gap-2 text-gold uppercase tracking-[0.15em]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(0.8rem, 3vw, 1rem)" }}>
                Sessão Ao Vivo
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                </span>
              </p>
              <p className="mt-1 leading-relaxed text-muted-foreground [text-wrap:pretty]" style={{ fontSize: "clamp(0.85rem, 3.2vw, 1rem)" }}>
                Conduzida por Márcio André, direto para a sua realidade.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* COMO FUNCIONA */}
      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-6 py-5 lg:px-10">
          <p className="text-center text-sm leading-relaxed text-foreground/80 [text-wrap:pretty]">
            Eu sei, você usa IA mas ainda está muito abaixo do que ela pode <em className="not-italic font-semibold text-brown">(e deveria)</em> gerar de resultado pra você, acertei? Então você está no lugar certo.
          </p>
          <div className="mt-6 space-y-0 divide-y divide-gold/20">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className="flex items-center gap-4 py-3"
                style={{ animation: `fade-in-up 0.5s ease both`, animationDelay: `${i * 180}ms` }}
              >
                <span className="shrink-0 text-[1.6rem] leading-none text-gold" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{step.n}</span>
                <p className="text-sm leading-snug text-foreground/80 [text-wrap:pretty]">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-4 flex flex-col items-center">
            <p className="text-center font-display leading-snug text-brown [text-wrap:pretty]" style={{ fontSize: "clamp(1.1rem, 4.4vw, 1.5rem)" }}>
              <span className="text-gold">E pronto!</span> Você vai aprender a lógica Result-First e parar de perder tempo com o que não gera resultado.
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <Cta label="Entrar no grupo exclusivo" whatsapp />
          </div>
        </div>
      </section>

      {/* SEÇÃO 1 */}
      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-6 pt-16 pb-12 lg:px-10">
          <h2 className="text-center leading-tight text-brown [text-wrap:balance]" style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 6.6vw, 2.5rem)" }}>
            Result-First: uma forma mais eficiente de usar IA
          </h2>
          <p className="mt-3 text-center text-muted-foreground [text-wrap:balance]" style={{ fontSize: "clamp(0.85rem, 3.2vw, 1rem)" }}>
            Começando pelo resultado que você quer gerar.
          </p>
          <div className="mt-10 space-y-4">
            {valueCards.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-4 rounded-2xl border border-border bg-card px-5 py-4">
                <Icon className="mt-0.5 shrink-0 size-5 text-gold" aria-hidden />
                <p className="text-sm leading-relaxed text-foreground/80 [text-wrap:pretty] sm:text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-4 px-6 pt-6 pb-10 lg:gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <figure className="relative">
            <div className="flex aspect-4/5 w-full items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-brown to-wine">
              <span className="text-[5rem] tracking-tight text-champagne" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                MA
              </span>
            </div>
          </figure>
          <div>
            <p className="text-center tracking-[0.35em] text-brown/70 uppercase" style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 300, fontSize: "clamp(0.95rem, 4vw, 1.25rem)" }}>Quem conduz</p>
            <h2 className="mt-0 text-center text-[2.2rem] text-gold sm:text-5xl" style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800 }}>
              Márcio André
            </h2>
            <ul className="mt-8 space-y-3">
              {credentials.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 border-b border-gold/20 pb-3 last:border-0">
                  <span className="flex shrink-0 items-center justify-center size-8 rounded-full bg-champagne/60">
                    <Icon className="size-4 text-gold" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-snug text-foreground/85 [text-wrap:pretty]">{text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Cta label="Quero aplicar o Result-First" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream">
        <div className="mx-auto max-w-2xl px-6 pt-8 pb-14 lg:px-10">
          <p className="text-center font-display text-[1.4rem] text-brown/70">E antes que nos pergunte:</p>
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="q1" className="border-gold/20">
              <AccordionTrigger className="text-base text-foreground/80 hover:no-underline hover:text-brown [text-wrap:balance]">
                É realmente gratuito?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed [text-wrap:pretty]">
                Sim, 100% gratuito. Não há nenhuma cobrança para participar do encontro. Você só precisa reservar sua vaga e aparecer nesta quarta-feira, às 12h.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="border-gold/20">
              <AccordionTrigger className="text-base text-foreground/80 hover:no-underline hover:text-brown [text-wrap:balance]">
                Preciso ter alguma ferramenta de IA específica?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed [text-wrap:pretty]">
                Não. A lógica Result-First funciona com as ferramentas que você já usa hoje. O foco é em onde e como aplicar, não em qual IA escolher.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="border-gold/20">
              <AccordionTrigger className="text-base text-foreground/80 hover:no-underline hover:text-brown [text-wrap:balance]">
                O que acontece depois do encontro?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed [text-wrap:pretty]">
                Você sai com um plano claro de por onde aplicar IA primeiro na sua operação. Se fizer sentido pra você, ao final apresentamos as formas de continuar com o Márcio.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center">
        <p className="text-xs tracking-wide text-muted-foreground">
          Márcio André &middot; IA aplicada a resultado
        </p>
      </footer>
    </div>
  );
}
