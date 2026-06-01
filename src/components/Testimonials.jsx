import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "../data/watchData";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" });
    }
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-section-header", {
        opacity: 0, y: 40, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[active];

  return (
    <section id="testimonials" ref={sectionRef} className="py-32 bg-[#0d0d0d] relative overflow-hidden" aria-label="Testimonials">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="testimonial-section-header text-center mb-16">
          <div className="section-label mb-4">What They Say</div>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-white mb-4">
            Voices of <span className="gold-text italic">Distinction</span>
          </h2>
          <div className="divider-gold mx-auto mt-6" />
        </div>

        {/* Card */}
        <div ref={cardRef} className="glass-card p-10 sm:p-14 rounded-sm text-center relative" role="blockquote">
          {/* Quote mark */}
          <div className="font-display text-8xl gold-text opacity-10 absolute top-4 left-8 leading-none select-none" aria-hidden="true">"</div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6" aria-label={`${t.rating} out of 5 stars`}>
            {Array.from({ length: t.rating }).map((_, i) => (
              <FaStar key={i} size={14} className="text-[var(--gold)]" aria-hidden="true" />
            ))}
          </div>

          <p className="font-display text-xl sm:text-2xl font-light text-white leading-relaxed mb-8 italic">
            "{t.quote}"
          </p>

          <div className="divider-gold mx-auto mb-6" />

          <div className="font-display text-lg text-white font-light">{t.name}</div>
          <div className="section-label opacity-50 mt-1">{t.title}</div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button onClick={prev} className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors duration-300" aria-label="Previous testimonial">
            <FaChevronLeft size={14} aria-hidden="true" />
          </button>

          {/* Dots */}
          <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === active ? "w-6 h-1.5 bg-[var(--gold)]" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>

          <button onClick={next} className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors duration-300" aria-label="Next testimonial">
            <FaChevronRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
