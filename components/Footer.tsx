"use client";

import { Download, Mail, Phone } from "lucide-react";
import { FaGithub, FaWhatsapp } from "react-icons/fa6";
import { useState, useEffect } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);

      clearTimeout(timeout);
      timeout = setTimeout(() => setIsVisible(true), 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [lastScrollY]);

  const socialLinks = [
    { icon: <Mail size={18} />, href: "mailto:jjt200220@gmail.com", label: "Email" },
    { icon: <FaGithub size={18} />, href: "https://github.com/Lukwago-Joel-Jr", label: "GitHub" },
    { icon: <Phone size={18} />, href: "tel:+256706754002", label: "Phone" },
    { icon: <FaWhatsapp size={18} />, href: "https://wa.me/256706754002", label: "WhatsApp" },
  ];

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 z-50 bg-carbon/90 backdrop-blur border-t border-line transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="px-6 sm:px-10 py-4 flex justify-between items-center max-w-5xl mx-auto">
        <a
          href="#"
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-graphite hover:text-bone transition-colors focus-ring"
        >
          <Download size={16} />
          Download CV
        </a>
        <ul className="flex gap-5 text-graphite">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                aria-label={link.label}
                className="hover:text-ember transition-colors focus-ring inline-block"
              >
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
