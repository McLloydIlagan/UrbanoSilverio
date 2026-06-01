export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/UrbanoSilverio/logo.png" alt="Urbano Silverio" className="h-10 w-10 object-contain" />
              <div>
                <div className="font-display text-lg font-light tracking-[0.25em] text-white">URBANO</div>
                <div className="font-display text-lg font-light tracking-[0.25em] gold-text">SILVERIO</div>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-xs font-light leading-relaxed max-w-xs">
              Crafting exceptional timepieces since 2008. Every watch is a testament to the enduring art of Swiss-inspired horology.
            </p>
            <div className="mt-4 section-label opacity-40">Est. 2008 · Geneva</div>
          </div>

          {/* Collections */}
          <div>
            <div className="section-label mb-5">Collections</div>
            <ul className="space-y-3">
              {["Classic", "Chronograph", "Heritage", "Executive", "USQZ01"].map((c) => (
                <li key={c}>
                  <button onClick={() => scrollTo("collections")}
                    className="text-[var(--text-muted)] text-xs font-light hover:text-[var(--gold)] transition-colors duration-300 tracking-wide">
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="section-label mb-5">Company</div>
            <ul className="space-y-3">
              {[
                { label: "About Us", id: "heritage" },
                { label: "Craftsmanship", id: "craftsmanship" },
                { label: "Heritage", id: "heritage" },
                { label: "Contact", id: "contact" },
              ].map(({ label, id }) => (
                <li key={label}>
                  <button onClick={() => scrollTo(id)}
                    className="text-[var(--text-muted)] text-xs font-light hover:text-[var(--gold)] transition-colors duration-300 tracking-wide">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <div className="section-label mb-5">Support</div>
            <ul className="space-y-3">
              {["Warranty", "Service & Repair", "Authorized Dealers", "Privacy Policy", "Terms of Use"].map((item) => (
                <li key={item}>
                  <span className="text-[var(--text-muted)] text-xs font-light tracking-wide cursor-pointer hover:text-[var(--gold)] transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[var(--text-muted)] text-xs font-light">
            © {year} Urbano Silverio. All rights reserved.
          </div>
          <div className="text-[var(--text-muted)] text-xs font-light italic">
            "Crafted for Those Who Value Time."
          </div>
        </div>
      </div>
    </footer>
  );
}
