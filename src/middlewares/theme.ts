import type { NextFunction, Request, Response } from "express";

export function themeMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const requestCookies = req.cookies;

    console.log(requestCookies);

    next();
}
