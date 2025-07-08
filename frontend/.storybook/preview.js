import "@fontsource/cairo-play/400.css";
import "@fontsource/cairo-play/500.css";
import "@fontsource/cairo-play/600.css";
import "@fontsource/cairo-play/700.css";
import "@fontsource/anta/400.css";
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
