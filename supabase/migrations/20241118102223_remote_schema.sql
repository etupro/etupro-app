alter table "public"."user_organisations"
  drop constraint "user_organisations_pkey";

drop index if exists "public"."user_organisations_pkey";

alter table "public"."user_organisations"
  drop column "created_at";

alter table "public"."user_organisations"
  drop column "id";

CREATE UNIQUE INDEX user_organisations_pkey ON public.user_organisations USING btree (user_profile_id, organization_id);

alter table "public"."user_organisations"
  add constraint "user_organisations_pkey" PRIMARY KEY using index "user_organisations_pkey";


