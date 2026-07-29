create extension if not exists pgcrypto;

create table if not exists public.story_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  background text not null check (char_length(background) between 20 and 2000),
  story_summary_html text not null,
  story_summary_text text not null check (char_length(story_summary_text) between 50 and 10000),
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'reviewing', 'contacted', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.story_submissions enable row level security;

create index if not exists story_submissions_created_at_idx
  on public.story_submissions (created_at desc);

create index if not exists story_submissions_status_idx
  on public.story_submissions (status);

comment on table public.story_submissions is
  'Private story pitches submitted through the public website. Writes happen through the server API only.';
