import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


module.exports = {
  env: {
    node: true, // This enables Node.js global variables like `process`
  },
  // other config
};


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
]);
