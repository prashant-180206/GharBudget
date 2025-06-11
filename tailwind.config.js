/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/**/**/**/*.{js,jsx,ts,tsx}",
    "./components/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        Txt: {
          DEFAULT: "#052224",
          secondary: "#0E3E3E",
          light: "#DFF7E2",
        },
        col_bg: {
          DEFAULT: "#E8FBEA",
          light: "#F1FFF3",
          dark: "#cFe7d2",
        },
        card: {
          1: "#B8F2E6", // light teal-green
          2: "#A5E8D0", // soft mint matching primary light
          3: "#D0F5EB", // subtle, airy green for clean look
          4: "#C2EFD5", // soft complementary green
        },

        heading: {
          DEFAULT: "#031314",
          secondary: "#0E3E3E",
        },
        button: {
          light: "#6DB6FE",
          dark: "#0068FF",
        },
        primary: {
          DEFAULT: "#00D09E", // Vibrant teal

          light: {
            DEFAULT: "#4BE1B9", // Soft teal
            100: "#A1F0DD", // Very light mint
            200: "#D2FBF1", // Pale mint-white
          },

          dark: {
            DEFAULT: "#007961", // Muted dark teal
            100: "#00594C", // Rich deep teal
            200: "#003F38", // Very dark green-teal
          },
        },

        success: "#75e28c",
        danger: "#ef7b51",
        accent: "#c7ef51",
      },
    },
  },
  plugins: [],
};
