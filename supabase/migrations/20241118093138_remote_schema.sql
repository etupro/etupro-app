alter table "public"."user_profiles"
  drop constraint "public_user_profiles_organization_id_fkey";

create table "public"."user_organisations"
(
  "id"              bigint generated by default as identity not null,
  "created_at"      timestamp with time zone                not null default now(),
  "user_profile_id" bigint                                  not null,
  "organization_id" bigint                                  not null
);


alter table "public"."user_organisations"
  enable row level security;

alter table "public"."user_profiles"
  drop column "organization_id";

CREATE UNIQUE INDEX user_organisations_pkey ON public.user_organisations USING btree (id);

alter table "public"."user_organisations"
  add constraint "user_organisations_pkey" PRIMARY KEY using index "user_organisations_pkey";

alter table "public"."user_organisations"
  add constraint "user_organisations_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_organisations"
  validate constraint "user_organisations_organization_id_fkey";

alter table "public"."user_organisations"
  add constraint "user_organisations_organization_id_fkey1" FOREIGN KEY (organization_id) REFERENCES organizations (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_organisations"
  validate constraint "user_organisations_organization_id_fkey1";

alter table "public"."user_organisations"
  add constraint "user_organisations_user_profile_id_fkey" FOREIGN KEY (user_profile_id) REFERENCES user_profiles (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_organisations"
  validate constraint "user_organisations_user_profile_id_fkey";

alter table "public"."user_organisations"
  add constraint "user_organisations_user_profile_id_fkey1" FOREIGN KEY (user_profile_id) REFERENCES user_profiles (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_organisations"
  validate constraint "user_organisations_user_profile_id_fkey1";

grant delete on table "public"."user_organisations" to "anon";

grant insert on table "public"."user_organisations" to "anon";

grant references on table "public"."user_organisations" to "anon";

grant select on table "public"."user_organisations" to "anon";

grant trigger on table "public"."user_organisations" to "anon";

grant truncate on table "public"."user_organisations" to "anon";

grant update on table "public"."user_organisations" to "anon";

grant delete on table "public"."user_organisations" to "authenticated";

grant insert on table "public"."user_organisations" to "authenticated";

grant references on table "public"."user_organisations" to "authenticated";

grant select on table "public"."user_organisations" to "authenticated";

grant trigger on table "public"."user_organisations" to "authenticated";

grant truncate on table "public"."user_organisations" to "authenticated";

grant update on table "public"."user_organisations" to "authenticated";

grant delete on table "public"."user_organisations" to "service_role";

grant insert on table "public"."user_organisations" to "service_role";

grant references on table "public"."user_organisations" to "service_role";

grant select on table "public"."user_organisations" to "service_role";

grant trigger on table "public"."user_organisations" to "service_role";

grant truncate on table "public"."user_organisations" to "service_role";

grant update on table "public"."user_organisations" to "service_role";


