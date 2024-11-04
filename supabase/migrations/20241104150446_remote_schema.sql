create policy "Delete admin"
on "public"."comments"
as permissive
for delete
to public
using (('SUPER_ADMIN'::roles = ( SELECT user_profiles.role
   FROM user_profiles
  WHERE (user_profiles.user_id = auth.uid()))));


create policy "Delete admin"
on "public"."posts"
as permissive
for delete
to public
using (('SUPER_ADMIN'::roles = ( SELECT user_profiles.role
   FROM user_profiles
  WHERE (user_profiles.user_id = auth.uid()))));


create policy "Delete admin"
on "public"."user_profiles"
as permissive
for delete
to public
using (('SUPER_ADMIN'::roles = ( SELECT user_profiles_1.role
   FROM user_profiles user_profiles_1
  WHERE (user_profiles_1.user_id = auth.uid()))));



