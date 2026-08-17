import { ContactForm } from "@/components/pages/contactContent";
import React from "react";
import { FiTerminal } from "react-icons/fi";

export const metadata = {
  title: "Contact | Lukwago Joel",
  description: "Initiate contact for full-stack engineering and project inquiries.",
};

export default function ContactPage() {
  const email = "contact@lukwagojoel.com";
  const phone = "+256700000000";
  const formattedPhone = "+256 700 000 000";

  return (
    <section className="relative min-h-screen w-full bg-black text-white font-mono overflow-hidden pt-28 pb-20 px-6 sm:px-12 selection:bg-lime-400 selection:text-black">
      {/* Background Grid Guidelines */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-15">
        <div className="absolute top-0 bottom-0 left-6 sm:left-12 border-r border-white/20" />
        <div className="absolute top-0 bottom-0 right-6 sm:right-12 border-r border-white/20" />
        <div className="absolute top-1/3 left-0 right-0 border-b border-white/20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section (Server Rendered) */}
        <div className="space-y-4 pb-12 border-b border-white/10">
          <div className="flex items-center gap-2 text-lime-400 text-xs font-bold tracking-widest uppercase">
            <FiTerminal className="animate-pulse" />
            <span>[ 02 // TRANSMISSION PROTOCOL ]</span>
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter uppercase leading-none">
            INITIATE <br />
            <span className="text-transparent [ -webkit-text-stroke:1px_rgba(255,255,255,0.4) ]">
              CONTACT.
            </span>
          </h1>
        </div>

        {/* Client-Side Interactive Form */}
        <ContactForm
          email={email} 
          phone={phone} 
          formattedPhone={formattedPhone} 
        />
      </div>
    </section>
  );
}