import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/app/global.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3D Apple",
  description: "Desarrollo de un sitio web con GSAP y Three.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
