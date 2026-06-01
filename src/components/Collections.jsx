import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { collections } from "../data/watchData";
import { FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

// SVG watch face placeholder per collection
function WatchFace({ accent, size = 180 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="90" cy="90" r="88" fill="#111" stroke={accent} strokeWidth="1.5" />
      <circle cx="90" cy="90" r="78" fill="#0a0a0a" stroke={accent} strokeWidth="0.5" strokeOpacity="0.4" />
      <circle cx="90" cy="90" r="68" fill="#080808" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const r1 = 62, r2 = i % 3 === 0 ? 54 : 58;
        return (
          <line key={i}
            x1={90 + r1 * Math.cos(angle)} y1={90 + r1 * Math.sin(angle)}
            x2={90 + r2 * Math.cos(angle)} y2={90 + r2 * Math.sin(angle)}
            stroke={accent} strokeWidth={i % 3 === 0 ? 2 : 1} strokeOpacity="0.8"
          />
        );
      })}
      <text x="90" y="60" textAnchor="middle" fill={accent} fontSize="7" fontFamily="Cormorant Garamond, serif" letterSpacing="3" opacity="0.9">URBANO</text>
      <text x="90" y="70" textAnchor="middle" fill="#888" fontSize="5" fontFamily="Montserrat, sans-serif" letterSpacing="2" opacity="0.7">SILVERIO</text>
      {/* Hour hand */}
      <line x1="90" y1="90" x2="90" y2="42" stroke={accent} strokeWidth="2.5" strokeLinecap="round" transform="rotate(-30 90 90)" />
      {/* Minute hand */}
      <line x1="90" y1="90" x2="90" y2="36" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" transform="rotate(120 90 90)" />
      <circle cx="90" cy="90" r="4" fill={accent} />
      <circle cx="90" cy="90" r="2" fill="#0a0a0a" />
    </svg>
  );
}

export default function Collections() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".collection-card", {
        opacity: 0, y: 60, stagger: 0.15, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="collections" ref={sectionRef} className="py-32 bg-[#0d0d0d]" aria-label="Collections">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="section-label mb-4">Our Collections</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
            Timepieces for <span className="gold-text italic">Every Chapter</span>
          </h2>
          <p className="text-[var(--text-muted)] font-light max-w-xl mx-auto leading-relaxed">
            Four distinct collections, each telling a unique story of craftsmanship, heritage, and modern luxury.
          </p>
          <div className="divider-gold mx-auto mt-6" />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              className="collection-card glass-card rounded-sm group cursor-pointer"
              role="article"
              aria-label={col.name}
            >
              {/* Watch visual */}
              <div
                className="relative h-56 flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, #0d0d0d, #1a1a1a)` }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 50%, ${col.accent}15 0%, transparent 70%)` }}
                  aria-hidden="true"
                />
                <div className="transform group-hover:scale-110 transition-transform duration-700 watch-float">
                  <WatchFace accent={col.accent} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="section-label mb-2" style={{ color: col.accent }}>{col.subtitle}</div>
                <h3 className="font-display text-xl font-light text-white mb-3 leading-tight">{col.name}</h3>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed mb-4 font-light">{col.description}</p>

                {/* Specs */}
                <div className="space-y-1 mb-5">
                  {col.specs.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ background: col.accent }} aria-hidden="true" />
                      <span className="text-[0.65rem] text-[var(--silver)] tracking-wide">{s}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium transition-all duration-300 group-hover:gap-3"
                  style={{ color: col.accent }}
                  aria-label={`Explore ${col.name}`}
                >
                  Explore <FaArrowRight size={10} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
