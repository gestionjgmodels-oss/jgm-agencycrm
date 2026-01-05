import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import GridBackground from "@/app/components/GridBackground";
import Chatbot from "@/app/components/Chatbot";
import "../globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { LeadProvider } from "@/app/lib/store";
import { BookingProvider } from "@/app/context/BookingContext";
import BookingModal from "@/app/components/BookingModal";

// Generate static params to ensure Vercel builds /es and /en
export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JG Agency CRM | Management System",
  description: "Advanced management system for JG Models Agency.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 dark:text-gray-100 selection:bg-brand-accent/30 transition-colors duration-300`}
      >
        <ThemeProvider>
          <LeadProvider>
            <BookingProvider>
              <NextIntlClientProvider messages={messages}>
                <GridBackground />
                {children}
                <BookingModal />
              </NextIntlClientProvider>
            </BookingProvider>
          </LeadProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
