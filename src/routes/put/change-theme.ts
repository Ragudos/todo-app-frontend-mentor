import { Router } from "express";

const router = Router();

router.put("/change-theme/:theme", (req, res) => {
    const theme = req.params.theme;

    console.log(theme);
    
    res.cookie("theme", theme, {
        path: "/",
        secure: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
        expires: new Date(Date.now() + (1000 * 60 * 60))
    });

    res.setHeader("hx-refresh", "true");

    res.send(theme);
});

export default router;
