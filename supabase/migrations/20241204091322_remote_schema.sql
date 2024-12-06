create type "public"."post_lifecycle" as enum ('OPEN', 'ONGOING', 'FINISHED');

alter table "public"."posts"
  add column "lifecycle" post_lifecycle not null default 'OPEN'::post_lifecycle;


