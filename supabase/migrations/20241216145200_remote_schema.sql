alter table "public"."departments"
  drop constraint "departments_numer_key";

alter table "public"."posts"
  drop constraint "posts_department_id_fkey";

alter table "public"."departments"
  drop constraint "departments_pkey";

drop index if exists "public"."departments_numer_key";

drop index if exists "public"."departments_pkey";

alter table "public"."departments"
  drop column "id";

alter table "public"."departments"
  drop column "number";

alter table "public"."departments"
  drop column "region";

alter table "public"."departments"
  alter column "code" set not null;

alter table "public"."posts"
  drop column "department_id";

alter table "public"."posts"
  drop column "department_id_tmp";

alter table "public"."posts"
  add column "department_code" text;

CREATE UNIQUE INDEX departments_pkey ON public.departments USING btree (code);

alter table "public"."departments"
  add constraint "departments_pkey" PRIMARY KEY using index "departments_pkey";

alter table "public"."communes"
  add constraint "communes_code_department_fkey" FOREIGN KEY (code_department) REFERENCES departments (code) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."communes"
  validate constraint "communes_code_department_fkey";

alter table "public"."posts"
  add constraint "posts_department_code_fkey" FOREIGN KEY (department_code) REFERENCES departments (code) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."posts"
  validate constraint "posts_department_code_fkey";


