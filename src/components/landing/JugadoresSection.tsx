import { motion } from "framer-motion";
import { Search, CalendarCheck, MapPin } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Busca por deporte",
    description:
      "Filtra canchas por deporte: fútbol, básquetbol, vóleibol, pádel, tenis. Encuentra exactamente lo que buscas cerca de ti.",
  },
  {
    icon: CalendarCheck,
    title: "Reserva en segundos",
    description:
      "Selecciona fecha, hora y cancha. Confirma tu reserva al instante sin llamadas ni esperas. Así de fácil.",
  },
  {
    icon: MapPin,
    title: "Explora centros",
    description:
      "Descubre canchas en diferentes centros comerciales. Compara precios, horarios y ubicaciones para elegir la mejor opción.",
  },
];

const JugadoresSection = () => {
  return (
    <section id="jugadores" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
            Para Jugadores
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-5xl">
            Tu próximo partido <span className="text-accent">comienza aquí</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Encuentra y reserva canchas de cualquier deporte en los mejores centros de tu ciudad.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] transition-all hover:border-accent/40"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/5 transition-transform group-hover:scale-150" />
              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <feature.icon size={24} />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          {["⚽ Fútbol", "🏀 Básquetbol", "🏐 Vóleibol", "🎾 Tenis", "🏸 Pádel", "🏑 Hockey"].map(
            (sport) => (
              <span
                key={sport}
                className="rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
              >
                {sport}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default JugadoresSection;
