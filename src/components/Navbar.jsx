import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const links = [
  { href: "#collections", label: "Collections" },
  { href: "#craftsmanship", label: "Craftsmanship" },
  { href: "#featured", label: "USQZ01" },
  { href: "#heritage", label: "Heritage" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark py-3 luxury-shadow" : "py-6 bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, "#hero")}
          className="flex flex-col leading-none"
          aria-label="Urbano Silverio home"
        >
          <span className="font-display text-xl font-light tracking-[0.3em] text-white">URBANO</span>
          <span className="font-display text-xl font-light tracking-[0.3em] gold-text">SILVERIO</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <a key={href} href={href} onClick={(e) => scrollTo(e, href)} className="nav-link">
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => scrollTo(e, "#contact")}
          className="hidden md:inline-flex btn-gold text-xs py-2.5 px-5"
        >
          Enquire Now
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-dark border-t border-gold/10 px-6 py-6 flex flex-col gap-5">
          {links.map(({ href, label }) => (
            <a key={href} href={href} onClick={(e) => scrollTo(e, href)} className="nav-link text-base">
              {label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => scrollTo(e, "#contact")} className="btn-gold text-center mt-2">
            Enquire Now
          </a>
        </div>
      )}
    </nav>
  );
}
