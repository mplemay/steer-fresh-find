-- Make onboarding fields optional in profiles table
alter table public.profiles 
alter column address_line1 drop not null,
alter column city drop not null,
alter column state drop not null,
alter column postal_code drop not null,
alter column onboarding_completed set default true;

-- Update existing profiles to mark them as onboarded
update public.profiles set onboarding_completed = true;
