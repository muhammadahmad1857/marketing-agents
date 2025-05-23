"use server";

import { cookies } from "next/headers";

export async function getCurrentUser() {
  console.log("User fetching startedd");
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    throw new Error("User not authenticated");
  }

  const { email } = JSON.parse(userCookie.value);

  const response = await fetch(
    `https://bland.abubakarkhalid.com/users/get_user/${email}`
  );
  if (!response.ok) {
    console.error("Failed to authenticate user");
    throw new Error("Failed to fetch user data");

  }
  const responseJSON = await response.json();
  console.log("User fetched successfully", responseJSON);
  return responseJSON;
}
