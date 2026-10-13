CREATE TABLE IF NOT EXISTS "garden_messages" (
  "id" serial PRIMARY KEY NOT NULL,
  "message" varchar(280) NOT NULL,
  "flower" varchar(40) DEFAULT 'margarida' NOT NULL,
  "status" varchar(20) DEFAULT 'pending' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE IF NOT EXISTS "exhibition_memories" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" varchar(120) NOT NULL,
  "description" text NOT NULL,
  "image_url" text,
  "event_date" timestamp with time zone,
  "published" boolean DEFAULT false NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
