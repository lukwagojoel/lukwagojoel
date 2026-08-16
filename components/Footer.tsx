"use client";

import { Download, Mail, Phone } from "lucide-react";
import { FaGithub, FaWhatsapp } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) setIsVisible(true);
      else if (currentScrollY > lastScrollY && currentScrollY > 50) setIsVisible(false);
      setLastScrollY(currentScrollY);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsVisible(true), 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener("scroll", handleScroll); clearTimeout(timeout); };
  }, [lastScrollY]);

  const socialLinks = [
    { icon: <Mail size={17} />, href: "mailto:me@lukwagojoel.com", label: "Email" },
    { icon: <FaGithub size={17} />, href: "https://github.com/lukwagojoel", label: "GitHub" },
    { icon: <Phone size={17} />, href: "tel:+256706754002", label: "Phone" },
    { icon: <FaWhatsapp size={17} />, href: "https://wa.me/256706754002", label: "WhatsApp" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.footer
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 380, damping: 40 }}
          className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-5"
        >
          {/* iOS floating dock style */}
          <div className="flex items-center gap-2 bg-carbon/80 backdrop-blur-2xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl max-w-sm w-full sm:w-auto">
            {/* CV download */}
            <a
              href="#"
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-graphite hover:text-bone transition-colors px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 flex-shrink-0"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Download CV</span>
              <span className="sm:hidden">CV</span>
            </a>

            <div className="w-px h-6 bg-white/10 mx-1" />

            {/* Social icons */}
            <ul className="flex items-center gap-1 flex-1 justify-end">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-label={link.label}
                    className="w-9 h-9 flex items-center justify-center rounded-xl text-graphite hover:text-ember hover:bg-white/5 transition-colors"
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
};

export default Footer;