import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { WaveBackground } from "../components/WaveBackground";
import { HeroSection } from "../components/HeroSection";
import { AcademicJourneySection } from "../components/AcademicJourneySection";
import { CertificatesSection } from "../components/CertificatesSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden text-foreground relative">
      {/* Background Effects */}
      <WaveBackground />

      <div className="relative z-10">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main>
          <HeroSection />
          <AcademicJourneySection />
          <CertificatesSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};
