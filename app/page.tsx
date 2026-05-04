import Preloader from "./components/landing/Preloader";
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import HowItWorks from "./components/landing/HowItWorks";
import ProblemStatement from "./components/landing/ProblemStatement";
import SolutionSection from "./components/landing/SolutionSection";
import ImpactSection from "./components/landing/ImpactSection";
import FinalCTA from "./components/landing/FinalCTA";
import CustomCursor from "./components/landing/CustomCursor";

export default function Home() {
  return (
    <main className="bg-background min-h-[100svh] text-foreground selection:bg-accent selection:text-white relative flex flex-col w-full overflow-hidden">
      <Preloader />
      <CustomCursor />
      <Navbar />
      <Hero />
      <HowItWorks />
      <ProblemStatement />
      <SolutionSection />
      <ImpactSection />
      <FinalCTA />
    </main>
  );
}
