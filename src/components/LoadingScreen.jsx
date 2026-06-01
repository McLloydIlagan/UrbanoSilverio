import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingScreen({ onComplete }) {
  const screenRef = useRef(null);
  const barRef = useRef(null);
  const logoRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(screenRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    tl.from(logoRef.current, { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" })
      .from(subtitleRef.current, { opacity: 0, y: 10, duration: 0.6, ease: "power2.out" }, "-=0.3")
      .to(barRef.current, { width: "100%", duration: 2, ease: "power2.inOut" }, "-=0.2")
      .to({}, { duration: 0.3 });
  }, [onComplete]);

  return (
    <div id="loading-screen" ref={screenRef}>
      <div className="flex flex-col items-center gap-6">
        <div ref={logoRef} className="loading-logo tracking-[0.4em] text-white font-light">
          URBANO SILVERIO
        </div>
        <div ref={subtitleRef} className="section-label opacity-60">
          Est. 2008 · Geneva
        </div>
        <div className="loading-bar-track">
          <div
            ref={barRef}
            style={{ width: "0%", height: "100%", background: "linear-gradient(90deg, #8B6914, #E8C97A)" }}
          />
        </div>
        <div className="section-label opacity-40 text-xs">Crafting your experience...</div>
      </div>
    </div>
  );
}
