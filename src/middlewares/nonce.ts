import type { Request, Response, NextFunction } from "express";

import crypto from "node:crypto";

export function generateNonceMiddleware(
    _req: Request,
    response: Response,
    next: NextFunction,
) {
    const nonce = crypto.randomBytes(32).toString("base64");

    response.locals["cspNonce"] = nonce;
    next();
}