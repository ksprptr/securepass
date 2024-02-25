/** @type {import('tailwindcss').Config} */

/**
 * Config
 */
const config = {
  colors: {
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    danger: "#ef4444",
    dangerHover: "#dc2626"
  },
}

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': config.colors.primary,
        'primaryHover': config.colors.primaryHover,
        'danger': config.colors.danger,
        'dangerHover': config.colors.dangerHover,
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
