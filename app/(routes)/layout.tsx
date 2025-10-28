import type { Metadata } from "next";

import Navbar from "@/components/utils/Navbar";
import Footer from "@/components/utils/Footer";

export const metadata: Metadata = {
  title: "وصیت‌نامه",
  description: "برای آینده. وصیت‌نامه خودت رو بنویس ",
};

export default async function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"fa"} dir="rtl">
      <body className="bg-gray-50 text-gray-900 font-yekan antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
