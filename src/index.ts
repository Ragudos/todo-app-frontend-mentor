import { config } from "dotenv";
import express from "express";
import compression from "compression";
import url from "node:url";
import { promises } from "node:fs";

// Middlewares
import { logger } from "./lib/logger";
import { cleanUrlMiddleware } from "./middlewares/redirect";
import { cspMiddleware } from "./middlewares/csp";
import { generateNonceMiddleware } from "./middlewares/nonce";
import { themeMiddleware } from "./middlewares/theme";

// Routes
import rootRoute from "./routes/root";

// Updates
import changeThemeRoute from "./routes/put/change-theme";
import path from "node:path";

config();

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(generateNonceMiddleware);
app.use(logger);
app.use(cleanUrlMiddleware);
app.use(cspMiddleware);
app.use(compression());

// app.use(
//     "/styles",
//     express.static(__dirname + "/styles", {
//         cacheControl: false,
//         maxAge: 0,
//     })
//     );

// app.use(
//     "/client",
//     express.static(__dirname + "/client", {
//         cacheControl: false,
//         maxAge: 0,
//     })
// );

app.use(express.static("public", {
    maxAge: 1000 * 60 * 30
}));

app.engine("cjs", async (filePath, options, callback) => {
    const templateFile = await import("file://" + filePath);
    const content = import.meta.url
        ? templateFile.default(options)
        : templateFile.default.default(options);

    callback(null, content);
});
app.set("view engine", "cjs");
app.set("views", path.resolve(import.meta.url ? url.fileURLToPath(new URL(".", import.meta.url)) : __dirname, "./views"));

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

app.all("*", themeMiddleware);
app.use("/", rootRoute);
app.use("/", changeThemeRoute);
