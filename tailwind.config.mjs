/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        mocha: "#BE8A6F",          // PANTONE 17‑1230 Mocha Mousse :contentReference[oaicite:4]{index=4}
        peri: "#6667AB",           // PANTONE 17‑3938
        classic: "#0F4C81",        // PANTONE 19‑4057
        neutral: {
          50: "#FCFCFC",
          100: "#F9F9F9",
          900: "#333333"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },

    }
  },
  plugins: [require("@tailwindcss/forms")]
};
