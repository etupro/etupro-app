alter table "public"."student_informations"
  drop constraint "student_informations_user_id_fkey";

alter table "public"."student_informations"
  drop constraint "student_informations_pkey";

drop index if exists "public"."student_informations_pkey";

alter table "public"."student_informations"
  add column "id" bigint not null;

alter table "public"."student_informations"
  alter column "user_id" drop identity;

alter table "public"."user_profiles"
  add column "student_information_id" bigint;

CREATE UNIQUE INDEX user_profiles_student_information_id_key ON public.user_profiles USING btree (student_information_id);

CREATE UNIQUE INDEX student_informations_pkey ON public.student_informations USING btree (id);

alter table "public"."student_informations"
  add constraint "student_informations_pkey" PRIMARY KEY using index "student_informations_pkey";

alter table "public"."user_profiles"
  add constraint "user_profiles_student_information_id_fkey" FOREIGN KEY (student_information_id) REFERENCES student_informations (id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."user_profiles"
  validate constraint "user_profiles_student_information_id_fkey";

alter table "public"."user_profiles"
  add constraint "user_profiles_student_information_id_key" UNIQUE using index "user_profiles_student_information_id_key";

drop policy "Enable insert for student_informations based on user_id" on "public"."student_informations";
drop policy "Enable read access for all users" on "public"."student_informations";
drop policy "Enable update for student_informations based on user_id" on "public"."student_informations";
drop policy "Enable delete for student_informations based on user_id" on "public"."student_informations";

alter table "public"."student_informations"
  drop column "user_id";

create policy "Enable insert for student_informations based on user_id"
  on "public"."student_informations"
  as permissive
  for insert
  to authenticated
  with check ((student_informations.id = (SELECT user_profiles.student_information_id
                                          FROM user_profiles
                                          WHERE (user_profiles.user_id = auth.uid()))));


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
  using ((student_informations.id = (SELECT user_profiles.student_information_id
                                     FROM user_profiles
                                     WHERE (user_profiles.user_id = auth.uid()))));

create policy "Enable delete for student_informations based on user_id"
  on "public"."student_informations"
  as permissive
  for delete
  to authenticated
  using ((student_informations.id = (SELECT user_profiles.student_information_id
                                     FROM user_profiles
                                     WHERE (user_profiles.user_id = auth.uid()))));
