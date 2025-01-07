import { Geist, Geist_Mono } from "next/font/google";
import SideWindow from "./profileComponents/Sidewindow/Sidewindow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{
        display: "flex",
        backgroundColor: "transparent",
        height: "100vh", // Гарантируем, что высота соответствует экрану
      }}
    >
      <SideWindow />
      <main
        style={{
          flexGrow: 1, // Главное содержимое занимает всё оставшееся пространство
          flexShrink: 1, // Позволяем уменьшаться, если нужно
          flexBasis: 0, // Указываем, что основа равна 0
        }}
      >
        {children}
      </main>
    </div>
  );
}
