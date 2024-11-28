drop policy "Enable delete for users based on user_id" on "public"."user_organisations";

drop policy "Enable insert for users based on user_id" on "public"."user_organisations";

drop policy "Enable read access for all users" on "public"."user_organisations";

drop policy "Enable update for users based on user_id" on "public"."user_organisations";

revoke delete on table "public"."user_organisations" from "anon";

revoke insert on table "public"."user_organisations" from "anon";

revoke references on table "public"."user_organisations" from "anon";

revoke select on table "public"."user_organisations" from "anon";

revoke trigger on table "public"."user_organisations" from "anon";

revoke truncate on table "public"."user_organisations" from "anon";

revoke update on table "public"."user_organisations" from "anon";

revoke delete on table "public"."user_organisations" from "authenticated";

revoke insert on table "public"."user_organisations" from "authenticated";

revoke references on table "public"."user_organisations" from "authenticated";

revoke select on table "public"."user_organisations" from "authenticated";

revoke trigger on table "public"."user_organisations" from "authenticated";

revoke truncate on table "public"."user_organisations" from "authenticated";

revoke update on table "public"."user_organisations" from "authenticated";

revoke delete on table "public"."user_organisations" from "service_role";

revoke insert on table "public"."user_organisations" from "service_role";

revoke references on table "public"."user_organisations" from "service_role";

revoke select on table "public"."user_organisations" from "service_role";

revoke trigger on table "public"."user_organisations" from "service_role";

revoke truncate on table "public"."user_organisations" from "service_role";

revoke update on table "public"."user_organisations" from "service_role";

alter table "public"."user_organisations"
  drop constraint "user_organisations_organization_id_fkey";

alter table "public"."user_organisations"
  drop constraint "user_organisations_user_profile_id_fkey";

alter table "public"."user_organisations"
  drop constraint "user_organisations_pkey";

drop index if exists "public"."user_organisations_pkey";

drop table "public"."user_organisations";

create table "public"."user_organizations"
(
  "user_profile_id" bigint not null,
  "organization_id" bigint not null
);


alter table "public"."user_organizations"
  enable row level security;

alter table "public"."organizations"
  add column "owner" bigint;

CREATE UNIQUE INDEX user_organisations_pkey ON public.user_organizations USING btree (user_profile_id, organization_id);

alter table "public"."user_organizations"
  add constraint "user_organisations_pkey" PRIMARY KEY using index "user_organisations_pkey";

alter table "public"."organizations"
  add constraint "organizations_owner_fkey" FOREIGN KEY (owner) REFERENCES user_profiles (id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."organizations"
  validate constraint "organizations_owner_fkey";

alter table "public"."user_organizations"
  add constraint "user_organizations_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_organizations"
  validate constraint "user_organizations_organization_id_fkey";

alter table "public"."user_organizations"
  add constraint "user_organizations_user_profile_id_fkey" FOREIGN KEY (user_profile_id) REFERENCES user_profiles (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_organizations"
  validate constraint "user_organizations_user_profile_id_fkey";

grant delete on table "public"."user_organizations" to "anon";

grant insert on table "public"."user_organizations" to "anon";

grant references on table "public"."user_organizations" to "anon";

grant select on table "public"."user_organizations" to "anon";

grant trigger on table "public"."user_organizations" to "anon";

grant truncate on table "public"."user_organizations" to "anon";

grant update on table "public"."user_organizations" to "anon";

grant delete on table "public"."user_organizations" to "authenticated";

grant insert on table "public"."user_organizations" to "authenticated";

grant references on table "public"."user_organizations" to "authenticated";

grant select on table "public"."user_organizations" to "authenticated";

grant trigger on table "public"."user_organizations" to "authenticated";

grant truncate on table "public"."user_organizations" to "authenticated";

grant update on table "public"."user_organizations" to "authenticated";

grant delete on table "public"."user_organizations" to "service_role";

grant insert on table "public"."user_organizations" to "service_role";

grant references on table "public"."user_organizations" to "service_role";

grant select on table "public"."user_organizations" to "service_role";

grant trigger on table "public"."user_organizations" to "service_role";

grant truncate on table "public"."user_organizations" to "service_role";

grant update on table "public"."user_organizations" to "service_role";

create policy "Enable delete for users based on user_id"
  on "public"."user_organizations"
  as permissive
  for delete
  to public
  using (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                        FROM user_profiles
                                        WHERE (user_profiles.id = user_organizations.user_profile_id))));


create policy "Enable insert for users based on user_id"
  on "public"."user_organizations"
  as permissive
  for insert
  to public
  with check (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                             FROM user_profiles
                                             WHERE (user_profiles.id = user_organizations.user_profile_id))));


create policy "Enable read access for all users"
  on "public"."user_organizations"
  as permissive
  for select
  to public
  using (true);


create policy "Enable update for users based on user_id"
  on "public"."user_organizations"
  as permissive
  for update
  to public
  using (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                        FROM user_profiles
                                        WHERE (user_profiles.id = user_organizations.user_profile_id))));



