import Navbar from "@/components/navbar";
import ScrollLanding from "@/components/scroll-landing";

export default function Home() {
  return (
    <main className="relative">
      {/* Floating navbar — links to About, Research, Past Events, Sponsors */}
      <Navbar mode="hackathon" />
      {/* Full-screen scroll animation landing page */}
      <ScrollLanding />
    </main>
  );
}
