import CentrosSection from "../components/landing/CentrosSections";
import ContactSection from "../components/landing/ContactSection";
import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";
import HeroSection from "../components/landing/HeroSection";
import JugadoresSection from "../components/landing/JugadoresSection";


const Index = () => {
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

export default Index;
