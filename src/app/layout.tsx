"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextNProgress from 'nextjs-progressbar';

import { Bounce, ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Marketing Agents | Built by Kognifi.ai</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden max-w-[100vw] `}
      >
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          className={"px-5 py-3"}
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
        <NextNProgress color={"#0a0a0a"} height={2}  />
      </body>
    </html>
  );
}
