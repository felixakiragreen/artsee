// const { tailwindConfig } = require("@f*g/felix")

// console.log("tailwindConfig", JSON.stringify(tailwindConfig, null, 2))

const tailwindConfig = {
  grey: {
    "100": "#f5f5ef",
    "200": "#ebebe2",
    "300": "#d3d4c9",
    "400": "#aaaba0",
    "500": "#7f8076",
    "600": "#53544c",
    "700": "#2a2b26",
    "800": "#141411",
    "900": "#0a0a09",
  },
  red: {
    "100": "#ffecfa",
    "200": "#ffa3d6",
    "300": "#fc64a1",
    "400": "#ed3467",
    "500": "#cb1d37",
    "600": "#a11420",
    "700": "#710e15",
    "800": "#470a0d",
    "900": "#290607",
  },
  orange: {
    "100": "#fff6e9",
    "200": "#fed7a8",
    "300": "#fcb760",
    "400": "#f1901d",
    "500": "#cb6709",
    "600": "#9e490c",
    "700": "#75330f",
    "800": "#50240f",
    "900": "#2f150d",
  },
  yellow: {
    "100": "#f2f2de",
    "200": "#f3f1b0",
    "300": "#f5ea7e",
    "400": "#f7dd4b",
    "500": "#f8cb1b",
    "600": "#c6930b",
    "700": "#8f5c07",
    "800": "#5f3906",
    "900": "#371f05",
  },
  green: {
    "100": "#e8ead8",
    "200": "#e4efab",
    "300": "#cfed6d",
    "400": "#a5e22c",
    "500": "#6fbf10",
    "600": "#3f9608",
    "700": "#1e6e08",
    "800": "#0c4a07",
    "900": "#052907",
  },
  blue: {
    "100": "#e5f6f8",
    "200": "#a9eaf4",
    "300": "#70dbef",
    "400": "#38bce6",
    "500": "#0f8fd0",
    "600": "#0362b2",
    "700": "#013f8c",
    "800": "#002662",
    "900": "#001336",
  },
  purple: {
    "100": "#f0e6f9",
    "200": "#ccbdf9",
    "300": "#b29af8",
    "400": "#9f7af2",
    "500": "#8659e1",
    "600": "#643bc0",
    "700": "#442294",
    "800": "#271163",
    "900": "#120639",
  },
  gray: {
    "100": "#f5f5ef",
    "200": "#ebebe2",
    "300": "#d3d4c9",
    "400": "#aaaba0",
    "500": "#7f8076",
    "600": "#53544c",
    "700": "#2a2b26",
    "800": "#141411",
    "900": "#0a0a09",
  },
  white: {
    DEFAULT: "#ffffff",
  },
  black: {
    DEFAULT: "#000000",
  },
  felix: {
    DEFAULT: "#adff2f",
  },
  indigo: {
    DEFAULT: "#5400fc",
  },
  teal: {
    DEFAULT: "#6a8494",
  },
  vulcan: {
    DEFAULT: "#11141c",
  },
  mirage: {
    DEFAULT: "#151a25",
  },
}

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...tailwindConfig,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
