import { Router } from "express";

import changeThemeRoute from "./put/change-theme";
import addTodoRoute from "./post/add-todo";
import validationRoute from "./post/validate";
import { db } from "@/lib/db";
import { todos } from "@/model/schema";

const router = Router();

router.get("/", async (req, res) => {
    const isMobile =
        req.headers["user-agent"]?.match(/android/i) ||
        req.headers["user-agent"]?.match(/iphone/i);

    try {
        const listOfTodos = await db.select().from(todos);

        console.log(listOfTodos);

        res.render("index", {
            preloadImages: isMobile
                ? [
                      "/assets/images/bg-mobile-dark.jpg",
                      "/assets/images/bg-mobile-light.jpg",
                  ]
                : [
                      "/assets/images/bg-desktop-dark.jpg",
                      "/assets/images/bg-desktop-light.jpg",
                  ],
            todos: listOfTodos
        });
    } catch (err) {
        res.status(500).render("error", {
            status: 500,
            preloadImages: isMobile
                ? [
                      "/assets/images/bg-mobile-dark.jpg",
                      "/assets/images/bg-mobile-light.jpg",
                  ]
                : [
                      "/assets/images/bg-desktop-dark.jpg",
                      "/assets/images/bg-desktop-light.jpg",
                  ],
            message: "Something went wrong. Please contact the site owner if you are seeing this."
        });
    }
});

router.use(changeThemeRoute);
router.use(addTodoRoute);
router.use(validationRoute);

export default router;
