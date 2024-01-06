import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      // screens: {
      //   tablet: "640px",
      //   // => @media (min-width: 640px) { ... }

      //   laptop: "1024px",
      //   // => @media (min-width: 1024px) { ... }

      //   desktop: "1280px",
      //   // => @media (min-width: 1280px) { ... }
      // },
      colors: {
        primary: "#82b440",
        navBg: "#4082c7",
        textPrimary: "#111111",
        blackColor: "#000000e6",
        activeColor: "#82C740",
        errorColor: "#ef4444",
      },
      spacing: {
        "12": "grid-template-rows: repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
