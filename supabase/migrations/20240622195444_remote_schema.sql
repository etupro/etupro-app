alter table "public"."user_profiles"
  add column "organization_id" bigint;

alter table "public"."user_profiles"
  add constraint "public_user_profiles_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_profiles"
  validate constraint "public_user_profiles_organization_id_fkey";


