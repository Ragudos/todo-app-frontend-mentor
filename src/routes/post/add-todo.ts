import { db } from "@/lib/db";
import { cleanInput } from "@/lib/utils";
import { todos } from "@/model/schema";
import { Router } from "express";
import { validation } from "./validate";
import { maxTableRows } from "@/config/limits";

const router = Router();

router.post("/add-todo", validation, async (req, res) => {
    try {
        const allTodos = await db.select().from(todos);

        if (allTodos.length >= maxTableRows) {
            res.status(403).send(
                "The amount of todos allowed for this side project is " +
                    maxTableRows
            );

            return;
        }

        await db.insert(todos).values({
            isFinished: false,
            content: cleanInput(req.body.todo),
        });

        res.setHeader("HX-Trigger", "newTodo");
        res.send("OK");
    } catch (err) {
        console.log("\n-- An error has occured --\n");
        console.error(err);
        console.log("\n-- End of error --\n");

        res.status(500).send(
            "Internal Server Error. Please contact the site owner if you are seeing this, and tell them that they misconfigured their database. As this is a side project, it will be of much help. Thank you"
        );
    }
});

export default router;
