ALTER TABLE `accounts` ADD `kcv` text;--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_email_unique` ON `accounts` (`email`);