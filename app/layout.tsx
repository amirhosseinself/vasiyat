import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

// @ts-expect-error - side-effect import of global CSS without a declaration file
import "./globals.css";

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
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
