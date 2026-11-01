-- Run once in the Supabase SQL editor.
-- A vote is a post, a guest and a time. There are no IPs, by design.

create table public.votes (
  post_slug text not null check (char_length(post_slug) between 1 and 200),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_slug, user_id)
);

alter table public.votes enable row level security;

-- Guests can only see, add and remove their own votes
revoke all on public.votes from public, anon, authenticated;
grant select, delete on public.votes to authenticated;
-- Guests only choose the post, so the guest ID and time can't be forged
grant insert (post_slug) on public.votes to authenticated;

create policy "read own votes" on public.votes
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy "add own votes" on public.votes
  for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "remove own votes" on public.votes
  for delete to authenticated
  using (user_id = (select auth.uid()));

-- Everyone can read a total, but never who voted
create function public.vote_count(slug text)
returns bigint
language sql
stable
security definer
set search_path = ''
as $$
  select count(*) from public.votes where post_slug = slug;
$$;

revoke execute on function public.vote_count(text) from public;
grant execute on function public.vote_count(text) to anon, authenticated;
