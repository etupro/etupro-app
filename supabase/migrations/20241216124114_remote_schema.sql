create table "public"."communes"
(
  "code"            text                     not null,
  "created_at"      timestamp with time zone not null default now(),
  "updated_at"      timestamp with time zone not null default now(),
  "code_department" text                     not null,
  "zip_code"        text                     not null,
  "name"            text                     not null
);


alter table "public"."communes"
  enable row level security;

create table "public"."regions"
(
  "created_at" timestamp with time zone not null default now(),
  "updated_at" timestamp with time zone not null default now(),
  "code"       text                     not null,
  "name"       text                     not null
);


alter table "public"."regions"
  enable row level security;

alter table "public"."departments"
  add column "code" text;

alter table "public"."departments"
  add column "code_region" text;

alter table "public"."departments"
  alter column "region" drop not null;

CREATE UNIQUE INDEX communes_pkey ON public.communes USING btree (code);

CREATE UNIQUE INDEX regions_pkey ON public.regions USING btree (code);

alter table "public"."communes"
  add constraint "communes_pkey" PRIMARY KEY using index "communes_pkey";

alter table "public"."regions"
  add constraint "regions_pkey" PRIMARY KEY using index "regions_pkey";

alter table "public"."departments"
  add constraint "departments_code_region_fkey" FOREIGN KEY (code_region) REFERENCES regions (code) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."departments"
  validate constraint "departments_code_region_fkey";

grant delete on table "public"."communes" to "anon";

grant insert on table "public"."communes" to "anon";

grant references on table "public"."communes" to "anon";

grant select on table "public"."communes" to "anon";

grant trigger on table "public"."communes" to "anon";

grant truncate on table "public"."communes" to "anon";

grant update on table "public"."communes" to "anon";

grant delete on table "public"."communes" to "authenticated";

grant insert on table "public"."communes" to "authenticated";

grant references on table "public"."communes" to "authenticated";

grant select on table "public"."communes" to "authenticated";

grant trigger on table "public"."communes" to "authenticated";

grant truncate on table "public"."communes" to "authenticated";

grant update on table "public"."communes" to "authenticated";

grant delete on table "public"."communes" to "service_role";

grant insert on table "public"."communes" to "service_role";

grant references on table "public"."communes" to "service_role";

grant select on table "public"."communes" to "service_role";

grant trigger on table "public"."communes" to "service_role";

grant truncate on table "public"."communes" to "service_role";

grant update on table "public"."communes" to "service_role";

grant delete on table "public"."regions" to "anon";

grant insert on table "public"."regions" to "anon";

grant references on table "public"."regions" to "anon";

grant select on table "public"."regions" to "anon";

grant trigger on table "public"."regions" to "anon";

grant truncate on table "public"."regions" to "anon";

grant update on table "public"."regions" to "anon";

grant delete on table "public"."regions" to "authenticated";

grant insert on table "public"."regions" to "authenticated";

grant references on table "public"."regions" to "authenticated";

grant select on table "public"."regions" to "authenticated";

grant trigger on table "public"."regions" to "authenticated";

grant truncate on table "public"."regions" to "authenticated";

grant update on table "public"."regions" to "authenticated";

grant delete on table "public"."regions" to "service_role";

grant insert on table "public"."regions" to "service_role";

grant references on table "public"."regions" to "service_role";

grant select on table "public"."regions" to "service_role";

grant trigger on table "public"."regions" to "service_role";

grant truncate on table "public"."regions" to "service_role";

grant update on table "public"."regions" to "service_role";


