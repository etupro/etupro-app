alter table "public"."posts"
  add column "department" bigint;

alter table "public"."posts"
  add constraint "posts_department_fkey" FOREIGN KEY (department) REFERENCES departments (id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."posts"
  validate constraint "posts_department_fkey";


