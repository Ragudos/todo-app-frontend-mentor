import { Router } from "express";

import { getTimestampForCacheBusting } from "@/lib/utils";
import { db } from "@/lib/db";
import { filterTodoValues, filters, todos } from "@/model/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/get-todos", async (req, res, _next) => {
    try {
        let filterBy = req.query.filterTodo;

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

        let listOfTodos: {
            id: string;
            creationDate: string | null;
            isFinished: boolean | null;
            content: string | null;
        }[];

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

        if (listOfTodos.length == 0) {
            if (filterBy == "all") {
                res.send(
                    '<div data-type="empty-list-indicator" class="p-5 w-full" style="opacity: 0.5; font-size: 0.875rem;">There are no todos right now. Create one?</div>'
                );
            } else if (filterBy == "completed") {
                res.send(
                    '<div data-type="empty-list-indicator" class="p-5 w-full" style="opacity: 0.5; font-size: 0.875rem;">There are no completed todos. Check one to see it here.</div>'
                );
            } else {
                res.send(
                    '<div data-type="empty-list-indicator" class="p-5 w-full" style="opacity: 0.5; font-size: 0.875rem;">There are no active todos right now. Create one?</div>'
                );
            }

            return;
        }

        res.setHeader("HX-Trigger", "todoListUpdated");

        res.send(
            listOfTodos
                .map((item) => {
                    return `
                    <div
                        class="p-4 justify-between flex gap-4 items-center w-full toggle-finished-todo"
                        id="todo-${item.id}"
                        ${item.isFinished ? 'data-active="true"' : ""}
                    >
                        <button
                            type="button"
                            class="gap-4"
                            hx-trigger="click"
                            hx-swap="none"
                            hx-put="/update-todo?todoId=${
                                item.id
                            }&isFinished=${!item.isFinished}"
                            data-disableonclick
                            hx-indicator="#loading-indicator"
                            ${item.isFinished ? 'aria-current="true"' : ""}    
                            aria-label="Indicator whether a todo is finished or not. Click to toggle."
                        >
                            <div
                                class="icon rounded-full todo-checkmark"
                            >
                                ${
                                    item.isFinished
                                        ? `
                                            <img
                                                src="/assets/images/icon-check.svg${
                                                    process.env.NODE_ENV !=
                                                    "production"
                                                        ? `?t=${getTimestampForCacheBusting(
                                                              false
                                                          )}`
                                                        : ""
                                                }"
                                                alt="Check Icon"
                                                width="11"
                                                height="9"
                                            />
                                        `
                                        : ""
                                }
                            </div>

                            <div
                                class="${
                                    item.isFinished
                                        ? "strikethrough finished-todo"
                                        : "unfinished-todo"
                                }"
                            >
                                ${item.content}
                            </div>
                        </button>

                        <div class="flex justify-end items-center">
                            <button
                                class="show-on-hover"
                                hx-delete="/delete-todo?todoId=${item.id}"
                                hx-swap="none"
                                type="button"
                                aria-label="Click to delete this todo"
                            >
                                ${
                                    process.env.NODE_ENV != "production"
                                        ? `
                                                <img
                                                    src="/assets/images/icon-cross.svg?t=${getTimestampForCacheBusting(
                                                        false
                                                    )}"
                                                    alt="Close Icon in the form of an X"
                                                    width="18"
                                                    height="18"
                                                />
                                            `
                                        : `
                                                <img
                                                    src="/assets/images/icon-cross.svg"
                                                    alt="Close Icon in the form of an X"
                                                    width="18"
                                                    height="18"
                                                />
                                            `
                                }
                            </button>
                        </div>
                    </div>
                `.trim();
                })
                .join(" ")
        );
    } catch (err) {
        console.log("\n-- An error has occured --\n");
        console.error(err);
        console.log("\n-- End of error --\n");

        res.status(400).send(
            "Something went wrong in getting the latest list of todos."
        );
    }
});

export default router;
