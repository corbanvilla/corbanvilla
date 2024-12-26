import type { Metadata } from "next";

import { 
  IBM_Plex_Sans,
  IBM_Plex_Mono
} from "next/font/google";
import "./globals.css";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: '--font-mono',
});
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Corban Villa",
  description: "Corban Villa's Site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
