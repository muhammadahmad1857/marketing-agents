import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const fetchResponse = await fetch(
      "https://bland.abubakarkhalid.com/users/verify_user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    // Check if the request was successful
    if (fetchResponse.ok) {
      const data = await fetchResponse.json();
      const res = NextResponse.json(
        { message: data.message },
        { status: 200 }
      );

      const userCookies = JSON.stringify({
        logged_in: true,
        email,
      });

      // Set the logged_in cookie immediately after login
      res.cookies.set("user", userCookies, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400, // 24 hours in seconds
      });

      return res;
    } else {
      const errorData = await fetchResponse.json();
      return NextResponse.json(
        { message: errorData.detail || "Unauthorized" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Login failed!" },
      { status: 500 }
    );
  }
}
