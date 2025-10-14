CREATE TABLE "shipping_address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"recipientName" text NOT NULL,
	"street" text NOT NULL,
	"number" text NOT NULL,
	"complement" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"neighborhood" text NOT NULL,
	"zipCode" text NOT NULL,
	"country" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,x
	"cpfOrCpnj" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_variant" ALTER COLUMN "image_url" SET DATA TYPE text[] USING array["image_url"];
--> statement-breakpoint
ALTER TABLE "shipping_address" ADD CONSTRAINT "shipping_address_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;