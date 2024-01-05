import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import presetUno from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        UnoCSS({
            theme: {
                breakpoints: {
                    sm: "440px",
                },
            },
            presets: [
                presetUno(),
                presetWebFonts({
                    provider: "google",
                    fonts: {
                        sans: "Roboto",
                        display: "Playfair Display",
                        mono: ["Fira Code", "Fira Mono:400,700"],
                    },
                }),
            ],
        }),
    ],
});
