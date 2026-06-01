import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { craftsmanship } from "../data/watchData";

gsap.registerPlugin(ScrollTrigger);

export default function Craftsmanship() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".craft-item", {
        opacity: 0, y: 50, stagger: 0.2, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
      gsap.from(".craft-headline", {
        opacity: 0, y: 40, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="craftsmanship" ref={sectionRef} className="py-32 relative overflow-hidden" aria-label="Craftsmanship">
      {/* Background */}
      <div className="absolute inset-0 bg-[#080808]" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 60% 40% at 20% 60%, rgba(201,168,76,0.04) 0%, transparent 70%)" }} />

      {/* Decorative large number */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[20vw] font-light leading-none select-none pointer-events-none"
        style={{ color: "rgba(201,168,76,0.02)" }} aria-hidden="true">CRAFT</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="craft-headline mb-20">
          <div className="section-label mb-4">The Art of Making</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4 max-w-2xl">
            Where <span className="gold-text italic">Precision</span> Meets Passion
          </h2>
          <div className="divider-gold mt-6" />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {craftsmanship.map((item) => (
            <div key={item.number} className="craft-item glass-card p-8 group hover:bg-[#1a1a1a] transition-colors duration-400">
              <div className="font-display text-5xl gold-text font-light mb-6 opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                {item.icon}
              </div>
              <div className="section-label mb-3 opacity-50">{item.number}</div>
              <h3 className="font-display text-xl font-light text-white mb-4 leading-tight">{item.title}</h3>
              <p className="text-[var(--text-muted)] text-xs leading-relaxed font-light">{item.description}</p>
              <div className="mt-6 w-8 h-px bg-gradient-to-r from-[var(--gold)] to-transparent group-hover:w-16 transition-all duration-500" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Bottom cinematic strip */}
        <div className="mt-20 grid grid-cols-3 gap-4">
          {[
            { label: "0.001mm", desc: "Machining Tolerance" },
            { label: "72hrs", desc: "Quality Testing" },
            { label: "200+", desc: "Components Per Watch" },
          ].map(({ label, desc }) => (
            <div key={label} className="glass-card p-6 text-center rounded-sm">
              <div className="font-display text-3xl sm:text-4xl gold-text font-light mb-2">{label}</div>
              <div className="section-label opacity-50">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
