import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "off",
      "vue/no-mutating-props": "off",
      "vue/no-template-shadow": "off",
      "vue/no-unused-components": "off",
      "vue/no-unused-vars": "off",
      "vue/no-useless-template-attributes": "off",
      "vue/no-v-text": "off"
    }
  },
  {
    ignores: [
      "dist/",
      "build/",
      "node_modules/",
      ".nuxt/",
      "coverage/",
      "static/",
      ".output/",
      "*.local",
      "env.local",
      ".env.*"
    ]
  }
];
