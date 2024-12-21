alter table "public"."user_profiles"
  add column "firstname" text;

alter table "public"."user_profiles"
  add column "lastname" text;

UPDATE "public"."user_profiles"
SET firstname = split_part(display_name, ' ', 1),
    lastname  = CASE
                  WHEN array_length(string_to_array(display_name, ' '), 1) > 1
                    THEN substring(display_name from position(' ' in display_name) + 1)
                  ELSE ''
      END;

alter table "public"."user_profiles"
  drop column "display_name";

alter table "public"."user_profiles"
  alter column "firstname" set not null;

alter table "public"."user_profiles"
  alter column "lastname" set not null;
