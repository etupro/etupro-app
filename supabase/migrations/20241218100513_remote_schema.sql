CREATE UNIQUE INDEX user_profiles_user_id_key ON public.user_profiles USING btree (user_id);

alter table "public"."user_profiles"
  add constraint "user_profiles_user_id_key" UNIQUE using index "user_profiles_user_id_key";

insert into storage.buckets (id, name, created_at, updated_at, public, avif_autodetection, allowed_mime_types)
values ('profile_pictures', 'profile_pictures', '2024-12-18 11:00:37.962808+00', '2024-12-18 11:00:37.962808+00',
        false, false,
        '{"image/*"}');

create policy "profile_pictures_insert_authenticated sz2pz8_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
  with check ((bucket_id = 'profile_pictures'::text));


create policy "profile_pictures_edit_authenticated sz2pz8_1"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
  using ((bucket_id = 'profile_pictures'::text));


create policy "profile_pictures_delete_authenticated sz2pz8_2"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
  using ((bucket_id = 'profile_pictures'::text));


create policy "profile_pictures_read_public sz2pz8_0"
  on "storage"."objects"
  as permissive
  for select
  to public
  using ((bucket_id = 'profile_pictures'::text));
