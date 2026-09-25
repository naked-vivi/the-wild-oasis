import supabase from "./supabase";

interface LoginCredentials {
    email: string;
    password: string;
}

export async function login({ email, password }: LoginCredentials) {

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error)
        throw new Error(error.message)

    return data;
}
