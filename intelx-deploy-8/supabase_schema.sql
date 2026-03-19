-- ─────────────────────────────────────────────
-- intelX — Supabase schema
-- Run this in: Supabase → SQL Editor → New query
-- ─────────────────────────────────────────────

-- 1. Districts (92 rows)
create table if not exists districts (
  name        text primary key,
  region      text not null,
  urban       integer not null default 0,  -- 0=rural, 1=urban
  seats       integer not null,
  votes       jsonb not null,               -- {RNI:49865, PAM:14724, ...}
  winner_11   text,
  winner_15   text,
  winner_16   text,
  winner_21   text not null,
  margin      numeric not null,
  youth_pct   integer not null default 0
);

-- 2. Turnout map (92 rows)
create table if not exists turnout (
  district    text primary key references districts(name),
  to11        numeric, to15 numeric, to16 numeric, to21 numeric,
  to_leg      numeric,
  delta       numeric,
  elas        numeric,
  voix_add    integer,
  prog        numeric
);

-- 3. Communes (1537 rows)
create table if not exists communes (
  id          serial primary key,
  district    text not null references districts(name),
  name        text not null,
  winner      text not null,
  total_votes integer not null,
  margin      numeric not null,
  urban       integer not null default 0,
  votes       jsonb not null
);
create index if not exists idx_communes_district on communes(district);

-- 4. Baseline simulation (single row with full result object)
create table if not exists baseline_sim (
  id          integer primary key default 1,
  national    jsonb not null,   -- {RNI:78, PAM:70, ...}
  ci          jsonb not null,   -- {RNI:"74-80", ...}
  ci_lo       jsonb not null,
  ci_hi       jsonb not null,
  runs        integer not null,
  label       text,
  districts   jsonb not null    -- per-district seat allocations
);

-- 5. Historical national results
create table if not exists hist_national (
  year        text not null,
  party       text not null,
  seats       integer not null,
  primary key (year, party)
);

-- Enable Row Level Security (read-only public access is fine since login is app-level)
alter table districts     enable row level security;
alter table turnout       enable row level security;
alter table communes      enable row level security;
alter table baseline_sim  enable row level security;
alter table hist_national enable row level security;

-- Allow read access with the anon key (app verifies login separately)
create policy "read districts"     on districts     for select using (true);
create policy "read turnout"       on turnout       for select using (true);
create policy "read communes"      on communes      for select using (true);
create policy "read baseline_sim"  on baseline_sim  for select using (true);
create policy "read hist_national" on hist_national for select using (true);
