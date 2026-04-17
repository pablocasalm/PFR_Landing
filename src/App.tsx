import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProblemInsightSection } from "./components/ProblemInsightSection";
import { WhatIsSection } from "./components/WhatIsSection";
import { LearnInsideSection } from "./components/LearnInsideSection";
import { ExampleSection } from "./components/ExampleSection";
import { LanguageSection } from "./components/LanguageSection";
import { TeamSection } from "./components/TeamSection";
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
        <ProblemInsightSection />
        <WhatIsSection />
        <LearnInsideSection />
        <ExampleSection />
        <LanguageSection />
        <TeamSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
