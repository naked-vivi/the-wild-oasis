-- Apply in the Supabase SQL Editor as the project owner.
-- Returns only account-directory fields; never passwords, tokens, or metadata.
begin;

create or replace function public.list_user_accounts(
  p_page integer default 1,
  p_page_size integer default 10
)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  total_count bigint;
  current_page integer;
  account_rows jsonb;
begin
  -- Read the current admin assignment from the database, not editable user
  -- metadata or a potentially stale JWT. Anonymous callers cannot pass.
  if auth.uid() is null or not exists (
    select 1 from auth.users as caller
    where caller.id = auth.uid()
      and caller.deleted_at is null
      and caller.raw_app_meta_data ->> 'role' = 'admin'
  ) then
    raise exception 'Only administrators may view user accounts.'
      using errcode = '42501';
  end if;

  if p_page is null or p_page < 1 or p_page_size is null
     or p_page_size < 1 or p_page_size > 100 then
    raise exception 'Invalid pagination parameters.' using errcode = '22023';
  end if;

  select count(*) into total_count
  from auth.users as account
  where account.deleted_at is null and account.is_anonymous is not true;

  current_page := least(p_page::bigint, greatest(1, (total_count + p_page_size - 1) / p_page_size))::integer;

  select coalesce(jsonb_agg(jsonb_build_object(
    'id', account.id,
    'fullName', coalesce(account.raw_user_meta_data ->> 'fullName', ''),
    'email', coalesce(account.email, ''),
    'createdAt', account.created_at,
    'emailConfirmed', account.email_confirmed_at is not null
  ) order by account.created_at desc, account.id desc), '[]'::jsonb)
  into account_rows
  from (
    select id, raw_user_meta_data, email, created_at, email_confirmed_at
    from auth.users
    where deleted_at is null and is_anonymous is not true
    order by created_at desc, id desc
    limit p_page_size offset ((current_page::bigint - 1) * p_page_size)
  ) as account;

  return jsonb_build_object('users', account_rows, 'count', total_count, 'page', current_page);
end;
$$;

revoke all on function public.list_user_accounts(integer, integer) from public, anon, authenticated;
grant execute on function public.list_user_accounts(integer, integer) to authenticated;

comment on function public.list_user_accounts(integer, integer) is
  'Read-only, paginated account directory. Requires app_metadata.role = admin, verified in auth.users.';

commit;
