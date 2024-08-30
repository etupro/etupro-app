alter table "public"."user_profiles"
  drop constraint "public_user_profiles_organization_id_fkey";

alter table "public"."user_profiles"
  add constraint "public_user_profiles_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations (id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."user_profiles"
  validate constraint "public_user_profiles_organization_id_fkey";


