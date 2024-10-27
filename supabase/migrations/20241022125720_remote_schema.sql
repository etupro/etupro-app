alter table "public"."departments"
  drop column "numer";

alter table "public"."departments"
  add column "number" text not null;

alter table "public"."departments"
  add column "region" text not null;

CREATE UNIQUE INDEX departments_name_key ON public.departments USING btree (name);

CREATE UNIQUE INDEX departments_numer_key ON public.departments USING btree (number);

alter table "public"."departments"
  add constraint "departments_name_key" UNIQUE using index "departments_name_key";

alter table "public"."departments"
  add constraint "departments_numer_key" UNIQUE using index "departments_numer_key";


