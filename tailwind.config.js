module.exports = {
  content: [
    "./src/pages/**/**{.js,.ts,.jsx,tsx}",
    "./src/components/**/**{.js,.ts,.jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          100: "#9c9ba3",
          200: "#74727c",
          300: "#706d6d",
          400: "#645c67",
          500: "#3c3c4a",
          600: "#630303",
          700: "#4b0202",
          800: "#290101",
          900: "#320101"
        },
        dark: {
          100: "#171f19",
          200: "#121b13",
          300: "#0b110c",
          400: "#080c08",
        },
        light: {
          100: "#ffffff",
          200: "#FBFFFB",
          300: "#eafcf1",
          400: "#F0FBF0",
          500: "#ececec",
          600: "#7f8a7f",
        },
      },
    },
  },
  plugins: [],
};
