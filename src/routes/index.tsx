import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, Globe2, GraduationCap, HeartHandshake, Sparkles, Stethoscope, HeartPulse, ClipboardList } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { LeadDialog } from "@/components/LeadDialog";
import heroComposition from "@/assets/hero-composition.jpg";
import portraitAmanda from "@/assets/portrait-amanda.png";
import diagnosticoImage from "@/assets/diagnostico-image.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diagnóstico Íntimo | Encontro gratuito com Dra. Amanda Sandei" },
      {
        name: "description",
        content:
          "Encontro fechado de 1 hora, nesta segunda às 14h: entenda sua dor na relação e receba seu Diagnóstico Íntimo com a Dra. Amanda Sandei.",
      },
      { property: "og:title", content: "Diagnóstico Íntimo com a Dra. Amanda Sandei" },
      {
        property: "og:description",
        content:
          "Existe um caminho para viver sem dor. Participe do encontro gratuito e receba seu Diagnóstico Íntimo.",
      },
    ],
  }),
  component: Index,
});

const steps = [
  { n: "01", text: "Entre no grupo exclusivo clicando no botão abaixo" },
  { n: "02", text: "Nesta segunda, acesse o link do Zoom enviado lá" },
  { n: "03", text: "Preencha seu Prontuário Ao Vivo pela Dra." },
];

const credentials = [
  { icon: HeartHandshake, text: "Mais de 10 anos tratando mulheres que sentem dor na relação" },
  { icon: Globe2, text: "Mais de 1.000 mulheres tratadas em 26 países" },
  {
    icon: GraduationCap,
    text: "Fisioterapeuta pela UNESP e Especialista em Fisioterapia Pélvica e Sexologia",
  },
  { icon: Sparkles, text: "Criadora do primeiro tratamento de vaginismo à distância do mundo" },
];

const heroStats = [
  { n: "26", label: "países atendidos" },
  { n: "1.000+", label: "mulheres transformadas" },
  { n: "10+", label: "anos de experiência" },
];

const EVENT_DATE = new Date("2026-08-25T14:00:00-03:00");

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
  const countdown = useCountdown(EVENT_DATE);

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

  const Cta = ({ className = "", label = "Realizar o meu Diagnóstico", whatsapp = false }: { className?: string; label?: string; whatsapp?: boolean }) => (
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
            <span style={{ fontFamily: "Cinzel, serif" }}>O encontro começa em</span>
            <span className="tabular-nums text-gold font-semibold" style={{ fontFamily: "Cinzel, serif" }}>
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
            <div className="mt-0 text-center">
              <h1 className="uppercase leading-[1]" style={{ fontFamily: "Kanit, sans-serif" }}>
                <span className="block text-gold whitespace-nowrap" style={{ fontWeight: 600, fontSize: "clamp(2.2rem, 11.5vw, 6rem)" }}>viver sem dor</span>
                <span className="block text-brown mt-2 whitespace-nowrap" style={{ fontWeight: 400, fontSize: "clamp(1rem, 5.5vw, 2.5rem)" }}>começa no <em className="underline underline-offset-4 decoration-gold/60 not-italic">Diagnóstico Íntimo</em></span>
              </h1>
            </div>
            <p className="mt-10 max-w-xl text-center text-sm leading-relaxed text-foreground/80 [text-wrap:pretty] sm:text-base">
              Nesta <strong className="text-brown font-semibold">segunda-feira, às 14h</strong>, a Dra. Amanda vai diagnosticar cada mulher que estiver no encontro fechado e explicar o caminho para a cura de acordo com cada resultado.
            </p>
            <div className="mt-12 flex flex-col items-center">
              <Cta label="Reservar o meu Diagnóstico" />
            </div>
            <p className="mt-12 text-center font-display text-[1.6rem] italic leading-[1.2] text-brown/70">
              Você não precisa mais continuar fugindo,<br />evitando ou inventando desculpas.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3">
              <div
                className="flex flex-col items-center transition-opacity duration-300 ease-in-out"
                style={{ opacity: statVisible ? 1 : 0 }}
              >
                <span className="text-[4.5rem] leading-none text-gold" style={{ fontFamily: "Cinzel, serif" }}>
                  {heroStats[statIdx].n}
                </span>
                <div className="mt-3 flex items-center gap-3">
                  <div className="hairline-gold h-px w-10" />
                  <span className="text-[0.7rem] tracking-[0.2em] text-brown uppercase" style={{ fontFamily: "Cinzel, serif" }}>
                    {heroStats[statIdx].label}
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
            <img
              src={diagnosticoImage}
              alt="Diagnóstico Íntimo — documento da Dra. Amanda Sandei"
              width={1200}
              height={1504}
              className="relative w-full rounded-[1.75rem] object-contain"
            />
            <div className="relative mx-auto -mt-10 w-[85%] rounded-2xl border border-border bg-card/90 p-4 lg:p-6 backdrop-blur text-center">
              <p className="flex items-center justify-center gap-2 text-sm lg:text-base text-gold uppercase tracking-[0.15em]" style={{ fontFamily: "Kanit, sans-serif" }}>
                Prontuário Ao Vivo
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                </span>
              </p>
              <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                Conduzido pela Dra. Amanda para<br />avaliar o seu caso individualmente.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* COMO FUNCIONA */}
      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-6 py-5 lg:px-10">
          <div className="space-y-0 divide-y divide-gold/20">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className="flex items-center gap-4 py-3"
                style={{ animation: `fade-in-up 0.5s ease both`, animationDelay: `${i * 180}ms` }}
              >
                <span className="shrink-0 text-[1.6rem] leading-none text-gold" style={{ fontFamily: "Cinzel, serif" }}>{step.n}</span>
                <p className="text-sm leading-snug text-foreground/80">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-4 flex flex-col items-center">
            <p className="text-center font-display text-[1.35rem] leading-snug text-brown sm:text-2xl">
              <span className="text-gold">E pronto!</span> Você receberá seu Diagnóstico<br />Íntimo e as Orientações do seu quadro.
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
          <h2 className="text-center text-[2rem] leading-tight text-brown sm:text-4xl" style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800 }}>
            Você já sofreu o suficiente<br />sem saber o porquê
          </h2>
          <div className="mt-10 space-y-4">
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card px-5 py-4">
              <Stethoscope className="mt-0.5 shrink-0 size-5 text-gold" aria-hidden />
              <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                A Dra. Amanda vai explicar como funciona o Diagnóstico Íntimo, quais sinais precisam ser observados e <strong className="text-brown font-medium">como se manifesta cada um dos casos.</strong>
              </p>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card px-5 py-4">
              <HeartPulse className="mt-0.5 shrink-0 size-5 text-gold" aria-hidden />
              <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                Você vai entender o que pode estar por trás da sua dor, <strong className="text-brown font-medium">qual a intensidade do seu quadro</strong> e o que fazer a partir daqui.
              </p>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card px-5 py-4">
              <ClipboardList className="mt-0.5 shrink-0 size-5 text-gold" aria-hidden />
              <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                Ao final, você preenche seu prontuário individual e recebe o seu <strong className="text-brown font-medium">Diagnóstico Íntimo.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-4 px-6 pt-6 pb-10 lg:gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <figure className="relative">
            <img
              src={portraitAmanda}
              alt="Dra. Amanda Sandei"
              loading="lazy"
              width={1024}
              height={1280}
              className="aspect-4/5 w-full rounded-[1.5rem] object-cover"
            />
          </figure>
          <div>
            <p className="text-center text-[1.25rem] tracking-[0.35em] text-brown/70 uppercase" style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 300 }}>Quem conduz</p>
            <h2 className="mt-0 text-center text-[2.2rem] text-gold sm:text-5xl" style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800 }}>
              Dra. Amanda Sandei
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
            <p className="mt-10 text-center font-display text-[1.5rem] italic leading-snug text-brown/75">
              Você já esperou tempo demais.<br />Agora é a sua vez de resolver.
            </p>
            <div className="mt-8">
              <Cta label="Quero ser diagnosticada" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream">
        <div className="mx-auto max-w-2xl px-6 pt-8 pb-14 lg:px-10">
          <p className="text-center font-display text-[1.4rem] italic text-brown/70">E antes que nos pergunte:</p>
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="q1" className="border-gold/20">
              <AccordionTrigger className="text-base text-foreground/80 hover:no-underline hover:text-brown">
                É realmente gratuito?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Sim, 100% gratuito. Não há nenhuma cobrança para participar do encontro. Você só precisa reservar sua vaga e aparecer na segunda-feira às 14h.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="border-gold/20">
              <AccordionTrigger className="text-base text-foreground/80 hover:no-underline hover:text-brown">
                Preciso ter câmera ou microfone?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Não. Você pode participar apenas assistindo, sem câmera nem microfone. O prontuário é preenchido por escrito durante o encontro, no seu próprio ritmo.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="border-gold/20">
              <AccordionTrigger className="text-base text-foreground/80 hover:no-underline hover:text-brown">
                O que acontece depois do encontro?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Você sai com o seu Diagnóstico Íntimo em mãos e as orientações do seu quadro. Se quiser continuar o tratamento, a Dra. Amanda atende online, de qualquer lugar do mundo.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center">
        <p className="text-xs tracking-wide text-muted-foreground">
          Dra. Amanda Sandei &middot; Fisioterapia Pélvica e Sexologia
        </p>
      </footer>
    </div>
  );
}
