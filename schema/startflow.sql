create table if not exists public.umkm_profile (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  store_name varchar(100) not null,         
  business_type varchar(50) not null,      
  description text,                         

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_umkm_profile_user_id on public.umkm_profile (user_id);
