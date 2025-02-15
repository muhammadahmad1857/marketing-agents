import { NextResponse } from "next/server";

interface User {
  user_name: string;
  email: string;
  password: string;
  role: string;
}

export async function POST(request: Request) {
  const data: User = await request.json();

  try {
    const fetchResponse = await fetch(
      "https://bland.abubakarkhalid.com/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (fetchResponse.ok) {
      // Optionally, you can use the actual message from the API response
      await fetchResponse.json();
      const res = NextResponse.json(
        { message: "User registered successfully" },
        { status: 200 }
      );
      const userCookies = JSON.stringify({
        logged_in: true,
        email: data.email,
      });
      // Set the logged_in cookie immediately after registration
      res.cookies.set("user", userCookies, {
        httpOnly: false, // Accessible via client-side JavaScript
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400, // 24 hours in seconds
      });

      return res;
    }

    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
