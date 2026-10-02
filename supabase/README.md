# User accounts list setup

The Users page shows the signup form followed by a read-only account list.
The database permits only administrators to read that list. It returns names,
emails, creation dates, and email-confirmation status. Existing accounts are
included automatically; no copying or backfill is needed.

## One-time Supabase setup

1. Open your Supabase project → SQL Editor → New query.
2. Paste and run `migrations/202610020001_user_accounts_directory.sql`.
3. Open Authentication → Users and copy the **User UID** of your own trusted
   administrator account.
4. In the SQL Editor, replace `ADMIN_USER_UUID` below with that UID, then run:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || '{"role":"admin"}'::jsonb
where id = 'ADMIN_USER_UUID'::uuid
returning id, email, raw_app_meta_data ->> 'role' as role;
```

Confirm the returned email is the intended administrator. This preserves other
app metadata. Do not use `raw_user_meta_data` for permissions: users can edit it.
The new directory checks the database on every request, so click Refresh on the
Users page after setup. No new Vercel environment variables or service-role key
are required.

This permission applies to viewing the directory only. The existing signup form
still follows the app's existing access rules.

## Verification

- As an administrator, visit `/users`: accounts appear below the form, newest first.
- Create a user through the existing form: the list refreshes. Pending confirmation
  means the email has not been confirmed; it is not a statement about whether the
  account is otherwise allowed to sign in.
- As a non-admin account, the list reports that you do not have permission.
- The function rejects anonymous callers and denies non-admin authenticated callers.
- Changing an account's `user_metadata.role` does not grant directory access.

To revoke directory access, remove the admin role in the SQL Editor:

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data - 'role'
where id = 'ADMIN_USER_UUID'::uuid;
```

The function uses an empty search path, explicitly qualified tables, bounded
pagination, and a fixed set of output fields. It does not grant browser clients
access to the `auth.users` table or require an admin secret in client code.

References: [Supabase database functions](https://supabase.com/docs/guides/database/functions),
[Supabase user management](https://supabase.com/docs/guides/auth/managing-user-data).
