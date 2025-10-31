/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#010101ff", // اللون الأساسي
          light: "#3B82F6",   // درجة فاتحة
          dark: "#1E3A8A",    // درجة غامقة
        },
        secondary: {
          DEFAULT: "#ef6b05ff", // لون ثانوي أساسي
          light: "#ef6b05ff",   // درجة فاتحة
          dark: "#B45309",    // درجة غامقة
        },
      },
    },
  },
  plugins: [],
}

