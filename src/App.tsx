import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { RecommendationsSection } from "./components/RecommendationsSection";
import { ExampleSection } from "./components/ExampleSection";
import { FaqSection } from "./components/FaqSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { Footer } from "./components/Footer";

function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text">
      <a
        href="#main-content"
        className="focus-ring sr-only rounded bg-accent-cyan px-3 py-2 text-bg focus:not-sr-only"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <RecommendationsSection />
        <ExampleSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
