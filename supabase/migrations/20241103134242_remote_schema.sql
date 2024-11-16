create type "public"."roles" as enum ('SUPER_ADMIN', 'ADMIN', 'USER');

alter table "public"."user_profiles" add column "role" roles not null default 'USER'::roles;


