import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              Contacto
            </span>
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-5xl">
              ¿Listo para <span className="text-primary">empezar</span>?
            </h2>
            <p className="text-muted-foreground">
              Cuéntanos sobre tu centro deportivo o tu necesidad como jugador. Te responderemos en menos de 24 horas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-card p-12 text-center shadow-[var(--shadow-card)]">
                <CheckCircle size={48} className="text-primary" />
                <h3 className="font-display text-2xl font-bold text-foreground">¡Mensaje enviado!</h3>
                <p className="text-muted-foreground">Nos pondremos en contacto contigo pronto.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:p-10"
              >
                <div className="mb-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Nombre</label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-foreground">Tipo</label>
                  <select
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="centro">Centro Comercial</option>
                    <option value="jugador">Jugador</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-foreground">Mensaje</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:scale-[1.02] hover:brightness-110"
                >
                  Enviar Mensaje
                  <Send size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

