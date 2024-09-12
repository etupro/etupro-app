alter table "public"."comments"
  enable row level security;

alter table "public"."posts"
  enable row level security;

alter table "public"."tags"
  enable row level security;

alter table "public"."user_profiles"
  enable row level security;

create policy "Enable delete for users based on user_id"
  on "public"."comments"
  as permissive
  for delete
  to public
  using (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                        FROM user_profiles
                                        WHERE (user_profiles.id = comments.user_profile_id))));


create policy "Enable insert for users based on user_id"
  on "public"."comments"
  as permissive
  for insert
  to public
  with check (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                             FROM user_profiles
                                             WHERE (user_profiles.id = comments.user_profile_id))));


create policy "Enable read access for all users"
  on "public"."comments"
  as permissive
  for select
  to public
  using (true);


create policy "Enable update for users based on user_id"
  on "public"."comments"
  as permissive
  for update
  to public
  using (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                        FROM user_profiles
                                        WHERE (user_profiles.id = comments.user_profile_id))));


create policy "Enable delete for users based on user_id"
  on "public"."posts"
  as permissive
  for delete
  to public
  using (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                        FROM user_profiles
                                        WHERE (user_profiles.id = posts.user_profile_id))));


create policy "Enable insert for users based on user_id"
  on "public"."posts"
  as permissive
  for insert
  to public
  with check (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                             FROM user_profiles
                                             WHERE (user_profiles.id = posts.user_profile_id))));


create policy "Enable read access for all users"
  on "public"."posts"
  as permissive
  for select
  to public
  using (true);


create policy "Enable update for users based on user_id"
  on "public"."posts"
  as permissive
  for update
  to public
  using (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                        FROM user_profiles
                                        WHERE (user_profiles.id = posts.user_profile_id))));


create policy "Enable insert for authenticated users only"
  on "public"."tags"
  as permissive
  for insert
  to authenticated
  with check (true);


create policy "Enable read access for all users"
  on "public"."tags"
  as permissive
  for select
  to public
  using (true);


create policy "Enable delete for users based on user_id"
  on "public"."user_profiles"
  as permissive
  for delete
  to public
  using (((SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for users based on user_id"
  on "public"."user_profiles"
  as permissive
  for insert
  to public
  with check (((SELECT auth.uid() AS uid) = user_id));


create policy "Enable read access for all users"
  on "public"."user_profiles"
  as permissive
  for select
  to public
  using (true);


create policy "Enable update for users based on user_id"
  on "public"."user_profiles"
  as permissive
  for update
  to public
  using (((SELECT auth.uid() AS uid) = user_id));



