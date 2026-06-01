import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { collections } from "../data/watchData";
import { FaArrowRight } from "react-icons/fa";
import imgClassic from "../assets/watch-chronograph-leather-wide.jpg";
import imgChronograph from "../assets/watch-chronograph-steel-flat.jpg";
import imgHeritage from "../assets/watch-skeleton-silver-front.jpg";
import imgExecutive from "../assets/watch-skeleton-black-angled.jpg";

gsap.registerPlugin(ScrollTrigger);

const collectionImages = {
  classic: imgClassic,
  chronograph: imgChronograph,
  heritage: imgHeritage,
  executive: imgExecutive,
};

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
              {/* Watch image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={collectionImages[col.id]}
                  alt={col.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 50%, ${col.accent}20 0%, transparent 70%)` }}
                  aria-hidden="true"
                />
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
