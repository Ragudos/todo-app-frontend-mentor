import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import url from "url";
import pugPlugin from "./esbuild.plugin.mjs";
import { is } from "drizzle-orm";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const args = process.argv;
const isWatch = args[2]?.trim() == "--watchmode";
const mode = isWatch ? "context" : "build";

try {
    const ctx = await esbuild[mode]({
        bundle: true,
        metafile: true,
        format: "cjs",
        minify: isWatch ? false : true,
        platform: "node",
        entryPoints: [
            path.resolve(__dirname, "./src/index.ts"),
            path.resolve(__dirname, "./src/views/**/*.pug")
        ],
        outdir: path.resolve(__dirname, isWatch ? "./dev-build" : "./build"),
        assetNames: "[dir]/[name]-[hash]",
        outExtension: {
            ".js": ".cjs"
        },
        packages: isWatch ? "external" : undefined,
        plugins: [
            pugPlugin(),
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
