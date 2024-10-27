alter table "public"."posts"
  drop constraint "posts_department_fkey";

alter table "public"."posts"
  drop column "department";

alter table "public"."posts"
  add column "department_id" bigint;

alter table "public"."posts"
  add constraint "posts_department_id_fkey" FOREIGN KEY (department_id) REFERENCES departments (id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."posts"
  validate constraint "posts_department_id_fkey";


