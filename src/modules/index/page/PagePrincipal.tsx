import { Header, HeroSection, CentrosSection, JugadoresSection, ContactSection, Footer } from '@/components';

export const PagePrincipal = () => {
  return (
    <div className="theme-landing min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <CentrosSection />
      <JugadoresSection />
      <ContactSection />
      <Footer />
    </div>
  );
};
