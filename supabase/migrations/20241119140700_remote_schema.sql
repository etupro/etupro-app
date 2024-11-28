create table "public"."post_organizations"
(
  "post_id"         bigint not null,
  "organization_id" bigint not null
);


alter table "public"."post_organizations"
  enable row level security;

CREATE UNIQUE INDEX post_organizations_pkey ON public.post_organizations USING btree (post_id, organization_id);

alter table "public"."post_organizations"
  add constraint "post_organizations_pkey" PRIMARY KEY using index "post_organizations_pkey";

alter table "public"."post_organizations"
  add constraint "post_organizations_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."post_organizations"
  validate constraint "post_organizations_organization_id_fkey";

alter table "public"."post_organizations"
  add constraint "post_organizations_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."post_organizations"
  validate constraint "post_organizations_post_id_fkey";

grant delete on table "public"."post_organizations" to "anon";

grant insert on table "public"."post_organizations" to "anon";

grant references on table "public"."post_organizations" to "anon";

grant select on table "public"."post_organizations" to "anon";

grant trigger on table "public"."post_organizations" to "anon";

grant truncate on table "public"."post_organizations" to "anon";

grant update on table "public"."post_organizations" to "anon";

grant delete on table "public"."post_organizations" to "authenticated";

grant insert on table "public"."post_organizations" to "authenticated";

grant references on table "public"."post_organizations" to "authenticated";

grant select on table "public"."post_organizations" to "authenticated";

grant trigger on table "public"."post_organizations" to "authenticated";

grant truncate on table "public"."post_organizations" to "authenticated";

grant update on table "public"."post_organizations" to "authenticated";

grant delete on table "public"."post_organizations" to "service_role";

grant insert on table "public"."post_organizations" to "service_role";

grant references on table "public"."post_organizations" to "service_role";

grant select on table "public"."post_organizations" to "service_role";

grant trigger on table "public"."post_organizations" to "service_role";

grant truncate on table "public"."post_organizations" to "service_role";

grant update on table "public"."post_organizations" to "service_role";

create policy "Enable delete for users based on user_id"
  on "public"."post_organizations"
  as permissive
  for delete
  to authenticated
  using (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                        FROM user_profiles
                                        WHERE (user_profiles.id = (SELECT posts.user_profile_id
                                                                   FROM posts
                                                                   WHERE (posts.id = post_organizations.post_id))))));


create policy "Enable insert for users based on user_id"
  on "public"."post_organizations"
  as permissive
  for insert
  to public
  with check (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                             FROM user_profiles
                                             WHERE (user_profiles.id = (SELECT posts.user_profile_id
                                                                        FROM posts
                                                                        WHERE (posts.id = post_organizations.post_id))))));


create policy "Enable read access for all users"
  on "public"."post_organizations"
  as permissive
  for select
  to public
  using (true);


create policy "Enable update for users based on user_id"
  on "public"."post_organizations"
  as permissive
  for update
  to authenticated
  using (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                        FROM user_profiles
                                        WHERE (user_profiles.id = (SELECT posts.user_profile_id
                                                                   FROM posts
                                                                   WHERE (posts.id = post_organizations.post_id))))));



