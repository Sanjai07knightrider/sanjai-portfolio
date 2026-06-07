import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://sanjairamanathan.com"),
  title: "Sanjai Ramanathan | Developer",
  description: "AI & Data Science Student, Full Stack Developer, Data Analytics Enthusiast building modern web applications and AI-powered solutions.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  openGraph: {
    title: "Sanjai Ramanathan | Developer",
    description: "AI & Data Science Student, Full Stack Developer, Data Analytics Enthusiast building modern web applications and AI-powered solutions.",
    url: "https://github.com/Sanjai07knightrider",
    siteName: "Sanjai Ramanathan Portfolio",
    images: [
      {
        url: "/images/portrait_fallback.png",
        width: 1200,
        height: 630,
        alt: "Sanjai Ramanathan | Developer Portfolio"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanjai Ramanathan | Developer",
    description: "AI & Data Science Student, Full Stack Developer, Data Analytics Enthusiast building modern web applications and AI-powered solutions.",
    images: ["/images/portrait_fallback.png"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
