import { useState } from "react";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Informe seu nome completo." })
    .max(100, { message: "Nome muito longo." }),
  email: z
    .string()
    .trim()
    .email({ message: "Informe um e-mail válido." })
    .max(255, { message: "E-mail muito longo." }),
  whatsapp: z
    .string()
    .trim()
    .min(10, { message: "Informe seu WhatsApp com DDD." })
    .max(20, { message: "Número muito longo." })
    .regex(/^[0-9()+\-\s]+$/, { message: "Use apenas números e DDD." }),
});

type Errors = Partial<Record<"name" | "email" | "whatsapp", string>>;

export function LeadDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [values, setValues] = useState({ name: "", email: "", whatsapp: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      setTimeout(() => {
        setStatus("idle");
        setErrors({});
        setValues({ name: "", email: "", whatsapp: "" });
      }, 250);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("loading");
    setTimeout(() => setStatus("done"), 700);
  };

  const field = (
    id: "name" | "email" | "whatsapp",
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        value={values[id]}
        onChange={(e) => setValues((v) => ({ ...v, [id]: e.target.value }))}
        className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:border-gold focus-visible:ring-0"
        {...props}
      />
      {errors[id] ? <p className="text-xs text-destructive">{errors[id]}</p> : null}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md border-border bg-card p-8 sm:p-10">
        {status === "done" ? (
          <div className="py-4 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-champagne">
              <Check className="size-6 text-gold" aria-hidden="true" />
            </div>
            <DialogTitle className="mt-6 text-3xl font-light text-brown">
              Sua vaga está reservada
            </DialogTitle>
            <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Enviamos os próximos passos para o seu e-mail e WhatsApp. Entre no grupo exclusivo
              para receber o link do Zoom na segunda-feira, às 14h.
            </DialogDescription>
            <Button
              className="mt-8 h-12 w-full rounded-full bg-gold text-white hover:bg-gold hover:opacity-90"
              onClick={() => handleOpenChange(false)}
            >
              Voltar para a página
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-left">
              <p className="text-[0.7rem] tracking-[0.24em] uppercase text-gold">
                Encontro gratuito &middot; Segunda, 14h
              </p>
              <DialogTitle className="mt-3 text-3xl font-light text-brown">
                Reserve seu Diagnóstico Íntimo
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                Preencha seus dados para entrar no grupo do encontro.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6" noValidate>
              {field("name", "Nome completo", {
                placeholder: "Seu nome",
                autoComplete: "name",
                maxLength: 100,
              })}
              {field("email", "E-mail", {
                type: "email",
                placeholder: "seu@email.com",
                autoComplete: "email",
                maxLength: 255,
              })}
              {field("whatsapp", "WhatsApp", {
                type: "tel",
                placeholder: "(11) 90000-0000",
                autoComplete: "tel",
                maxLength: 20,
              })}
              <Button
                type="submit"
                disabled={status === "loading"}
                className="h-13 w-full rounded-full bg-gold py-4 text-sm tracking-[0.08em] text-white uppercase hover:bg-gold hover:opacity-90"
              >
                {status === "loading" ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  "Quero meu Diagnóstico"
                )}
              </Button>
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                Seus dados são tratados com sigilo clínico. Sem custo e sem compromisso.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
