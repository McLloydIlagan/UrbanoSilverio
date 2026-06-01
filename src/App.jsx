import { useState, useEffect } from "react";
import Lenis from "lenis";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WatchShowcase from "./components/WatchShowcase";
import Collections from "./components/Collections";
import Configurator from "./components/Configurator";
import Craftsmanship from "./components/Craftsmanship";
import FeaturedModel from "./components/FeaturedModel";
import Heritage from "./components/Heritage";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar />
          <main id="main-content">
            <Hero />
            <WatchShowcase />
            <Collections />
            <Configurator />
            <Craftsmanship />
            <FeaturedModel />
            <Heritage />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
