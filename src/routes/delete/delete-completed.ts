import { db } from "@/lib/db";
import { todos } from "@/model/schema";
import { eq } from "drizzle-orm";
import { Router } from "express";

const router = Router();

router.delete("/delete-completed", async (_req, res) => {
    try {
        await db.delete(todos).where(eq(todos.isFinished, true));

        res.setHeader("HX-Trigger", "deleteTodo");
        res.send("OK");
    } catch (err) {
        console.log("\n-- An error has occured --\n");
        console.error(err);
        console.log("\n-- End of error --\n");

        res.status(500).send("Something went wrong. Please try again. If the issue persists, try contacting the site owner.");
    }
});

export default router;
