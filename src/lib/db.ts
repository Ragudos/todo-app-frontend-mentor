import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DB_URL;


if (!connectionString) {
    console.error(
        "Database URL not found. Please add it as an environment variable."
    );
    process.exit(1);
}

const client = postgres(connectionString, {
    onclose(connId) {
        console.debug(
            `Database connection has closed with an id of ${connId}.`
        );
    },
    connect_timeout: 360,
});

export const db = drizzle(client);
