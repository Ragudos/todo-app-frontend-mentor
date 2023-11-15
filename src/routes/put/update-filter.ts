import { db } from "@/lib/db";
import { cleanInput } from "@/lib/utils";
import { filterTodoValues, filters } from "@/model/schema";
import { eq } from "drizzle-orm";
import { Router } from "express";

const router = Router();

router.put("/update-filter", async (req, res) => {
    let newFilterValue = req.body.newFilterValue;
    const activeFilterValue = req.body["active-filter-todo-button"];

    if (activeFilterValue) {
        res.status(204).send("");

        return;
    }

    if (!newFilterValue) {
        res.status(400).send("Invalid filter value");

        return;
    } else {
        newFilterValue = cleanInput(newFilterValue.toLowerCase().trim());

        if (!filterTodoValues.enumValues.includes(newFilterValue)) {
            res.status(400).send("Invalid filter value");

            return;
        }
    }

    try {
        await db
            .update(filters)
            .set({ value: newFilterValue })
            .where(eq(filters.key, "filterTodo"));

        res.setHeader("HX-Trigger", "updateFilter");

        res.send(
            filterTodoValues.enumValues
                .map((value) => {
                    if (value == newFilterValue) {
                        return `
                  <button
                     type="submit"
                     value="${value}"
                     name="active-filter-todo-button"
                     aria-label="Show ${value} Todos"
                     aria-checked="true"
                     style="opacity: 1; font-size: inherit;"
                     disabled   
                  >
                     ${value[0].toUpperCase() + value.slice(1)}
                  </button>
               `.trim();
                    }

                    return `
               <button
                  type="submit"
                  name="newFilterValue"
                  value="${value}"
                  style="font-size: inherit;"
                  aria-label="Show ${value} Todos"
               >
                  ${value[0].toUpperCase() + value.slice(1)}
               </button>
            `.trim();
                })
                .join(" ")
        );
    } catch (err) {
        res.status(500).send("Something went wrong. Please try again.");
    }
});

export default router;
