alter table "public"."student_informations"
  alter column "id" add generated by default as identity;

CREATE UNIQUE INDEX comments_id_key ON public.comments USING btree (id);

CREATE UNIQUE INDEX organizations_id_key ON public.organizations USING btree (id);

CREATE UNIQUE INDEX posts_id_key ON public.posts USING btree (id);

CREATE UNIQUE INDEX student_informations_id_key ON public.student_informations USING btree (id);

CREATE UNIQUE INDEX tags_id_key ON public.tags USING btree (id);

CREATE UNIQUE INDEX user_profiles_id_key ON public.user_profiles USING btree (id);

alter table "public"."comments"
  add constraint "comments_id_key" UNIQUE using index "comments_id_key";

alter table "public"."organizations"
  add constraint "organizations_id_key" UNIQUE using index "organizations_id_key";

alter table "public"."posts"
  add constraint "posts_id_key" UNIQUE using index "posts_id_key";

alter table "public"."student_informations"
  add constraint "student_informations_id_key" UNIQUE using index "student_informations_id_key";

alter table "public"."tags"
  add constraint "tags_id_key" UNIQUE using index "tags_id_key";

alter table "public"."user_profiles"
  add constraint "user_profiles_id_key" UNIQUE using index "user_profiles_id_key";


