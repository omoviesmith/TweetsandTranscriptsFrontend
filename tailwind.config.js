/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EDB018",
      },
    },
  },
  plugins: [
    // https://github.com/tailwindlabs/tailwindcss-forms
    require("@tailwindcss/forms"),
  ],
};
