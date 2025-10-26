import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

import Navbar from "@/components/utils/Navbar";
import Footer from "@/components/utils/Footer";

// @ts-expect-error - side-effect import of global CSS without a declaration file
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "وصیت‌نامه",
  description: "با پول یه قهوه وصیت‌نامه خودت رو بنویس ☕",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"fa"} dir="rtl">
      <body className="bg-gray-50 text-gray-900 font-yekan antialiased">
        <NextIntlClientProvider>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
