// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import importPlugin from "eslint-plugin-import";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [{
  ignores: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "storybook-static/**",
    "next-env.d.ts",
  ],
}, ...compat.extends("next/core-web-vitals", "next/typescript"), {
  files: ["src/**/*.{ts,tsx}"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "import/no-cycle": "warn",
  },
}, {
  // Import boundary rules - enforce barrel exports
  files: ["src/**/*.{ts,tsx}"],
  plugins: {
    import: importPlugin,
  },
  rules: {
    "import/no-internal-modules": [
      "warn",
      {
        allow: [
          "**/node_modules/**",
          "**/dist/**",
          "**/index.{ts,tsx}",
          "**/types.ts",
          "**/styles.ts",
          "**/constants.ts",
        ],
      },
    ],
  },
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
