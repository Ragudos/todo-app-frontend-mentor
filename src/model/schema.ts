import {
    boolean,
    index,
    pgTable,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

export const todos = pgTable(
    "todos",
    {
        id: serial("id").primaryKey(),
        creationDate: timestamp("creation_date"),
        isFinished: boolean("is_finished"),
        content: text("content"),
    },
    (table) => {
        return {
            isFinishedIdx: index("is_finished_idx").on(table.isFinished),
            creationDateIdx: index("creation_date_idx")
                .on(table.creationDate)
                .desc(),
        };
    }
);
