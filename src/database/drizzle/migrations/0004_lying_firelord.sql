DROP INDEX "accounts_email_unique";--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "credential_rotation_interval" TO "credential_rotation_interval" integer NOT NULL DEFAULT 2;--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_email_unique` ON `accounts` (`email`);