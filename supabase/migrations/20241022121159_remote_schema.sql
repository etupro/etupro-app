create policy "Enable read access for all users"
  on "public"."departments"
  as permissive
  for select
  to public
  using (true);



