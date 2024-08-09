import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  // User정보를 local storage에 저장

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
