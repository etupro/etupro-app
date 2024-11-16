create policy "Admin insert"
on "public"."comments"
as permissive
for insert
to public
with check (('SUPER_ADMIN'::roles = ( SELECT user_profiles.role
   FROM user_profiles
  WHERE (user_profiles.user_id = auth.uid()))));


create policy "Admin update"
on "public"."comments"
as permissive
for update
to public
using (('SUPER_ADMIN'::roles = ( SELECT user_profiles.role
   FROM user_profiles
  WHERE (user_profiles.user_id = auth.uid()))));


create policy "Admin insert"
on "public"."posts"
as permissive
for insert
to public
with check (('SUPER_ADMIN'::roles = ( SELECT user_profiles.role
   FROM user_profiles
  WHERE (user_profiles.user_id = auth.uid()))));


create policy "Admin update"
on "public"."posts"
as permissive
for update
to public
using (('SUPER_ADMIN'::roles = ( SELECT user_profiles.role
   FROM user_profiles
  WHERE (user_profiles.user_id = auth.uid()))));


create policy "Admin insert"
on "public"."user_profiles"
as permissive
for insert
to public
with check (('SUPER_ADMIN'::roles = ( SELECT user_profiles_1.role
   FROM user_profiles user_profiles_1
  WHERE (user_profiles_1.user_id = auth.uid()))));


create policy "Admin update"
on "public"."user_profiles"
as permissive
for update
to public
using (('SUPER_ADMIN'::roles = ( SELECT user_profiles_1.role
   FROM user_profiles user_profiles_1
  WHERE (user_profiles_1.user_id = auth.uid()))));



