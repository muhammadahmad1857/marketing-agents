import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen min-h-screen flex items-center flex-col justify-center">
      <h3 className="text-3xl  font-bold">Kognifi.ai</h3>
      {children}
      <span className="my-4 border-t-gray-500 border-t w-4/5 mx-auto" />
      <footer className="mb-3">
        <p className="text-center text-gray-600">
          &copy; Made with love by{" "}
          <Link
            target="_blank"
            href={"https://kognifi.ai"}
            className="  font-bold"
          >
            Kognifi.ai
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default AuthLayout;
