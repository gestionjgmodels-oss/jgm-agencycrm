
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Services from "@/app/components/Services";
import Process from "@/app/components/Process";
import Pricing from "@/app/components/Pricing";
import TechStack from "@/app/components/TechStack";
import Results from "@/app/components/Results";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-transparent text-gray-900 selection:bg-brand-accent/30">
      <Header />
      <Hero />
      <TechStack />
      <Services />
      <Process />
      <Results />
      <Pricing />
      <Footer />
    </main>
  );
}
