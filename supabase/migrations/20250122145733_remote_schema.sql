create type "public"."user_role" as enum ('stable_owner', 'stable_worker', 'horse_owner');

drop policy "Public profiles are viewable by everyone." on "public"."profiles";

drop policy "Users can update own profile." on "public"."profiles";

alter table "public"."profiles" add column "role" user_role not null default 'stable_worker'::user_role;

create policy "Public profiles are viewable by authenticated only."
on "public"."profiles"
as permissive
for select
to authenticated
using (true);


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = id));



