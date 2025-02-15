import axios from "axios";
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
    const response = await axios.post(
      "https://bland.abubakarkhalid.com/users/register",
      data
    );

    if (response.status === 200) {
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
        httpOnly: false, // Now accessible via client-side JavaScript
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400,
      });

      return res;
    }

    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
