const sitePalette = {
  50: "#ECFCFF",
  100: "#D0F6FF",
  200: "#A1EDFF",
  300: "#63E1FA",
  400: "#2AD5F5",
  500: "#00C9F2",
  600: "#00C9F2",
  700: "#007A94",
  800: "#006176",
  900: "#004C5D",
  950: "#00313D",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Tahoma', 'Arial', 'sans-serif'],
        arabic: ['Cairo', 'Tahoma', 'Arial', 'sans-serif'],
      },
      colors: {
        emerald: sitePalette,
        green: sitePalette,
        teal: sitePalette,
        lime: sitePalette,
        brand: {
          dark: sitePalette[700],
          primary: "#00C9F2",
          light: "#F8FAFC",   
          accent: sitePalette[400],
        }
      },
      borderRadius: {
        'portal': '1.5rem', // زوايا دائرية موحدة للبطاقات
      }
    },
  },
  plugins: [],
};
