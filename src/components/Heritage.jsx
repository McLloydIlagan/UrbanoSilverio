import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heritage } from "../data/watchData";

gsap.registerPlugin(ScrollTrigger);

export default function Heritage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        opacity: 0, y: 40, stagger: 0.2, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
      });
      gsap.from(".heritage-line", {
        scaleY: 0, duration: 1.5, ease: "power2.out", transformOrigin: "top center",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="heritage" ref={sectionRef} className="py-32 bg-[#0a0a0a] relative overflow-hidden" aria-label="Brand heritage">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 50% 80% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="section-label mb-4">Our Story</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
            A Legacy of <span className="gold-text italic">Excellence</span>
          </h2>
          <div className="divider-gold mx-auto mt-6" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="heritage-line absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.4), transparent)" }} aria-hidden="true" />

          <div className="space-y-12">
            {heritage.map((item, i) => (
              <div
                key={item.year}
                className={`timeline-item relative grid md:grid-cols-2 gap-8 items-center ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}
              >
                {/* Content */}
                <div className={`glass-card p-6 rounded-sm ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  <div className="font-display text-3xl gold-text font-light mb-2">{item.year}</div>
                  <h3 className="font-display text-xl font-light text-white mb-3">{item.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm font-light leading-relaxed">{item.description}</p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full items-center justify-center z-10"
                  style={{ background: "#C9A84C", boxShadow: "0 0 16px rgba(201,168,76,0.6)" }} aria-hidden="true">
                  <div className="w-2 h-2 rounded-full bg-black" />
                </div>

                {/* Empty side */}
                <div />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
