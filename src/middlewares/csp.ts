import helmet from "helmet";

const connectSrc = process.env.NODE_ENV != "development"
    ? null
    : "ws:";

export const cspMiddleware = helmet({
    contentSecurityPolicy: {
        directives: {
            "connect-src": [
                connectSrc as "ws:",
                "'self'"
            ].filter(Boolean),
            "script-src": [
                "'self'",
                "'strict-dynamic'",
                (_, res) => {
                    // @ts-expect-error
                    return `'nonce-${res.locals.cspNonce}'`;
                }
            ],
            "font-src": ["'self'", "https://fonts.gstatic.com"],
            "media-src": [
                "'self'",
                "data:",
                "blob:"
            ],
            "img-src": [
                "'self'",
                "data:",
                "blob:"
            ],
        }
    }
});
