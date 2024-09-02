import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // classicTrustworthy: {
        //   primary: "#001f3f",
        //   secondary: "#d3d3d3",
        //   accent: "#ff851b",
        //   neutral: "#ffffff",
        //   text: "#333333",
        //   bg: "#f0f0f0",
        //   highlight: "#ff851b",
        //   disabled: "#d3d3d3",
        // },
        // modernMinimalist: {
        primary: "#333333",
        secondary: "#7fdbff",
        accent: "#01ff70",
        neutral: "#ffffff",
        text: "#333333",
        bg: "#f0f0f0",
        highlight: "#01ff70",
        disabled: "#7fdbff",
        // },
        // professionalCalming: {
        //   primary: "#008080",
        //   secondary: "#f5f5f5",
        //   accent: "#ff7f50",
        //   neutral: "#ffffff",
        //   text: "#333333",
        //   bg: "#e0ffff",
        //   highlight: "#ff7f50",
        //   disabled: "#f5f5f5",
        // },
        // vibrantEnergetic: {
        //   primary: "#4169e1",
        //   secondary: "#ffd700",
        //   accent: "#ff4500",
        //   neutral: "#ffffff",
        //   text: "#333333",
        //   bg: "#fafad2",
        //   highlight: "#ff4500",
        //   disabled: "#ffd700",
        // },
        // elegantSophisticated: {
        //   primary: "#800020",
        //   secondary: "#fffdd0",
        //   accent: "#ffd700",
        //   neutral: "#ffffff",
        //   text: "#333333",
        //   bg: "#f5f5f5",
        //   highlight: "#ffd700",
        //   disabled: "#fffdd0",
        // },
        // freshNatural: {
        //   primary: "#228b22",
        //   secondary: "#f5f5dc",
        //   accent: "#87ceeb",
        //   neutral: "#ffffff",
        //   text: "#333333",
        //   bg: "#e0f0d8",
        //   highlight: "#87ceeb",
        //   disabled: "#f5f5dc",
        // },
      },
      keyframes: {
        loginBgShrink: {
          "0%": {
            width: "100%",
            margin: "0",
            borderRadius: "0",
          },
          "100%": {
            width: "calc(50% - 2em)",
            margin: "1em",
            borderRadius: "0.5rem",
          },
        },
        loginLoaderGrow: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "50%",
          },
        },
        loginLoaderAppear: {
          "0%": {
            opacity: "0",
            transform: "scale(0.3)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        loginFormSlide: {
          "0%": {
            opacity: "0.3",
            transform: "translateX(-10%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        loginWidthGrow: {
          "0%": {
            opacity: "0",
            transform: "scale(0)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "login-bg-shrink": "loginBgShrink 1s ease-in forwards",
        "login-loader-grow": "loginLoaderGrow 1s ease-in forwards",
        "login-loader-appear": "loginLoaderAppear 1s ease-in forwards",
        "login-form-slide": "loginFormSlide 0.4s ease-in forwards",
        "login-width-grow": "loginWidthGrow 0.4s ease-in forwards",
        "drawer-arrow-grow": "loginLoaderAppear 0.2s ease-in forwards",
        "dropdown-appear-grow": "loginWidthGrow 0.2s ease-in forwards",
      },
    },
  },
  plugins: [],
};
export default config;
