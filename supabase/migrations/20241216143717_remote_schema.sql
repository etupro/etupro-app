alter table "public"."posts"
  add column "department_id_tmp" text;

update "public"."posts"
set department_id_tmp = (select code from departments where id = posts.department_id)
where department_id is not null;
