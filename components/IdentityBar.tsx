"use client";

import { motion } from "framer-motion";

const plates = [
  {
    label: "Software Engineer",
    value: 70,
    height: 96,
    color: "#F4F2ED",
  },
  {
    label: "Entrepreneur",
    value: 20,
    height: 68,
    color: "#C9CCD1",
  },
  {
    label: "Bodybuilder",
    value: 10,
    height: 44,
    color: "#FF3D2E",
  },
];

export default function IdentityBar() {
  return (
    <section className="w-full px-6 sm:px-10 py-24 sm:py-32 border-t border-line">
      <p className="font-mono text-xs uppercase tracking-widest2 text-graphite mb-14">
        The Load — how the work breaks down
      </p>

      <div className="flex items-end gap-6 sm:gap-12">
        {/* barbell shaft */}
        <div className="hidden sm:block flex-1 h-[3px] bg-line mb-6 relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="absolute inset-0 bg-chrome"
          />
        </div>

        <div className="flex items-end gap-8 sm:gap-14">
          {plates.map((plate, i) => (
            <div key={plate.label} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="font-display text-3xl sm:text-4xl mb-3"
                style={{ color: plate.color }}
              >
                {plate.value}%
              </motion.div>

              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  delay: 0.2 + i * 0.15,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  height: plate.height,
                  width: 14 + i * 4,
                  background: plate.color,
                  originY: 1,
                }}
                className="rounded-[2px]"
              />

              <span className="mt-4 font-mono text-[10px] sm:text-xs uppercase tracking-wide text-graphite text-center max-w-[6rem] sm:max-w-none">
                {plate.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
