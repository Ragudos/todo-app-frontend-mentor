import type { Config } from "drizzle-kit";

export default {
    schema: "./src/model/schema.ts",
    out: "./src/model",
    dbCredentials: {
        connectionString: process.env.DB_URL ?? "",
    },
    driver: "pg"
} satisfies Config;