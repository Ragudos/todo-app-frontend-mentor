import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    const cookies = req.headers.cookie;

    const theme = cookies
        ? cookies.split("theme=")[1]
        : "system";

    res.render("index", {
        title: "Hello, World!",
        message: "I am generated with pug!",
        cookieValue: cookies,
        currentTheme: theme,
        nonceId: res.locals.cspNonce
    });
});

export default router;
