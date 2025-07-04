import { Geist, Geist_Mono } from "next/font/google";
import LibraryUpperPart from "./components/BookShelvesUp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function BooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
     <LibraryUpperPart/>
      <main>
        {children}
      </main>
    </div>
  );
}
