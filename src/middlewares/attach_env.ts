import type { NextFunction, Request, Response } from "express";

export function attachEnvToClient(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    res.locals.ENV = {
        NODE_ENV: process.env.NODE_ENV,
    };

    next();
}
