import { Router } from "express";

import changeThemeRoute from "./put/change-theme";
import addTodoRoute from "./post/add-todo";
import getTodoRoute from "./get-todos";
import deleteTodoRoute from "./delete/delete-todo";
import updateTodoRoute from "./put/update-todo";
import { db } from "@/lib/db";
import { todos } from "@/model/schema";

const router = Router();

router.get("/", async (req, res) => {
    const isMobile =
        req.headers["user-agent"]?.match(/android/i) ||
        req.headers["user-agent"]?.match(/iphone/i);

    try {
        const listOfTodos = await db.select().from(todos);

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
            todos:
                listOfTodos.length == 0
                    ? undefined
                    : listOfTodos
                          .sort((a, b) => {
                              if (
                                  a.creationDate!.getTime() >
                                  b.creationDate!.getTime()
                              ) {
                                  return -1;
                              }

                              if (
                                  a.creationDate!.getTime() <
                                  b.creationDate!.getTime()
                              ) {
                                  return 1;
                              }

                              return 0;
                          })
                          .sort((a, b) => {
                              if (a.isFinished && !b.isFinished) {
                                  return -1;
                              }

                              if (b.isFinished && !a.isFinished) {
                                  return 1;
                              }

                              return 0;
                          }),
        });
    } catch (err) {
        console.log("\n-- An error has occured --\n");
        console.error(err);
        console.log("\n-- --\n");

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
            message:
                "Something went wrong. Please contact the site owner if you are seeing this.",
        });
    }
});

router.use(changeThemeRoute);
router.use(addTodoRoute);
router.use(getTodoRoute);
router.use(deleteTodoRoute);
router.use(updateTodoRoute);

export default router;
