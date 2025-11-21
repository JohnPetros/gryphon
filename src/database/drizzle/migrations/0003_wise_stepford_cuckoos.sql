DROP INDEX "accounts_email_unique";--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "credential_rotation_unit" TO "credential_rotation_unit" text NOT NULL DEFAULT 'month';--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_email_unique` ON `accounts` (`email`);--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "credential_rotation_interval" TO "credential_rotation_interval" integer NOT NULL DEFAULT 1;