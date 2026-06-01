import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const specs = [
  { label: "Movement", value: "Swiss Quartz", highlight: false },
  { label: "Case Diameter", value: "41mm", highlight: true },
  { label: "Crystal", value: "Sapphire Anti-Reflective", highlight: false },
  { label: "Water Resistance", value: "100m / 330ft", highlight: true },
  { label: "Case Material", value: "316L Stainless Steel", highlight: false },
  { label: "Dial", value: "Sunburst Roman Numeral", highlight: true },
];

const highlights = [
  { id: "crown", label: "Screw-Down Crown", x: "72%", y: "48%", desc: "Ensures water resistance up to 100 meters" },
  { id: "bezel", label: "Polished Bezel", x: "50%", y: "8%", desc: "Hand-finished with micro-blasted surfaces" },
  { id: "dial", label: "Sunburst Dial", x: "50%", y: "50%", desc: "Roman numerals applied by hand" },
  { id: "bracelet", label: "Alligator Strap", x: "50%", y: "88%", desc: "Genuine exotic leather, hand-stitched" },
];

export default function WatchShowcase() {
  const sectionRef = useRef(null);
  const specsRef = useRef(null);
  const watchRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Specs reveal
      gsap.from(".spec-row", {
        opacity: 0, x: -30, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: specsRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      });

      // Watch scale in
      gsap.from(watchRef.current, {
        opacity: 0, scale: 0.85, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: watchRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });

      // Hotspot dots pulse
      gsap.to(".hotspot-dot", {
        scale: 1.4, opacity: 0.5, duration: 1.2, ease: "sine.inOut",
        repeat: -1, yoyo: true, stagger: 0.3,
      });

      // Parallax
      gsap.to(".showcase-bg", {
        y: -60,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      aria-label="Watch showcase"
    >
      <div
        className="showcase-bg absolute inset-0"
        aria-hidden="true"
        style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #111008 50%, #0a0a0a 100%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="section-label mb-4">The Showcase</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
            Every Detail, <span className="gold-text italic">Perfected</span>
          </h2>
          <div className="divider-gold mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Watch visual with hotspots */}
          <div ref={watchRef} className="relative flex items-center justify-center">
            {/* Watch face illustration */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Outer case */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #6a6a6a 0%, #9a9a9a 30%, #5a5a5a 60%, #8a8a8a 100%)",
                  boxShadow: "0 0 60px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.15), 0 0 30px rgba(201,168,76,0.1)",
                }}
              />
              {/* Bezel */}
              <div
                className="absolute inset-3 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #C9A84C 0%, #E8C97A 30%, #8B6914 60%, #C9A84C 100%)",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)",
                }}
              />
              {/* Dial */}
              <div
                className="absolute inset-6 rounded-full flex items-center justify-center"
                style={{
                  background: "radial-gradient(ellipse at 40% 35%, #1a1a1a 0%, #0a0a0a 100%)",
                  boxShadow: "inset 0 4px 12px rgba(0,0,0,0.8)",
                }}
              >
                {/* Hour markers */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i / 12) * 360;
                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        width: i % 3 === 0 ? "3px" : "1.5px",
                        height: i % 3 === 0 ? "12px" : "8px",
                        background: "#C9A84C",
                        top: "8px",
                        left: "50%",
                        transformOrigin: "50% calc(50% + 70px)",
                        transform: `translateX(-50%) rotate(${angle}deg)`,
                      }}
                    />
                  );
                })}
                {/* Brand name on dial */}
                <div className="absolute top-1/3 text-center">
                  <div className="font-display text-[0.45rem] tracking-[0.25em] text-[#C9A84C] opacity-80">URBANO</div>
                  <div className="font-display text-[0.35rem] tracking-[0.2em] text-[#A8A9AD] opacity-60">SILVERIO</div>
                </div>
                {/* Hands */}
                <div
                  className="absolute w-0.5 bg-[#E8C97A] rounded-full origin-bottom"
                  style={{ height: "35%", bottom: "50%", left: "calc(50% - 1px)", transform: "rotate(-30deg)" }}
                />
                <div
                  className="absolute w-px bg-[#E8C97A] rounded-full origin-bottom"
                  style={{ height: "42%", bottom: "50%", left: "calc(50% - 0.5px)", transform: "rotate(120deg)" }}
                />
                {/* Center dot */}
                <div className="absolute w-2 h-2 rounded-full bg-[#C9A84C]" style={{ top: "calc(50% - 4px)", left: "calc(50% - 4px)" }} />
              </div>

              {/* Hotspot dots */}
              {highlights.map((h) => (
                <div
                  key={h.id}
                  className="absolute group"
                  style={{ left: h.x, top: h.y, transform: "translate(-50%, -50%)" }}
                >
                  <div className="hotspot-dot w-3 h-3 rounded-full bg-[var(--gold)] opacity-80 cursor-pointer relative">
                    <div className="absolute inset-0 rounded-full bg-[var(--gold)] animate-ping opacity-40" />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute left-5 top-0 glass-card px-3 py-2 rounded min-w-[140px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="text-[var(--gold)] text-xs font-semibold mb-0.5">{h.label}</div>
                    <div className="text-[var(--silver)] text-[0.65rem] leading-tight">{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Strap */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-t-sm" style={{ background: "#1a0a00", marginTop: "-8px" }} aria-hidden="true" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-b-sm" style={{ background: "#1a0a00", marginBottom: "-8px" }} aria-hidden="true" />
          </div>

          {/* Specs */}
          <div ref={specsRef} className="space-y-0">
            <h3 className="font-display text-3xl font-light text-white mb-8">
              Technical <span className="gold-text italic">Specifications</span>
            </h3>
            {specs.map((s, i) => (
              <div
                key={i}
                className={`spec-row flex justify-between items-center py-4 border-b ${s.highlight ? "border-[var(--gold)]/20" : "border-white/5"}`}
              >
                <span className="section-label opacity-60">{s.label}</span>
                <span className={`font-light text-sm tracking-wide ${s.highlight ? "text-[var(--gold)]" : "text-[var(--silver-light)]"}`}>
                  {s.value}
                </span>
              </div>
            ))}
            <div className="pt-8">
              <button
                onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-gold"
              >
                View Featured Model
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
