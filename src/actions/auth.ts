"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("user")
  redirect("/login")
}

export async function deleteAccount() {
  const cookieStore = await cookies()
  const email = JSON.parse(cookieStore.get("user")?.value || "{}")?.email

  if (email) {
    try {
      const response = await fetch(`https://bland.abubakarkhalid.com/users/delete_user/${email}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete account")
      }
    } catch (error) {
      // Handle or throw error as needed
      console.error("Error deleting account:", error)
      throw error
    }
  }

  cookieStore.delete("user")
  redirect("/register")
}