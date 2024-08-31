drop function if exists "storage"."operation"();

alter table "storage"."objects"
  drop column "user_metadata";

alter table "storage"."s3_multipart_uploads"
  drop column "user_metadata";

create policy "organization_images_edit_authenticated sz2pz8_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
  with check ((bucket_id = 'organization_images'::text));


create policy "organization_images_edit_authenticated sz2pz8_1"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
  using ((bucket_id = 'organization_images'::text));


create policy "organization_images_edit_authenticated sz2pz8_2"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
  using ((bucket_id = 'organization_images'::text));


create policy "organization_images_read_public sz2pz8_0"
  on "storage"."objects"
  as permissive
  for select
  to public
  using ((bucket_id = 'organization_images'::text));


create policy "post_covers_edit_authenticated 3pkz6j_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
  with check ((bucket_id = 'post_covers'::text));


create policy "post_covers_edit_authenticated 3pkz6j_1"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
  using ((bucket_id = 'post_covers'::text));


create policy "post_covers_edit_authenticated 3pkz6j_2"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
  using ((bucket_id = 'post_covers'::text));


create policy "post_covers_read_public 3pkz6j_0"
  on "storage"."objects"
  as permissive
  for select
  to public
  using ((bucket_id = 'post_covers'::text));



