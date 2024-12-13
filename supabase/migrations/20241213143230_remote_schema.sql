create policy "Enable insert for student_informations based on user_id"
  on "public"."student_informations"
  as permissive
  for insert
  to authenticated
  with check (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                             FROM user_profiles
                                             WHERE (user_profiles.id = student_informations.user_id))));


create policy "Enable read access for all users"
  on "public"."student_informations"
  as permissive
  for select
  to public
  using (true);


create policy "Enable update for student_informations based on user_id"
  on "public"."student_informations"
  as permissive
  for update
  to authenticated
  using (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                        FROM user_profiles
                                        WHERE (user_profiles.id = student_informations.user_id))));

create policy "Enable delete for student_informations based on user_id"
  on "public"."student_informations"
  as permissive
  for delete
  to authenticated
  using (((SELECT auth.uid() AS uid) = (SELECT user_profiles.user_id
                                        FROM user_profiles
                                        WHERE (user_profiles.id = student_informations.user_id))));

create policy "Admin insert"
  on "public"."student_informations"
  as permissive
  for insert
  to authenticated
  with check (('SUPER_ADMIN'::roles = (SELECT user_profiles.role
                                       FROM user_profiles
                                       WHERE (user_profiles.user_id = auth.uid()))));


create policy "Admin update"
  on "public"."student_informations"
  as permissive
  for update
  to authenticated
  using (('SUPER_ADMIN'::roles = (SELECT user_profiles.role
                                  FROM user_profiles
                                  WHERE (user_profiles.user_id = auth.uid()))));


create policy "Admin delete"
  on "public"."student_informations"
  as permissive
  for delete
  to authenticated
  using (('SUPER_ADMIN'::roles = (SELECT user_profiles.role
                                  FROM user_profiles
                                  WHERE (user_profiles.user_id = auth.uid()))));
