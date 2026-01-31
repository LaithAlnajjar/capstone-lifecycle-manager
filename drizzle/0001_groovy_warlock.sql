CREATE TYPE "term_status" AS ENUM ('upcoming', 'active', 'completed');
CREATE TYPE "group_status" AS ENUM ('forming', 'bidding', 'active', 'completed');
CREATE TYPE "milestone_status" AS ENUM ('pending', 'in_progress', 'completed');
CREATE TYPE "submission_status" AS ENUM ('pending', 'in_progress', 'completed');
CREATE TYPE "bid_status" AS ENUM ('pending', 'accepted', 'rejected');
CREATE TYPE "visibility" AS ENUM ('public', 'private');

CREATE TABLE "academic_term" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"status" "term_status" DEFAULT 'upcoming' NOT NULL,
	"max_group_size" integer DEFAULT 10 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "milestone" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"due_date" timestamp NOT NULL,
	"status" "milestone_status" DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" text PRIMARY KEY NOT NULL,
	"group_id" text,
	"supervisor_id" text,
	"title" text NOT NULL,
	"abstract" text NOT NULL,
	"repository_url" text NOT NULL,
	"final_grade" integer
);
--> statement-breakpoint
CREATE TABLE "project_group" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"term_id" text,
	"visibility" "visibility" DEFAULT 'public' NOT NULL,
	"status" "group_status" DEFAULT 'forming' NOT NULL,
	"invite_code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "submission" (
	"id" text PRIMARY KEY NOT NULL,
	"milestone_id" text,
	"submitted_by" text,
	"file_url" text NOT NULL,
	"version_number" integer NOT NULL,
	"timestamp" timestamp NOT NULL,
	"status" "submission_status" DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "supervisor_bid" (
	"id" text PRIMARY KEY NOT NULL,
	"group_id" text NOT NULL,
	"supervisor_id" text NOT NULL,
	"ranking" integer NOT NULL,
	"is_approved" boolean DEFAULT false,
	"status" "bid_status" DEFAULT 'pending' NOT NULL,
	"supervisor_feedback" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "group_id" text;--> statement-breakpoint
ALTER TABLE "milestone" ADD CONSTRAINT "milestone_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_group_id_project_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."project_group"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_supervisor_id_user_id_fk" FOREIGN KEY ("supervisor_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_group" ADD CONSTRAINT "project_group_term_id_academic_term_id_fk" FOREIGN KEY ("term_id") REFERENCES "public"."academic_term"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submission" ADD CONSTRAINT "submission_milestone_id_milestone_id_fk" FOREIGN KEY ("milestone_id") REFERENCES "public"."milestone"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submission" ADD CONSTRAINT "submission_submitted_by_user_id_fk" FOREIGN KEY ("submitted_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supervisor_bid" ADD CONSTRAINT "supervisor_bid_group_id_project_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."project_group"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supervisor_bid" ADD CONSTRAINT "supervisor_bid_supervisor_id_user_id_fk" FOREIGN KEY ("supervisor_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_group_id_project_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."project_group"("id") ON DELETE set null ON UPDATE no action;