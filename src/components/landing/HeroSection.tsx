import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-sports.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Complejo deportivo moderno" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/75" />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
        >
          <Zap size={14} className="text-primary" />
          <span className="text-xs font-semibold text-primary">Plataforma #1 en reservas deportivas</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 max-w-4xl font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-7xl"
        >
          Reserva tu cancha.{" "}
          <span className="text-primary">Juega tu deporte.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Conectamos centros deportivos con jugadores. Registra tus canchas o encuentra la mejor para ti en segundos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#centros"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:scale-105 hover:brightness-110"
          >
            Soy Centro Comercial
            <ArrowRight size={18} />
          </a>
          <a
            href="#jugadores"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-8 py-4 text-base font-bold text-secondary-foreground transition-all hover:border-primary/50 hover:bg-secondary/80"
          >
            Soy Jugador
            <ArrowRight size={18} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-3 gap-8 sm:gap-16"
        >
          {[
            { value: "500+", label: "Canchas" },
            { value: "10K+", label: "Jugadores" },
            { value: "50+", label: "Centros" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-primary sm:text-4xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
