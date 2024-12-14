alter table "public"."student_informations"
  drop column "description";

alter table "public"."student_informations"
  drop column "phone_number";

alter table "public"."student_informations"
  drop column "picture_path";

alter table "public"."user_profiles"
  add column "description" text;

alter table "public"."user_profiles"
  add column "phone_number" text;

alter table "public"."user_profiles"
  add column "picture_path" text;

alter table "public"."student_informations"
  add column "updated_at" timestamp with time zone not null default now();

