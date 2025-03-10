"use client";

import type React from "react";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      title="Camilo Arango - Senior Software Engineer"
    >
      <head>
        <link
          rel="icon"
          href="/favicon-16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32.png"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-64.png"
          sizes="64x64"
          type="image/png"
        />
        <meta name="theme-color" content="#0a0b1e" />
        <meta
          name="description"
          content="Camilo Arango - Senior Software Engineer with over 6 years of development experience. Passionate about building scalable solutions and improving developer experience."
        />
        <meta
          name="keywords"
          content="Software Engineer, Full Stack Developer, React, NextJS, NestJS, TypeScript, JavaScript"
        />
        <meta name="author" content="Camilo Arango" />
        <meta
          property="og:title"
          content="Camilo Arango - Senior Software Engineer"
        />
        <meta
          property="og:description"
          content="Portfolio of Camilo Arango, a Senior Software Engineer with expertise in React, NextJS, NestJS, and cloud technologies."
        />
        <meta property="og:type" content="website" />
        <title>Camilo Arango - Senior Software Engineer</title>
      </head>
      <body className={spaceGrotesk.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
