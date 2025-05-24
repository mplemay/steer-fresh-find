-- Migration file for onboarding data structures and policies
-- Creates profiles and user_preferences tables with appropriate RLS policies

-- Create the profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  delivery_instructions text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.profiles is 'User profile information collected during onboarding, including delivery addresses and onboarding completion status.';

-- Create the user_preferences table
create table public.user_preferences (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  ribeye_preferred boolean not null default false,
  ground_beef_preferred boolean not null default false,
  filet_mignon_preferred boolean not null default false,
  brisket_preferred boolean not null default false,
  quantity integer not null default 1,
  frequency text not null check (frequency in ('weekly', 'bi-weekly', 'monthly')),
  monthly_budget numeric(10, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);
comment on table public.user_preferences is 'User beef preferences including preferred cuts, delivery frequency, quantity, and budget information collected during onboarding.';

-- Create a dummy products table for recommendations
create table public.products (
  id bigint generated always as identity primary key,
  name text not null,
  price numeric(10, 2) not null,
  weight text not null,
  image text not null,
  farm text not null,
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.products is 'Beef products available for purchase, including pricing, source farm, and descriptions.';

-- Insert initial product data
insert into public.products (name, price, weight, image, farm, description) values
  ('Premium Ribeye Steak', 24.99, '12oz', 'https://images.unsplash.com/photo-1603048297172-c92544817d14?auto=format&fit=crop&q=80', 'Green Pastures Farm', 'Beautifully marbled grass-fed ribeye, perfect for grilling'),
  ('Ground Beef Bundle', 39.99, '5lb', 'https://images.unsplash.com/photo-1551135570-7631a61d31aa?auto=format&fit=crop&q=80', 'Rocky Mountain Ranch', 'Lean ground beef, perfect for burgers and everyday cooking'),
  ('Filet Mignon', 29.99, '8oz', 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80', 'Heritage Cattle Co.', 'Tender, melt-in-your-mouth filet from pasture-raised cattle'),
  ('Beef Brisket', 49.99, '4lb', 'https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?auto=format&fit=crop&q=80', 'Sunrise Farms', 'Slow-cook to perfection for an unforgettable BBQ experience');

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.user_preferences enable row level security;
alter table public.products enable row level security;

-- Create functions to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Create triggers for updated_at
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute procedure public.handle_updated_at();

create trigger set_user_preferences_updated_at
before update on public.user_preferences
for each row execute procedure public.handle_updated_at();

create trigger set_products_updated_at
before update on public.products
for each row execute procedure public.handle_updated_at();

-- RLS Policies for profiles table
create policy "Users can view their own profile."
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can insert their own profile."
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "Users can update their own profile."
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Users can delete their own profile."
on public.profiles
for delete
to authenticated
using ((select auth.uid()) = id);

-- RLS Policies for user_preferences table
create policy "Users can view their own preferences."
on public.user_preferences
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert their own preferences."
on public.user_preferences
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own preferences."
on public.user_preferences
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own preferences."
on public.user_preferences
for delete
to authenticated
using ((select auth.uid()) = user_id);

-- RLS Policies for products table (public readable, admin writable)
create policy "Anyone can view products."
on public.products
for select
to authenticated, anon
using (true);
