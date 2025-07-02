import "../src/styles/global.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "Light",
    values: [
      { name: "Light", value: "#F9F9F9" },
      { name: "Dark", value: "#333333" }
    ]
  }
};
