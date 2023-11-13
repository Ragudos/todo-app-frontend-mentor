import { cleanInput } from "@/lib/utils";
import { Router } from "express";

const router = Router();

router.put("/change-theme/:theme", (req, res, _next) => {
    res.setHeader("hx-refresh", "true");

    const theme = encodeURIComponent(cleanInput(req.params.theme));

    if (theme != "dark" && theme != "light" && theme != "system") {
        res.send("Invalid theme");

        return;
    }

    res.cookie("theme", theme, {
        path: "/",
        secure: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
        expires: new Date(Date.now() + 1000 * 60 * 60),
    });

    res.send(theme);
});

export default router;
