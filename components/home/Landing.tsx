"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Landing = () => {
  const t = useTranslations("landing");
  const [stats, setStats] = useState({
    users: 500,
    wills: 200,
    sent: 100,
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url(/images/home/landing.jpg)" }}
      dir="rtl" // برای پشتیبانی RTL فارسی
    >
      {/* Overlay برای خوانایی متن */}
      <div className="absolute inset-0 bg-black/40"></div>

      <main className="relative text-center py-20 z-10 ">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 mt-20">
          {t("heroTitle")}
        </h1>
        <p className="text-xl text-white mt-4 max-w-2xl mx-auto">
          {t("heroSubtitle")}
        </p>
        <Link href="/login">
          <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
            {t("start")}
          </button>
        </Link>
      </main>

      <section className="relative grid grid-cols-1 md:grid-cols-3 gap-4 p-4 z-10">
        <div className="bg-black/10 backdrop-blur-xs p-6 rounded-lg text-white text-center shadow-md">
          <h3 className="text-3xl font-bold">{stats.users}+</h3>
          <p>{t("statsUsers")}</p>
        </div>
        <div className="bg-black/10 backdrop-blur-xs p-6 rounded-lg text-white text-center shadow-md">
          <h3 className="text-3xl font-bold">{stats.wills}+</h3>
          <p>{t("statsWills")}</p>
        </div>
        <div className="bg-black/10 backdrop-blur-xs p-6 rounded-lg text-white text-center shadow-md">
          <h3 className="text-3xl font-bold">{stats.sent}+</h3>
          <p>{t("statsSent")}</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
