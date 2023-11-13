import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import url from "url";
import { sassPlugin } from "esbuild-sass-plugin";
import autoprefixer from "autoprefixer";
import postcssPreserEnv from "postcss-preset-env"
import postcss from "postcss";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const args = process.argv;
const isWatch = args[2]?.trim() == "--watchmode";
const mode = isWatch ? "context" : "build";

try {
    const ctx = await esbuild[mode]({
        bundle: true,
        minifyWhitespace: true,
        metafile: true,
        format: "esm",
        platform: "node",
        entryPoints: [path.resolve(__dirname, "./src/styles/*.scss")],
        outdir: path.resolve(__dirname, "./build"),
        entryNames: "[dir]/styles/[name]",
        plugins: [
            sassPlugin({
                async transform(source, _resolveDir) {
                    const { css } = await postcss([
                        autoprefixer,
                        postcssPreserEnv({
                            stage: 0
                        })
                    ]).process(source, {
                        from: "*.scss",
                        to: "*.css"
                    });

                    return css;
                }
            })
        ]
    });

    if (isWatch) {
        ctx.watch();
    } else {
        fs.writeFileSync(path.resolve(__dirname, "./build/css.meta.json"), JSON.stringify(ctx.metafile));
    }
} catch (err) {
    console.error(err);
    process.exit(1);
}
