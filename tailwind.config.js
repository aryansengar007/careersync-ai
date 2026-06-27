/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sync: {
          indigo: "#6C63FF",
          blue: "#3B82F6",
          purple: "#A78BFA",
          ink: "#1E1B4B",
          amber: "#F59E0B",
          paper: "#F8F7FC",
          mist: "#EFEDFB",
          line: "#E4E1F5",
        },
      },
      fontFamily: {
        display: ["'Clash Display'", "'Sora'", "ui-sans-serif", "system-ui"],
        body: ["'Inter'", "ui-sans-serif", "system-ui"],
        mono: ["'DM Mono'", "ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(30, 27, 75, 0.10)",
        "glass-lg": "0 20px 60px -10px rgba(30, 27, 75, 0.18)",
        "glow-indigo": "0 0 40px -5px rgba(108, 99, 255, 0.45)",
        "glow-amber": "0 0 30px -5px rgba(245, 158, 11, 0.45)",
        soft: "0 2px 20px rgba(30, 27, 75, 0.06)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 14s ease-in-out infinite",
        "float-delay": "float 10s ease-in-out infinite 2s",
        spark: "spark 2.4s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marqueeReverse 32s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-22px) translateX(10px)" },
        },
        spark: {
          "0%, 100%": { opacity: 0.4, transform: "scale(0.9)" },
          "50%": { opacity: 1, transform: "scale(1.15)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0px rgba(108,99,255,0.0)" },
          "50%": { boxShadow: "0 0 50px rgba(108,99,255,0.35)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      backgroundImage: {
        "sync-gradient": "linear-gradient(135deg, #6C63FF 0%, #3B82F6 50%, #A78BFA 100%)",
        "sync-radial": "radial-gradient(circle at 30% 20%, rgba(108,99,255,0.25), transparent 60%)",
      },
    },
  },
  plugins: [],
};
