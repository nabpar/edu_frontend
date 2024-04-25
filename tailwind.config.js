/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width:{
        15: "3.8rem",
      },
      // colors:{
      //   blue: "#2980b9",
      // },
      backgroundImage: {
        // hero: "url('./assets/eduA.jpg')",
        // edu: "url('./assets/edulogo.png')",
        'reading':"url('./assets/Readingimg.jpg')",
      },
      fontFamily:{
        montserrat:["'Montserrat'", 'sans-serif;']
      }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
