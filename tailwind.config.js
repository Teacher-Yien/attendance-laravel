/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.tsx",
    "./resources/js/**/*.ts",
    "./resources/js/**/*.jsx",
    "./resources/js/**/*.vue",
    "./node_modules/flowbite/**/*.js" // <--- Important!
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // <--- Add this
  ],
};
