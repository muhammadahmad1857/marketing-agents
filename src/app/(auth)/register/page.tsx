"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Link} from "next-view-transitions";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("admin"); // "admin" or "user"
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !role) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/register", {
        user_name: username,
        email,
        password,
        role,
      });
      console.log("response", response);
      toast.success(response.data.message || "User registered successfully");

      // Store the user's email in local storage so it can be used in other pages
      localStorage.setItem("userEmail", email);

      // Reset form fields
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("admin");

      // Redirect to the homepage or another route
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.detail ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-6">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>Create an account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                {/* Username Field */}
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* Email Field */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Role Selection Dropdown */}
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
