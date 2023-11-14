import { Router } from "express";

import { getTimestampForCacheBusting } from "@/lib/utils";
import { db } from "@/lib/db";
import { todos } from "@/model/schema";

const router = Router();

router.get("/get-todos", async (req, res, _next) => {
    try {
        console.log("query", req.query, "params", req.params);

        const listOfTodos = await db.select().from(todos);

        if (listOfTodos.length == 0) {
            res.send(
                '<div class="p-5 w-full" style="opacity: 0.5; font-size: 0.875rem;">There are no todos right now. Create one?</div>'
            );

            return;
        }

        res.send(
            listOfTodos
                .sort((a, b) => {
                    if (a.creationDate!.getTime() > b.creationDate!.getTime()) {
                        return -1;
                    }

                    if (a.creationDate!.getTime() < b.creationDate!.getTime()) {
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
                })
                .map((item) => {
                    return `
                    <div
                        class="p-5 justify-start flex gap-4 items-center w-full toggle-finished-todo"
                        id="todo-${item.id}"
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
                            ${item.isFinished ? 'aria-checked="true"' : ""}    
                        >
                            <div
                                class="icon rounded-full todo-checkmark"
                                aria-label="Indicator whether a todo is finished or not. Click to toggle."
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
                                aria-label="${
                                    item.isFinished
                                        ? "This todo is finished"
                                        : "This todo is not yet finished."
                                }"
                            >
                                ${item.content}
                            </div>
                        </button>

                        <div class="flex-1 flex justify-end items-center">
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
        console.log("\n-- --\n");

        res.status(400).send(
            "Something went wrong in getting the latest list of todos."
        );
    }
});

export default router;
