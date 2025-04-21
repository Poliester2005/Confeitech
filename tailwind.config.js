/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Winky Rough"', 'sans-serif'], // torna a fonte padrão
      },
      colors: {
        'backGround': '#FFC0C0',
        'button': '#ED6565',
        'card':'#481F1F',    // Tiffany blue
      }
    }  },
  plugins: [],
}
