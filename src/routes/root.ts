import { Router } from "express";

import changeThemeRoute from "./put/change-theme";
import addTodoRoute from "./post/add-todo";
import getTodoRoute from "./get-todos";
import deleteTodoRoute from "./delete/delete-todo";
import updateTodoRoute from "./put/update-todo";
import updateFilterRoute from "./put/update-filter";
import deleteCompletedTodosRoute from "./delete/delete-completed";
import { db } from "@/lib/db";
import { filterTodoValues, filters, todos } from "@/model/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
    const isMobile =
        req.headers["user-agent"]?.match(/android/i) ||
        req.headers["user-agent"]?.match(/iphone/i);
    let preloadedImages: string[] | undefined;

    if (res.locals.theme == "dark" || res.locals.theme == "light") {
        if (isMobile) {
            preloadedImages =
                res.locals.theme == "dark"
                    ? ["/assets/images/bg-mobile-dark.jpg"]
                    : ["/assets/images/bg-mobile-light.jpg"];
        } else {
            preloadedImages =
                res.locals.theme == "dark"
                    ? ["/assets/images/bg-desktop-dark.jpg"]
                    : ["/assets/images/bg-mobile-light.jpg"];
        }
    } else {
        preloadedImages = isMobile
            ? [
                  "/assets/images/bg-mobile-dark.jpg",
                  "/assets/images/bg-mobile-light.jpg",
              ]
            : [
                  "/assets/images/bg-desktop-dark.jpg",
                  "/assets/images/bg-desktop-light.jpg",
              ];
    }

    let filterBy = req.query.filterTodo;

    try {
        let listOfTodos: {
            id: string;
            creationDate: string | null;
            isFinished: boolean | null;
            content: string | null;
        }[];

        if (
            !filterBy ||
            !filterTodoValues.enumValues.includes(
                filterBy.toString() as "all" | "active" | "completed"
            )
        ) {
            filterBy =
                (
                    await db
                        .selectDistinct()
                        .from(filters)
                        .where(eq(filters.key, "filterTodo"))
                )[0]?.value || "all";
        }

        if (filterBy && typeof filterBy == "string") {
            filterBy = decodeURIComponent(filterBy.toLowerCase().trim());

            if (filterBy == "active") {
                listOfTodos = await db
                    .select()
                    .from(todos)
                    .where(eq(todos.isFinished, false));
            } else if (filterBy == "completed") {
                listOfTodos = await db
                    .select()
                    .from(todos)
                    .where(eq(todos.isFinished, true));
            } else {
                listOfTodos = await db.select().from(todos);
            }
        } else {
            listOfTodos = await db.select().from(todos);
        }

        listOfTodos.sort((a, b) => {
            if (+a.creationDate! > +b.creationDate!) {
                return 1;
            }

            if (+a.creationDate! < +b.creationDate!) {
                return -1;
            }

            return 0;
        });

        listOfTodos.sort((a, b) => {
            if (a.isFinished && !b.isFinished) {
                return -1;
            }

            if (!a.isFinished && b.isFinished) {
                return 1;
            }

            return 0;
        });

        res.render("index", {
            preloadImages: preloadedImages,
            todos: listOfTodos.length == 0 ? undefined : listOfTodos,
            todoListUnfinishedLength: listOfTodos.reduce((prev, curr) => {
                return curr.isFinished ? prev : prev + 1;
            }, 0),
            filterValue: filterBy,
        });
    } catch (err) {
        console.log("\n-- An error has occured --\n");
        console.error(err);
        console.log("\n-- End of error --\n");

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
                "Something went wrong. Please try refreshing the page. If the issue persists, try to contact the site owner if you are seeing this.",
        });
    }
});

router.use(changeThemeRoute);
router.use(addTodoRoute);
router.use(getTodoRoute);
router.use(deleteTodoRoute);
router.use(updateTodoRoute);
router.use(updateFilterRoute);
router.use(deleteCompletedTodosRoute);

export default router;
