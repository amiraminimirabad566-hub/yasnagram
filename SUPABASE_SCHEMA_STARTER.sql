-- طرح اولیه؛ فقط پس از ساخت پروژه Supabase و بررسی سیاست‌های امنیتی اجرا شود.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  bio text default '',
  created_at timestamptz default now()
);
create table if not exists public.posts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 1000),
  created_at timestamptz default now()
);
create table if not exists public.likes (
  post_id bigint references public.posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  primary key(post_id,user_id)
);
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.likes enable row level security;
create policy "profiles readable" on public.profiles for select using (true);
create policy "users update own profile" on public.profiles for update using (auth.uid()=id);
create policy "posts readable" on public.posts for select using (true);
create policy "users create own posts" on public.posts for insert with check (auth.uid()=user_id);
create policy "users delete own posts" on public.posts for delete using (auth.uid()=user_id);
create policy "likes readable" on public.likes for select using (true);
create policy "users manage own likes" on public.likes for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
