import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  try {
    const response = await axios.post(
      "https://bland.abubakarkhalid.com/users/verify_user",
      {
        email,
        password,
      }
    );

    // Assuming a successful response returns a status field or similar
    if (response.status === 200) {
      const res = NextResponse.json(
        { message: response.data.message },
        { status: 200 }
      );

      const userCookies = JSON.stringify({
        logged_in: true,
        email: email,
      });
      // Set the logged_in cookie immediately after registration
      res.cookies.set("user", userCookies, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
      });

      return res;
    }

    // If login failed, send an unauthorized response
    return NextResponse.json(
      { message: response.data.detail },
      { status: 401 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Login failed!" }, { status: 500 });
  }
}
