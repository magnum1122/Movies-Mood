/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
     colors: {
          // primary: "#1A0000",
          primary: "#420200",
          ui_50:  "#FEF2F2",
          ui_100: "#FFE2E2",
          ui_200: "#FFC9C9",
          ui_300: "#FFA2A2",
          ui_400: "#FF6467",
          ui_500: "#FB2C36",
          ui_600: "#E7180B",
          ui_700: "#C11007",
          ui_800: "#9F0712",
          ui_900: "#82181A",
          ui_950: "#460809",
          "white-45": "rgba(255,255,255,0.45)",
          "white-70": "rgba(255,255,255,0.70)",
          "white-90": "rgba(255,255,255,0.90)"
        }
    },
  },
  plugins: [],
}