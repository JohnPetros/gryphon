DROP INDEX "accounts_email_unique";--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "email" TO "email" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_email_unique` ON `accounts` (`email`);--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "encryption_salt" TO "encryption_salt" text NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "kcv" TO "kcv" text NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "is_biometry_activated" TO "is_biometry_activated" integer NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "minimum_password_strength" TO "minimum_password_strength" integer NOT NULL DEFAULT 3;--> statement-breakpoint
ALTER TABLE `accounts` ALTER COLUMN "is_master_password_required" TO "is_master_password_required" integer NOT NULL DEFAULT 1;--> statement-breakpoint
ALTER TABLE `accounts` ADD `notification_token` text;--> statement-breakpoint
ALTER TABLE `accounts` ADD `credential_rotation_unit` text NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` ADD `credential_rotation_interval` integer NOT NULL;