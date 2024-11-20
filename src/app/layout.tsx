import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import Head from "next/head";
import "./globals.css";

export const metadata: Metadata = {
  title: "CamP Ground",
  description: "Created by Surapee Suwan",
};

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSansThai.className} antialiased min-h-screen bg-[#011627]`}
      >
        <Head>
          <title>CamP Ground</title>
        </Head>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
