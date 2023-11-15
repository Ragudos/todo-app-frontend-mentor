-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "filter_todo_values" AS ENUM('all', 'active', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "filters" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"creation_date" timestamp DEFAULT now(),
	"key" text NOT NULL,
	"value" "filter_todo_values" DEFAULT 'all' NOT NULL,
	CONSTRAINT "filters_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"creation_date" timestamp DEFAULT now(),
	"is_finished" boolean DEFAULT false,
	"content" text DEFAULT 'This todo does not have anything.' NOT NULL,
	"order_in_list" integer,
	CONSTRAINT "todos_order_in_list_unique" UNIQUE("order_in_list")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "is_finished_idx" ON "todos" ("is_finished");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "creation_date_idx" ON "todos" ("creation_date");
*/