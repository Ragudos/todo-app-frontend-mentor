import type { Request, Response, NextFunction } from "express";

export const cleanUrlMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isUrlUnclean = req.path.endsWith("/") && req.path.length > 1;

    if (isUrlUnclean) {
        const query = req.url.slice(req.path.length);
        const safePath = req.path.slice(0, -1).replace(/\/+/g, "/");

        res.redirect(301, safePath + query);

        return;
    }

    next();
};
