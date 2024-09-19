import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/preline/preline.js',
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
    flowbite.plugin(),
  ],
};
export default config;


