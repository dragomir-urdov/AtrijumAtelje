const plugin = require("tailwindcss/plugin");

/**
 * Disable hover effect on mobile devices.
 */
const betterHover = plugin(function ({ addVariant, e, postcss }) {
  addVariant("hover", ({ container, separator }) => {
    const hoverRule = postcss.atRule({
      name: "media",
      params: "(hover: hover)",
    });

    hoverRule.append(container.nodes);
    container.append(hoverRule);
    hoverRule.walkRules((rule) => {
      rule.selector = `.${e(`hover${separator}${rule.selector.slice(1)}`)}:hover`;
    });
  });
});

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        sandstone: {
          DEFAULT: "#786C5E",
          50: "#CEC7C0",
          100: "#C5BDB5",
          200: "#B3A99E",
          300: "#A19587",
          400: "#8F8170",
          500: "#786C5E",
          600: "#595045",
          700: "#39332D",
          800: "#1A1714",
          900: "#000000",
        },
        "copper-rose": {
          DEFAULT: "#9E6E69",
          50: "#E6DAD8",
          100: "#DECECC",
          200: "#CEB6B3",
          300: "#BE9E9B",
          400: "#AE8682",
          500: "#9E6E69",
          600: "#7E5551",
          700: "#5C3E3B",
          800: "#3A2725",
          900: "#17100F",
        },
      },
    },
    fontFamily: {
      primary: ["Lato", "Helvetica", "sans-serif"],
      secondary: ['"EM Didot"', "Times", '"Times New Roman"', "serif"],
    },
  },
  plugins: [require("@tailwindcss/forms"), betterHover],
};
