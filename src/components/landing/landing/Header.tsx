import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import companyLogo from "@/assets/logo.png";
export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg">
            <img src={companyLogo} alt="Logo" className="h-10 w-20 " />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Play<span className="text-primary">Now</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#centros" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Centros Comerciales
          </a>
          <a href="#jugadores" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Jugadores
          </a>
          <a href="#contacto" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Contacto
          </a>
        </nav>

        <div className="hidden md:block">
          <a
            href="login"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Iniciar Sesión
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-background px-6 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-4">
            <a href="#centros" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Centros Comerciales</a>
            <a href="#jugadores" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Jugadores</a>
            <a href="#contacto" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Contacto</a>
            <a href="#login" className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Iniciar Sesión
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

