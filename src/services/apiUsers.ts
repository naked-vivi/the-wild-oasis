import supabase from "./supabase";

export const USERS_PAGE_SIZE = 10;

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  emailConfirmed: boolean;
}

export interface UserAccountsPage {
  users: UserAccount[];
  count: number;
  page: number;
}

export async function getUserAccounts(page: number): Promise<UserAccountsPage> {
  const { data, error } = await supabase.rpc("list_user_accounts", {
    p_page: page,
    p_page_size: USERS_PAGE_SIZE,
  });

  if (error) {
    if (error.code === "PGRST202" || error.code === "42883") {
      throw new Error("The account list isn't available yet. Contact the project owner to finish setting it up.");
    }
    if (error.code === "42501") {
      throw new Error("You don't have permission to view user accounts.");
    }
    throw new Error("User accounts could not be loaded. Please try again.");
  }

  if (!data || !Array.isArray(data.users) || typeof data.count !== "number" || typeof data.page !== "number") {
    throw new Error("User accounts could not be loaded. Please try again.");
  }
  return data as UserAccountsPage;
}
