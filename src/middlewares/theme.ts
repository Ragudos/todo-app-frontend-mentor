import type { NextFunction, Request, Response } from "express";

import { cleanInput, parseCookie } from "@/lib/utils";

export function themeMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const cookies = req.headers.cookie
        ? parseCookie(req.headers.cookie)
        : undefined;

    const theme = cookies?.theme ? cleanInput(cookies.theme) : "system";

    res.locals.theme = theme;

    next();
}
