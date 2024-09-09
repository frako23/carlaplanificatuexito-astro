/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        grey: "#c2c5cc",
        middleBlue: "#8dd9cc",
        darkBlue: "#23284f",
        // yellow: "#e1ad01",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
