import eslintPluginAstro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        // Parse the TypeScript in frontmatter and <script> blocks.
        parser: tsParser,
      },
    },
  },
  {
    ignores: ["dist/", ".astro/", "node_modules/"],
  },
];
