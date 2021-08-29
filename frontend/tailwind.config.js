const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        ...(() => {
          const list = {};
          for (let index = 0; index < 1000; index++) {
            list[index] = `${index}px`;
          }
          return list;
        })(),
      },
      minHeight: {
        ...(() => {
          const list = {};
          for (let index = 0; index < 1000; index++) {
            list[index] = `${index}px`;
          }
          return list;
        })(),
      },
      width: {
        ...(() => {
          const list = {};
          for (let index = 0; index < 1000; index++) {
            list[index] = `${index}px`;
          }
          return list;
        })(),
      },
      height: {
        ...(() => {
          const list = {};
          for (let index = 0; index < 1000; index++) {
            list[index] = `${index}px`;
          }
          return list;
        })(),
      },
      borderRadius: {
        ...(() => {
          const list = {};
          for (let index = 0; index < 100; index++) {
            list[index] = `${index}px`;
          }
          return list;
        })(),
      },
      colors: (theme) => ({
        ...theme.colors,
        transparent: "transparent",
        current: "currentColor",
        gray: {
          light: "#EEEEEE",
          DEFAULT: "#DDDDDD",
        },
        white: {
          dark2: "#F0F0F0",
          dark: "#F4F4F4",
          DEFAULT: "#ffffff",
        },
      }),
      fontFamily: {
        inter: [
          "Inter, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        ],
        cabin: [
          "Cabin, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        ],
      },
      fontSize: {
        ...(() => {
          const list = {};
          for (let index = 0; index < 100; index++) {
            list[index] = `${index}px`;
          }
          return list;
        })(),
      },
      boxShadow: (theme) => ({
        ...theme.boxShadow,
        "lg-light": "0px 10px 10px rgba(0, 0, 0, 0.04);",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ...(() => {
          const list = {};
          for (let index = 0; index < 1000; index++) {
            // for pending

            list[`.cl-${index}`] = {
              left: `${index}px`,
            };
            list[`.cr-${index}`] = {
              right: `${index}px`,
            };
            list[`.ct-${index}`] = {
              top: `${index}px`,
            };
            list[`.cb-${index}`] = {
              bottom: `${index}px`,
            };

            list[`.-cl-${index}`] = {
              left: `-${index}px`,
            };
            list[`.-cr-${index}`] = {
              right: `-${index}px`,
            };
            list[`.-ct-${index}`] = {
              top: `-${index}px`,
            };
            list[`.-cb-${index}`] = {
              bottom: `-${index}px`,
            };
          }
          for (let index = 0; index < 500; index++) {
            // for line height
            list[`.lh-${index}`] = {
              "line-height": `${index}px`,
            };
            // for pending
            list[`.p-${index}`] = {
              "padding-left": `${index}px`,
              "padding-right": `${index}px`,
              "padding-top": `${index}px`,
              "padding-bottom": `${index}px`,
            };
            list[`.pl-${index}`] = {
              "padding-left": `${index}px`,
            };
            list[`.pr-${index}`] = {
              "padding-right": `${index}px`,
            };
            list[`.pt-${index}`] = {
              "padding-top": `${index}px`,
            };
            list[`.pb-${index}`] = {
              "padding-bottom": `${index}px`,
            };
            list[`.px-${index}`] = {
              "padding-left": `${index}px`,
              "padding-right": `${index}px`,
            };
            list[`.py-${index}`] = {
              "padding-top": `${index}px`,
              "padding-bottom": `${index}px`,
            };

            // for margin
            list[`.m-${index}`] = {
              "margin-left": `${index}px`,
              "margin-right": `${index}px`,
              "margin-top": `${index}px`,
              "margin-bottom": `${index}px`,
            };
            list[`.ml-${index}`] = {
              "margin-left": `${index}px`,
            };
            list[`.mr-${index}`] = {
              "margin-right": `${index}px`,
            };
            list[`.mt-${index}`] = {
              "margin-top": `${index}px`,
            };
            list[`.mb-${index}`] = {
              "margin-bottom": `${index}px`,
            };
            list[`.mx-${index}`] = {
              "margin-left": `${index}px`,
              "margin-right": `${index}px`,
            };
            list[`.my-${index}`] = {
              "margin-top": `${index}px`,
              "margin-bottom": `${index}px`,
            };
          }
          return list;
        })(),
      };
      addUtilities(newUtilities, []);
    }),
  ],
};
