import ShaderBackground from "@/components/ui/shader-background";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import StatsTicker from "@/components/stats-ticker";
import AboutHackathon from "@/components/about-hackathon";
import WhyParticipate from "@/components/why-participate";
import TracksSection from "@/components/tracks-section";
import InterestForm from "@/components/interest-form";
import FaqSection from "@/components/faq-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Fixed shader lives here — covers the entire page behind all sections */}
      <ShaderBackground />

      <Navbar mode="hackathon" />
      <Hero />
      <StatsTicker />
      <AboutHackathon />
      <WhyParticipate />
      <TracksSection />
      <InterestForm />
      <FaqSection />
      <Footer />
    </main>
  );
}
