import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import url from "url";
import pugPlugin from "./esbuild.plugin.mjs";
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
        metafile: true,
        format: "cjs",
        platform: "node",
        entryPoints: [
            path.resolve(__dirname, "./src/index.ts"),
            path.resolve(__dirname, "./src/views/**/*.pug")
        ],
        outdir: path.resolve(__dirname, "./build"),
        assetNames: "[dir]/[name]-[hash]",
        outExtension: {
            ".js": ".cjs"
        },
        plugins: [
            pugPlugin(),
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
        fs.writeFileSync(path.resolve(__dirname, "./build/server.meta.json"), JSON.stringify(ctx.metafile));
    }


} catch (err) {
    console.error(err);
    process.exit(1);
}
