import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const args = process.argv;
const isWatch = args[2]?.trim() == "--watchmode";
const mode = isWatch ? "context" : "build";

try {
    const ctx = await esbuild[mode]({
        bundle: true,
        splitting: false,
        metafile: true,
        minify: isWatch ? false : true,
        format: "esm",
        platform: "browser",
        entryPoints: [path.resolve(__dirname, "./src/client/*.ts")],
        outdir: path.resolve(__dirname, isWatch ? "./dev-build" : "./public/build"),
        entryNames: "[dir]/client/[name]",
        outExtension: {
            ".js": ".mjs"
        },
        banner: {
            js: ""
        }
    });

    if (isWatch) {
        ctx.watch();
    } else {
        fs.writeFileSync(path.resolve(__dirname, "./public/build/client.meta.json"), JSON.stringify(ctx.metafile));
    }
} catch (err) {
    console.error(err);
    process.exit(1);
}
