import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "2xs": "0.625rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        didesa: "url('/images/wallpaper.jpg')",
      },
      colors: {
        primary: "#71CFB9",
        secondary: "#FAC441",
        tertiary: "#556080",
      },
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        typography: ["Typography", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      keyframes: {
        'bounce-in-right': {
          '0%': { opacity: "0", transform: 'translateX(100%)' },
          '60%': { opacity: "1", transform: 'translateX(-20px)' },
          '80%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        'shift-up': {
          '0%': { transform: 'translateY(0)', easing: 'ease-in-out' },
          '100%': { transform: 'translateY(-100%)', easing: 'ease-in-out' },
        },
      },
      animation: {
        'bounce-in-right': 'bounce-in-right 0.5s ease-in-out',
        'shift-up': 'shift-up 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
