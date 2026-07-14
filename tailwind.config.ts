import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        carbon: "#0D0D0F",
        "carbon-raised": "#141416",
        bone: "#F4F2ED",
        ember: "#FF3D2E",
        chrome: "#C9CCD1",
        graphite: "#6B6E73",
        line: "#1F2023",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
    },
  },
  plugins: [],
};
export default config;
