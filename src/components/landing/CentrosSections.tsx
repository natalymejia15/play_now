import { motion } from "framer-motion";
import { Building2, BarChart3, ClipboardList, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Registra tus canchas",
    description:
      "Agrega todas tus canchas deportivas: fútbol, básquetbol, pádel, tenis y más. Configura horarios, precios y disponibilidad fácilmente.",
  },
  {
    icon: BarChart3,
    title: "Estadísticas en tiempo real",
    description:
      "Monitorea reservas, ingresos y ocupación. Toma mejores decisiones con datos precisos sobre el uso de tus instalaciones.",
  },
  {
    icon: ClipboardList,
    title: "Gestión simplificada",
    description:
      "Administra reservas, pagos y comunicación con jugadores desde un solo panel. Sin complicaciones ni papeleos.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

const CentrosSection = () => {
  return (
    <section id="centros" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            Para Centros Comerciales
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-5xl">
            Tu complejo deportivo, <span className="text-primary">digitalizado</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Lleva tu centro al siguiente nivel con herramientas diseñadas para maximizar la ocupación y simplificar la gestión.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] transition-all hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon size={24} />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
          >
            Contáctanos para registrar tu centro
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CentrosSection;
