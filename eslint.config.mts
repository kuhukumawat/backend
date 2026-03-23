import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node, // ✅ FIXED (Node instead of browser)
    },
    plugins: {
      js,
    },
    extends: ["js/recommended"],
  },

  ...tseslint.configs.recommended, // ✅ spread important
]);
