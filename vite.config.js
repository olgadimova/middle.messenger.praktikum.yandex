import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    handlebars({
      context: {},
    }),
  ],
});
