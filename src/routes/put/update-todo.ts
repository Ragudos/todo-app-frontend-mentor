import { db } from "@/lib/db";
import { todos } from "@/model/schema";
import { eq } from "drizzle-orm";
import { Router } from "express";

const router = Router();

router.put("/update-todo", async (req, res) => {
    try {
        const todoId = req.query.todoId;
        const isFinished = req.query.isFinished == "true" ? true : false;

        if (!todoId) {
            res.status(400).send("No todo id was received.");

            return;
        }

        await db
            .update(todos)
            .set({ isFinished })
            .where(eq(todos.id, todoId.toString()));

        res.setHeader("HX-Trigger", "updateTodo");
        res.send("OK");
    } catch (err) {
        console.log("\n-- An error has occured --\n");
        console.error(err);
        console.log("\n-- End of error --\n");

        res.status(500).send(
            "Something went wrong. Please contact the site owner. Thank you."
        );
    }
});

export default router;
