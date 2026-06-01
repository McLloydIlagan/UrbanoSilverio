import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brandData, dealers } from "../data/watchData";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-col", {
        opacity: 0, y: 40, stagger: 0.2, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputClass = "w-full bg-[#111] border border-white/10 text-white text-sm font-light px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--gold)]/50 transition-colors duration-300 placeholder:text-[var(--text-muted)]";

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-[#080808] relative overflow-hidden" aria-label="Contact and retail">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="section-label mb-4">Get In Touch</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
            Visit Our <span className="gold-text italic">Atelier</span>
          </h2>
          <div className="divider-gold mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="contact-col space-y-8">
            <div>
              <div className="section-label mb-6">Contact</div>
              <div className="space-y-4">
                {[
                  { icon: FaEnvelope, label: "Email", value: brandData.email, href: `mailto:${brandData.email}` },
                  { icon: FaPhone, label: "Phone", value: brandData.phone, href: `tel:${brandData.phone}` },
                  { icon: FaMapMarkerAlt, label: "Address", value: brandData.address, href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <div className="w-8 h-8 glass-card rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={12} className="text-[var(--gold)]" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="section-label opacity-50 mb-0.5">{label}</div>
                      {href ? (
                        <a href={href} className="text-[var(--silver)] text-sm font-light hover:text-[var(--gold)] transition-colors duration-300">{value}</a>
                      ) : (
                        <span className="text-[var(--silver)] text-sm font-light">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <div className="section-label mb-4">Follow Us</div>
              <div className="flex gap-3">
                {[
                  { icon: FaInstagram, label: "Instagram", href: "#" },
                  { icon: FaXTwitter, label: "X / Twitter", href: "#" },
                  { icon: FaFacebook, label: "Facebook", href: "#" },
                  { icon: FaYoutube, label: "YouTube", href: "#" },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label}
                    className="w-9 h-9 glass-card rounded-sm flex items-center justify-center text-[var(--silver)] hover:text-[var(--gold)] hover:border-[var(--gold)]/30 transition-all duration-300">
                    <Icon size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Dealers */}
            <div>
              <div className="section-label mb-4">Authorized Dealers</div>
              <div className="space-y-3">
                {dealers.map((d) => (
                  <div key={d.city} className="glass-card p-3 rounded-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-white text-sm font-light">{d.name}</div>
                        <div className="text-[var(--text-muted)] text-xs mt-0.5">{d.address}</div>
                      </div>
                      <div className="section-label opacity-50 text-right">
                        <div>{d.city}</div>
                        <div>{d.country}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-col lg:col-span-2">
            <div className="section-label mb-6">Send an Enquiry</div>
            {sent ? (
              <div className="glass-card p-8 rounded-sm text-center">
                <div className="font-display text-3xl gold-text mb-3">Thank You</div>
                <p className="text-[var(--silver)] font-light">Your enquiry has been received. A member of our team will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="section-label opacity-50 block mb-2">Full Name</label>
                    <input id="name" type="text" required placeholder="Your name" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="section-label opacity-50 block mb-2">Email Address</label>
                    <input id="email" type="email" required placeholder="your@email.com" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="section-label opacity-50 block mb-2">Subject</label>
                  <select id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={inputClass} style={{ appearance: "none" }}>
                    <option value="">Select a subject</option>
                    <option>Purchase Enquiry</option>
                    <option>Custom Configuration</option>
                    <option>Warranty & Service</option>
                    <option>Dealer Enquiry</option>
                    <option>Press & Media</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="section-label opacity-50 block mb-2">Message</label>
                  <textarea id="message" rows={5} required placeholder="Tell us about your enquiry..." value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass + " resize-none"} />
                </div>
                <button type="submit" className="btn-gold w-full justify-center">
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
