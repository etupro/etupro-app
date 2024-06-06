alter table "public"."comments"
  drop constraint "comments_user_id_fkey";

alter table "public"."posts"
  drop constraint "posts_author_fkey";

alter table "public"."comments"
  drop column "user_id";

alter table "public"."comments"
  add column "user_profile_id" bigint not null;

alter table "public"."posts"
  drop column "user_id";

alter table "public"."posts"
  add column "user_profile_id" bigint not null;

alter table "public"."comments"
  add constraint "comments_profile_id_fkey" FOREIGN KEY (user_profile_id) REFERENCES user_profiles (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."comments"
  validate constraint "comments_profile_id_fkey";

alter table "public"."posts"
  add constraint "posts_user_profile_id_fkey" FOREIGN KEY (user_profile_id) REFERENCES user_profiles (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."posts"
  validate constraint "posts_user_profile_id_fkey";


