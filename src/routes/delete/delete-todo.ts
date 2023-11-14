import { db } from "@/lib/db";
import { todos } from "@/model/schema";
import { eq } from "drizzle-orm";
import { Router } from "express";

const router = Router();

router.delete("/delete-todo", async (req, res) => {
    try {
        const id = req.query.todoId;

        if (!id) {
            res.status(400).send("No todo id was received.");

            return;
        }

        await db.delete(todos).where(eq(todos.id, +id));

        res.setHeader("HX-Trigger", "deleteTodo");
        res.send("OK");
    } catch (err) {
        console.log("\n-- An error has occured --\n");
        console.error(err);
        console.log("\n-- --\n");

        res.status(500).send("Internal Server Error.");
    }
});

export default router;
