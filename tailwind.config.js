module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway'],
        kosugimaru: ['Kosugi Maru'],
        azeretmono: ['Azeret Mono'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
