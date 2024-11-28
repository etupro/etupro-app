alter table "public"."organizations"
  enable row level security;

create policy "Enable insert for authenticated users only"
  on "public"."organizations"
  as permissive
  for insert
  to authenticated
  with check (true);


create policy "Enable read access for all users"
  on "public"."organizations"
  as permissive
  for select
  to public
  using (true);


create policy "Enable update for authenticated users only"
  on "public"."organizations"
  as permissive
  for update
  to authenticated
  using (true);


create policy "Enable delete for users based on user_id"
  on "public"."user_organisations"
  as permissive
  for delete
  to public
  using (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                        FROM user_profiles
                                        WHERE (user_profiles.id = user_organisations.user_profile_id))));


create policy "Enable insert for users based on user_id"
  on "public"."user_organisations"
  as permissive
  for insert
  to public
  with check (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                             FROM user_profiles
                                             WHERE (user_profiles.id = user_organisations.user_profile_id))));


create policy "Enable read access for all users"
  on "public"."user_organisations"
  as permissive
  for select
  to public
  using (true);


create policy "Enable update for users based on user_id"
  on "public"."user_organisations"
  as permissive
  for update
  to public
  using (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                        FROM user_profiles
                                        WHERE (user_profiles.id = user_organisations.user_profile_id))));



