CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text,
	`encryption_salt` text,
	`auto_lock_timeout` integer,
	`is_biometry_activated` integer DEFAULT 0,
	`minimum_password_strength` integer DEFAULT 3,
	`is_master_password_required` integer DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `credentials` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`encrypted_data` text NOT NULL,
	`site_url` text,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`vault_id` text NOT NULL,
	`last_version_id` text,
	FOREIGN KEY (`vault_id`) REFERENCES `vaults`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `credential_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`credential_id` text NOT NULL,
	`is_restoration` integer NOT NULL,
	`version_number` integer NOT NULL,
	`encrypted_data` text NOT NULL,
	FOREIGN KEY (`credential_id`) REFERENCES `credentials`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `notes` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`vault_id` text NOT NULL,
	`encrypted_data` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`vault_id`) REFERENCES `vaults`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `vaults` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`icon` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`account_id` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
