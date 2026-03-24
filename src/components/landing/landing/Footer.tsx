export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">⚽</span>
            </div>
            <span className="font-display text-lg font-bold text-foreground">
              Sport<span className="text-primary">Hub</span>
            </span>
          </div>

          <nav className="flex gap-6">
            <a href="#centros" className="text-sm text-muted-foreground transition-colors hover:text-primary">Centros</a>
            <a href="#jugadores" className="text-sm text-muted-foreground transition-colors hover:text-primary">Jugadores</a>
            <a href="#contacto" className="text-sm text-muted-foreground transition-colors hover:text-primary">Contacto</a>
          </nav>

          <p className="text-xs text-muted-foreground">
            © 2026 SportHub. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

