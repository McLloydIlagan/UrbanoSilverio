import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import WatchCanvas from "./WatchCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const streakRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(headlineRef.current?.children, {
      opacity: 0, y: 60, stagger: 0.15, duration: 1.2, ease: "power4.out",
    })
    .from(subRef.current, { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.6")
    .from(ctaRef.current?.children, { opacity: 0, y: 20, stagger: 0.15, duration: 0.7, ease: "power3.out" }, "-=0.4");

    // Parallax on scroll
    gsap.to(".hero-bg-text", {
      y: -120,
      scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
    });

    // Light streaks loop
    const streakAnim = gsap.to(".light-streak", {
      x: "200%", duration: 3.5, ease: "power1.inOut", repeat: -1, repeatDelay: 2,
    });

    return () => { streakAnim.kill(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0d0d0d] to-[#111008]" aria-hidden="true" />

      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 70% 50% at 60% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)" }}
      />

      {/* Light streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="light-streak" style={{ top: "30%", left: "-60%" }} />
        <div className="light-streak" style={{ top: "60%", left: "-60%", animationDelay: "1.8s", opacity: 0.5 }} />
      </div>

      {/* Large background text */}
      <div
        className="hero-bg-text absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display font-light text-[18vw] leading-none tracking-widest"
          style={{ color: "rgba(201,168,76,0.03)" }}
        >
          SILVERIO
        </span>
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 pt-32 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left — Text */}
        <div>
          <div className="section-label mb-6 opacity-80">Est. 2008 · Geneva, Switzerland</div>

          <div ref={headlineRef} className="overflow-hidden">
            <h1 className="font-display font-light leading-[1.05] mb-6">
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-white">Crafted for</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-white">Those Who</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl gold-text">Value Time.</span>
            </h1>
          </div>

          <p ref={subRef} className="text-[var(--silver)] font-light text-base sm:text-lg leading-relaxed mb-10 max-w-md tracking-wide">
            Swiss-inspired precision meets timeless elegance. Every Urbano Silverio timepiece is a testament to the art of horology — engineered to perfection, designed to endure.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button onClick={() => scrollTo("collections")} className="btn-gold">
              Explore Collection <FaArrowRight size={12} aria-hidden="true" />
            </button>
            <button onClick={() => scrollTo("craftsmanship")} className="btn-outline-gold">
              Discover Craftsmanship
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            {[["16+", "Years"], ["4", "Collections"], ["1000+", "Timepieces"]].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="font-display text-2xl gold-text font-light">{val}</div>
                <div className="section-label opacity-50 mt-0.5">{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — 3D Watch */}
        <div className="flex items-center justify-center">
          <WatchCanvas />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="section-label opacity-40 text-[0.6rem]">Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent animate-pulse" />
        <FaArrowDown size={10} className="text-[var(--gold)] opacity-60" />
      </div>
    </section>
  );
}
