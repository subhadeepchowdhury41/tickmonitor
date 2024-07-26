import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
