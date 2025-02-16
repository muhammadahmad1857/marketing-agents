import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ViewTransitions } from 'next-view-transitions'
import { Bounce, ToastContainer } from "react-toastify";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Marketing Agents | Built by Kognifi.ai",
  description: "Mkae your life easier by using this",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* <title>Marketing Agents | Built by Kognifi.ai</title> */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden max-w-[100vw] `}
      >
        <ViewTransitions>
        <NextTopLoader color="#0a0a0a" height={5} />
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
        /></ViewTransitions>
      </body>
    </html>
  );
}
