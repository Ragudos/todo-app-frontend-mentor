import type { RenderOptions } from "globals";

import express from "express";
import compression from "compression";
import path from "node:path";
import { app } from "./init";

import { getTimestampForCacheBusting } from "./lib/utils";
import { siteConfig } from "./config/site";

// Middlewares
import { logger } from "./lib/logger";
import { cleanUrlMiddleware } from "./middlewares/redirect";
import { cspMiddleware } from "./middlewares/csp";
import { generateNonceMiddleware } from "./middlewares/nonce";
import { themeMiddleware } from "./middlewares/theme";

// Routes
import rootRoute from "./routes/root";
import { attachEnvToClient } from "./middlewares/attach_env";
import { rateLimit } from "./lib/limiter";

const cacheTime = 1000 * 60 * 30;

app.disable("x-powered-by");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(generateNonceMiddleware);
app.use(themeMiddleware);
app.use(logger);
app.use(cleanUrlMiddleware);
app.use(cspMiddleware);
app.use(attachEnvToClient);
app.use(compression());
app.use(
    "/styles",
    express.static(__dirname + "/styles", {
        maxAge: cacheTime,
        immutable: process.env.NODE_ENV == "production",
    })
);
app.use(
    "/client",
    express.static(__dirname + "/client", {
        maxAge: cacheTime,
        immutable: process.env.NODE_ENV == "production",
    })
);
app.use(
    express.static("public", {
        maxAge: cacheTime,
        immutable: process.env.NODE_ENV == "production",
    })
);
app.use(
    rateLimit({
        interval: 60 * 1000,
    })
);

app.engine(
    "cjs",
    async (filePath, options: Partial<RenderOptions>, callback) => {
        const templateFile = await import("file://" + filePath);
        const content = templateFile.default.default({
            ...options,
            title: options.title
                ? typeof options?.title == "string"
                    ? options.title
                    : options.title?.isAbsolute
                    ? options.title
                    : siteConfig.title
                : siteConfig.title,
            description: options.description
                ? options.description
                : siteConfig.description,
            openGraph: options.openGraph
                ? options.openGraph
                : ({
                      title: siteConfig.title,
                      description: siteConfig.description,
                  } as RenderOptions["openGraph"]),
            timeStamp:
                process.env.NODE_ENV != "production"
                    ? getTimestampForCacheBusting()
                    : undefined,
        });

        callback(null, content);
    }
);
app.set("view engine", "cjs");
app.set("views", path.resolve(__dirname, "./views"));

const PORT = process.env.PORT ?? "3000";
const HOST = process.env.HOST ?? "127.0.0.1";

const server = app.listen(+PORT, HOST, () => {
    console.log(`Application has started on ${HOST}:${PORT}`);
});

process.on("SIGINT", () => {
    server.close();
});

process.on("SIGQUIT", () => {
    server.close();
});

process.on("SIGTERM", () => {
    server.close();
});

app.use("/", rootRoute);
