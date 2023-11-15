import {
    pgTable,
    index,
    unique,
    pgEnum,
    text,
    timestamp,
    boolean,
} from "drizzle-orm/pg-core";

import crypto from "node:crypto";

import { sql } from "drizzle-orm";
export const keyStatus = pgEnum("key_status", [
    "default",
    "valid",
    "invalid",
    "expired",
]);
export const keyType = pgEnum("key_type", [
    "aead-ietf",
    "aead-det",
    "hmacsha512",
    "hmacsha256",
    "auth",
    "shorthash",
    "generichash",
    "kdf",
    "secretbox",
    "secretstream",
    "stream_xchacha20",
]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
    "s256",
    "plain",
]);
export const filterTodoValues = pgEnum("filter_todo_values", [
    "all",
    "active",
    "completed",
]);

export const todos = pgTable(
    "todos",
    {
        id: text("id")
            .$defaultFn(() => crypto.randomBytes(16).toString("hex"))
            .primaryKey()
            .notNull(),
        creationDate: timestamp("creation_date", {
            mode: "string",
        }).defaultNow(),
        isFinished: boolean("is_finished").default(false),
        content: text("content")
            .default("This todo does not have anything.")
            .notNull(),
    },
    (table) => {
        return {
            isFinishedIdx: index("is_finished_idx").on(table.isFinished),
            creationDateIdx: index("creation_date_idx").on(table.creationDate),
            todosIdKey: unique("todos_id_key").on(table.id),
        };
    }
);

export const filters = pgTable(
    "filters",
    {
        id: text("id")
            .$defaultFn(() => crypto.randomBytes(16).toString("hex"))
            .primaryKey()
            .notNull(),
        creationDate: timestamp("creation_date", {
            mode: "string",
        }).defaultNow(),
        key: text("key").notNull(),
        value: filterTodoValues("value").default("all").notNull(),
    },
    (table) => {
        return {
            filtersKeyUnique: unique("filters_key_unique").on(table.key),
            filtersIdKey: unique("filters_id_key").on(table.id),
        };
    }
);
