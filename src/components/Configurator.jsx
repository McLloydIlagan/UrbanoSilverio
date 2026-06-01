import { useState } from "react";

const options = {
  caseColor: [
    { id: "steel", label: "Steel", color: "#8a8a8a" },
    { id: "gold", label: "Gold PVD", color: "#C9A84C" },
    { id: "black", label: "Black DLC", color: "#1a1a1a" },
    { id: "rose", label: "Rose Gold", color: "#b5785a" },
  ],
  dialColor: [
    { id: "black", label: "Midnight", color: "#0a0a0a" },
    { id: "white", label: "Ivory", color: "#f0ede0" },
    { id: "blue", label: "Navy", color: "#0d1b3e" },
    { id: "green", label: "Forest", color: "#0d2b1a" },
  ],
  strapType: [
    { id: "leather", label: "Leather" },
    { id: "bracelet", label: "Bracelet" },
    { id: "rubber", label: "Rubber" },
    { id: "nato", label: "NATO" },
  ],
  strapColor: [
    { id: "black", label: "Black", color: "#0a0a0a" },
    { id: "brown", label: "Cognac", color: "#6b3a1f" },
    { id: "navy", label: "Navy", color: "#0d1b3e" },
    { id: "tan", label: "Tan", color: "#c4956a" },
  ],
  glass: [
    { id: "sapphire", label: "Sapphire" },
    { id: "mineral", label: "Mineral" },
    { id: "domed", label: "Domed Sapphire" },
  ],
  movement: [
    { id: "quartz", label: "Swiss Quartz" },
    { id: "automatic", label: "Automatic" },
    { id: "mechanical", label: "Mechanical" },
  ],
};

function Swatch({ item, selected, onClick, isColor }) {
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`transition-all duration-300 ${
        isColor
          ? "w-8 h-8 rounded-full border-2 hover:scale-110"
          : "px-3 py-1.5 text-xs tracking-wider border rounded-sm font-light"
      } ${selected ? "border-[var(--gold)] scale-110" : "border-white/10 hover:border-white/30"}`}
      style={isColor ? { background: item.color } : { color: selected ? "var(--gold)" : "var(--silver)", borderColor: selected ? "var(--gold)" : undefined }}
      aria-label={item.label}
      aria-pressed={selected}
      title={item.label}
    />
  );
}

export default function Configurator() {
  const [config, setConfig] = useState({
    caseColor: "steel",
    dialColor: "black",
    strapType: "leather",
    strapColor: "black",
    glass: "sapphire",
    movement: "quartz",
  });

  const set = (key, val) => setConfig((c) => ({ ...c, [key]: val }));

  const caseC = options.caseColor.find((o) => o.id === config.caseColor)?.color || "#8a8a8a";
  const dialC = options.dialColor.find((o) => o.id === config.dialColor)?.color || "#0a0a0a";
  const strapC = options.strapColor.find((o) => o.id === config.strapColor)?.color || "#0a0a0a";
  const glassLabel = options.glass.find((o) => o.id === config.glass)?.label || "";
  const movLabel = options.movement.find((o) => o.id === config.movement)?.label || "";

  return (
    <section id="configurator" className="py-32 bg-[#0a0a0a]" aria-label="Watch configurator">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="section-label mb-4">Personalise Yours</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
            Build Your <span className="gold-text italic">Timepiece</span>
          </h2>
          <p className="text-[var(--text-muted)] font-light max-w-xl mx-auto">
            Configure every detail of your Urbano Silverio. Each combination is unique — just like you.
          </p>
          <div className="divider-gold mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Watch Preview */}
          <div className="flex items-center justify-center sticky top-32">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-20 transition-all duration-700"
                style={{ background: caseC }}
                aria-hidden="true"
              />
              {/* Case */}
              <div
                className="watch-preview-case absolute inset-0 rounded-full transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse at 35% 30%, ${caseC}dd, ${caseC}88)`,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.1), 0 0 40px ${caseC}20`,
                }}
              />
              {/* Bezel */}
              <div
                className="absolute inset-3 rounded-full"
                style={{ background: `linear-gradient(135deg, ${caseC}ff, ${caseC}88, ${caseC}cc)`, boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)" }}
              />
              {/* Dial */}
              <div
                className="watch-preview-dial absolute inset-6 rounded-full flex items-center justify-center transition-all duration-700"
                style={{ background: `radial-gradient(ellipse at 40% 35%, ${dialC}ee, ${dialC})`, boxShadow: "inset 0 4px 12px rgba(0,0,0,0.8)" }}
              >
                {/* Hour markers */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i / 12) * 360;
                  return (
                    <div key={i} className="absolute" style={{
                      width: i % 3 === 0 ? "3px" : "1.5px",
                      height: i % 3 === 0 ? "10px" : "6px",
                      background: caseC,
                      top: "10px", left: "50%",
                      transformOrigin: "50% calc(50% + 58px)",
                      transform: `translateX(-50%) rotate(${angle}deg)`,
                    }} />
                  );
                })}
                <div className="absolute top-1/3 text-center">
                  <div className="font-display text-[0.4rem] tracking-[0.2em]" style={{ color: caseC }}>URBANO SILVERIO</div>
                  <div className="font-display text-[0.3rem] tracking-widest text-white/30 mt-0.5">{movLabel}</div>
                </div>
                {/* Hands */}
                <div className="absolute w-0.5 rounded-full origin-bottom" style={{ height: "32%", bottom: "50%", left: "calc(50% - 1px)", background: caseC, transform: "rotate(-30deg)" }} />
                <div className="absolute rounded-full origin-bottom" style={{ width: "1px", height: "40%", bottom: "50%", left: "calc(50% - 0.5px)", background: "#fff", transform: "rotate(120deg)" }} />
                <div className="absolute w-2 h-2 rounded-full" style={{ background: caseC, top: "calc(50% - 4px)", left: "calc(50% - 4px)" }} />
              </div>
              {/* Strap */}
              <div
                className="watch-preview-strap absolute left-1/2 -translate-x-1/2 w-14 rounded-t-sm transition-all duration-700"
                style={{ background: strapC, top: "-40px", height: "48px" }}
              />
              <div
                className="watch-preview-strap absolute left-1/2 -translate-x-1/2 w-14 rounded-b-sm transition-all duration-700"
                style={{ background: strapC, bottom: "-40px", height: "48px" }}
              />
            </div>

            {/* Config summary */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-16 glass-card px-4 py-2 rounded text-center min-w-[200px]">
              <div className="section-label opacity-60 text-[0.6rem] mb-1">Your Configuration</div>
              <div className="text-xs text-[var(--silver)] font-light">{glassLabel} · {movLabel}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-8">
            {/* Case Color */}
            <div>
              <div className="section-label mb-3">Case Finish</div>
              <div className="flex gap-3 flex-wrap">
                {options.caseColor.map((o) => (
                  <Swatch key={o.id} item={o} selected={config.caseColor === o.id} onClick={(v) => set("caseColor", v)} isColor />
                ))}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-2">{options.caseColor.find(o => o.id === config.caseColor)?.label}</div>
            </div>

            {/* Dial Color */}
            <div>
              <div className="section-label mb-3">Dial Colour</div>
              <div className="flex gap-3 flex-wrap">
                {options.dialColor.map((o) => (
                  <Swatch key={o.id} item={o} selected={config.dialColor === o.id} onClick={(v) => set("dialColor", v)} isColor />
                ))}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-2">{options.dialColor.find(o => o.id === config.dialColor)?.label}</div>
            </div>

            {/* Strap Type */}
            <div>
              <div className="section-label mb-3">Strap Type</div>
              <div className="flex gap-2 flex-wrap">
                {options.strapType.map((o) => (
                  <Swatch key={o.id} item={o} selected={config.strapType === o.id} onClick={(v) => set("strapType", v)} isColor={false} />
                ))}
              </div>
            </div>

            {/* Strap Color */}
            <div>
              <div className="section-label mb-3">Strap Colour</div>
              <div className="flex gap-3 flex-wrap">
                {options.strapColor.map((o) => (
                  <Swatch key={o.id} item={o} selected={config.strapColor === o.id} onClick={(v) => set("strapColor", v)} isColor />
                ))}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-2">{options.strapColor.find(o => o.id === config.strapColor)?.label}</div>
            </div>

            {/* Glass */}
            <div>
              <div className="section-label mb-3">Crystal Glass</div>
              <div className="flex gap-2 flex-wrap">
                {options.glass.map((o) => (
                  <Swatch key={o.id} item={o} selected={config.glass === o.id} onClick={(v) => set("glass", v)} isColor={false} />
                ))}
              </div>
            </div>

            {/* Movement */}
            <div>
              <div className="section-label mb-3">Movement</div>
              <div className="flex gap-2 flex-wrap">
                {options.movement.map((o) => (
                  <Swatch key={o.id} item={o} selected={config.movement === o.id} onClick={(v) => set("movement", v)} isColor={false} />
                ))}
              </div>
            </div>

            <button
              className="btn-gold mt-4"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Request This Configuration
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
