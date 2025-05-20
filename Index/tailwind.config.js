/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  
    extend: {
      fontFamily: {
        // painters Diary
        eagle: ['"Eagle Lake"', 'cursive'],
        // the diary of every  artist
        cookie: ['"Cookie"', 'cursive'],
        // other button like home 
        playfair:['"Playfair Display"', 'serif'],
        quint:['"Quintessential"', 'cursive'],
        // the next  of innerse
        markazi:['"Markazi Text"', 'serif'],
        Carattere:["Carattere"],
        news: [ '"Newspaper"', 'serif'],
        dmserif:['"DM Serif Text"', 'serif'],
        Eagle: ["Eagle Lake"],
        Tapestary: ["Tapestry"],
        Carattere: ["Carattere"],
        Playfair: ["Playfair"],
        Funnel: ["Funnel Display"],
        Lora: ["'Lora'", "serif"],
        Poppins: ["'Poppins'", "sans-serif"],
        GreatVibes: ["GreatVibes"],
        Lato : ["Lato"],
        Quicksand:["Quicksand"],
        Lora:["Lora"],
        Montserrat:["Montserrat"],
        Protest:["Protest Revolution"],
        Quintessential:["Quintessential"],
        Markazi: ["Markazi Text", "serif"],
        DM:["DM Serif Text"],
        Newsreader:["Newsreader"],
        Unna:["Unna","Serif"],
        Create: ["Crete Round"],
        Upright: ["Cormorant Upright"],
        Lugrasimo:["Lugrasimo"],
        Nano:["Nano Serif"]
        
    },

   
    
    keyframes:{
      fadeIn:{
        '0%':{scale: '0'},
        '100%': {scale: '1'}
      }
    },
    animation: {
      fadeIn:' fadeIn 3s ease-in-out'
    }
,
    animation: {
      fadeIn: "fadeIn 2s ease-in-out",
      slideInUp: "slideInUp 0.8s ease-out",
     
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      slideInUp: {
        "0%": { transform: "translateY(20px)", opacity: 0 },
        "100%": { transform: "translateY(0)", opacity: 1 },
      },
    },

    },
  },
  plugins: [],
}     
