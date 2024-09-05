insert into storage.buckets (id, name, created_at, updated_at, public, avif_autodetection, allowed_mime_types)
values ('post_covers', 'post_covers', '2024-06-19 17:38:59.771924+00', '2024-06-19 17:38:59.771924+00', false, false,
        '{"image/*"}');

insert into storage.buckets (id, name, created_at, updated_at, public, avif_autodetection, allowed_mime_types)
values ('organization_images', 'organization_images', '2024-06-19 17:38:59.771924+00', '2024-06-19 17:38:59.771924+00',
        false, false,
        '{"image/*"}');

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



