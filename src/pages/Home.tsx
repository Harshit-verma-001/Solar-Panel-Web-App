import Navigation from "@/sections/Navigation";
import Hero from "@/sections/Hero";
import SolarGrid from "@/sections/SolarGrid";
import Process from "@/sections/Process";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fcfcfc" }}>
      <Navigation />
      <Hero />
      <SolarGrid />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}
