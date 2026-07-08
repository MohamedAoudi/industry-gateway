/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#08973f",    
          primary: "#10862a", 
          light: "#F8FAFC",   
          accent: "#76f63b", 
        }
      },
      borderRadius: {
        'portal': '1.5rem', // زوايا دائرية موحدة للبطاقات
      }
    },
  },
  plugins: [],
};