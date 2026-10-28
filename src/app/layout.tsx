import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sandesh.dev"),
  title: {
    default: "Sandesh Waghmare | Developer & Computer Engineering Student",
    template: "%s | Sandesh Waghmare",
  },
  description:
    "Personal portfolio of Sandesh Waghmare — Computer Engineering student and developer specializing in modern frontend architectures, Next.js, React, TypeScript, C++, and interactive web applications.",
  keywords: [
    "Sandesh Waghmare",
    "Computer Engineering",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Web Developer",
    "Portfolio",
    "Pune Developer",
    "PCCOE",
  ],
  authors: [{ name: "Sandesh Waghmare", url: "https://github.com/Sandesh-Ganpati-Waghmare773" }],
  creator: "Sandesh Waghmare",
  publisher: "Sandesh Waghmare",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Sandesh Waghmare | Developer & Computer Engineering Student",
    description:
      "Explore the portfolio of Sandesh Waghmare. Showcasing projects in Next.js, React, algorithms, certificates, and technical services.",
    url: "https://sandesh.dev",
    siteName: "Sandesh Waghmare Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo-full.png",
        width: 805,
        height: 553,
        alt: "Sandesh Waghmare - Software Developer Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandesh Waghmare | Developer & Computer Engineering Student",
    description:
      "Explore the developer portfolio of Sandesh Waghmare — projects, skills, certificates, and technical web services.",
    images: ["/images/logo-full.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo-icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
    shortcut: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0D0F] text-[#F5F5F5]">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

