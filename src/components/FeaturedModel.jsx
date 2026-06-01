import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredModel } from "../data/watchData";
import featuredImg from "../assets/watch-chronograph-rubber-front.jpg";
import moonphaseImg from "../assets/watch-chronograph-moonphase.jpg";

gsap.registerPlugin(ScrollTrigger);

function FeaturedWatch() {
  return (
    <div className="relative flex items-center justify-center w-72 h-72 sm:w-96 sm:h-96 watch-float">
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full animate-pulse"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.15) 0%, transparent 70%)" }} aria-hidden="true" />
      {/* Case */}
      <div className="absolute inset-0 rounded-full"
        style={{ background: "linear-gradient(135deg, #9a9a9a 0%, #c0c0c0 25%, #6a6a6a 50%, #a0a0a0 75%, #888 100%)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.9), inset 0 2px 6px rgba(255,255,255,0.2), 0 0 60px rgba(201,168,76,0.12)" }} />
      {/* Gold bezel */}
      <div className="absolute inset-3 rounded-full"
        style={{ background: "linear-gradient(135deg, #E8C97A 0%, #C9A84C 30%, #8B6914 60%, #C9A84C 80%, #E8C97A 100%)",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.5)" }} />
      {/* Dial */}
      <div className="absolute inset-6 rounded-full flex items-center justify-center"
        style={{ background: "radial-gradient(ellipse at 35% 30%, #1c1c1c 0%, #050505 100%)",
          boxShadow: "inset 0 6px 20px rgba(0,0,0,0.9)" }}>
        {/* Sunburst lines */}
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${i * 10}deg)` }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-1/2 origin-bottom"
              style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.06), transparent)" }} />
          </div>
        ))}
        {/* Hour markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 360;
          const isMain = i % 3 === 0;
          return (
            <div key={i} className="absolute" style={{
              width: isMain ? "3px" : "1.5px", height: isMain ? "14px" : "8px",
              background: "#C9A84C", top: "12px", left: "50%",
              transformOrigin: "50% calc(50% + 72px)",
              transform: `translateX(-50%) rotate(${angle}deg)`,
            }} />
          );
        })}
        {/* Roman numerals hint */}
        <div className="absolute top-1/4 text-center">
          <div className="font-display text-[0.5rem] tracking-[0.3em] text-[#C9A84C]">URBANO</div>
          <div className="font-display text-[0.35rem] tracking-[0.2em] text-[#888] mt-0.5">SILVERIO</div>
          <div className="font-display text-[0.3rem] tracking-[0.15em] text-[#555] mt-0.5">USQZ01</div>
        </div>
        {/* Hands */}
        <div className="absolute w-1 rounded-full origin-bottom"
          style={{ height: "36%", bottom: "50%", left: "calc(50% - 2px)", background: "linear-gradient(to top, #C9A84C, #E8C97A)", transform: "rotate(-45deg)", boxShadow: "0 0 6px rgba(201,168,76,0.6)" }} />
        <div className="absolute rounded-full origin-bottom"
          style={{ width: "1.5px", height: "44%", bottom: "50%", left: "calc(50% - 0.75px)", background: "#fff", transform: "rotate(110deg)" }} />
        <div className="absolute w-1 rounded-full origin-bottom"
          style={{ height: "28%", bottom: "50%", left: "calc(50% - 2px)", background: "#e74c3c", transform: "rotate(200deg)" }} />
        {/* Center */}
        <div className="absolute w-3 h-3 rounded-full" style={{ background: "#C9A84C", top: "calc(50% - 6px)", left: "calc(50% - 6px)", boxShadow: "0 0 8px rgba(201,168,76,0.8)" }} />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-black" style={{ top: "calc(50% - 3px)", left: "calc(50% - 3px)" }} />
      </div>
      {/* Crown */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-3 h-6 rounded-sm"
        style={{ background: "linear-gradient(90deg, #888, #bbb)", boxShadow: "2px 0 4px rgba(0,0,0,0.5)" }} aria-hidden="true" />
    </div>
  );
}

export default function FeaturedModel() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".featured-text", {
        opacity: 0, x: -50, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
      gsap.from(".featured-watch", {
        opacity: 0, scale: 0.8, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      });
      gsap.from(".spec-item", {
        opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".spec-item", start: "top 80%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="featured" ref={sectionRef} className="py-32 relative overflow-hidden" aria-label="Featured model USQZ01">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #111008 50%, #0d0d0d 100%)" }} aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 50% 60% at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="featured-text">
            <div className="section-label mb-4">Featured Timepiece</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-2">
              {featuredModel.name}
            </h2>
            <div className="gold-text font-display text-xl italic mb-6">{featuredModel.tagline}</div>
            <div className="divider-gold mb-8" />
            <p className="text-[var(--silver)] font-light leading-relaxed mb-10 max-w-lg">{featuredModel.description}</p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-0">
              {featuredModel.specs.map((s) => (
                <div key={s.label} className="spec-item py-3 border-b border-white/5 pr-4">
                  <div className="section-label opacity-50 mb-1">{s.label}</div>
                  <div className="text-[var(--silver-light)] text-sm font-light">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-10">
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="btn-gold">
                Request Information
              </button>
              <button onClick={() => document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth" })} className="btn-outline-gold">
                Configure Yours
              </button>
            </div>
          </div>

          {/* Watch — real photo + floating illustration */}
          <div className="featured-watch flex items-center justify-center relative">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
              style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
            {/* Real photo */}
            <div className="relative w-72 sm:w-80 watch-float">
              <img
                src={featuredImg}
                alt="Urbano Silverio Chronograph — featured model"
                className="w-full h-auto object-contain drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.8)) drop-shadow(0 0 30px rgba(201,168,76,0.15))" }}
              />
            </div>
            {/* Moonphase inset */}
            <div className="absolute bottom-0 right-0 w-28 h-28 rounded-sm overflow-hidden border border-[var(--gold)]/20 shadow-2xl">
              <img src={moonphaseImg} alt="Moonphase complication" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-1.5 left-2 section-label text-[0.5rem] opacity-70">Moonphase</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
