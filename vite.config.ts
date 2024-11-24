import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    components({
      resolvers: [IconsResolver({})],
    }),
    autoImport({}),
    Icons(),
  ],
});
