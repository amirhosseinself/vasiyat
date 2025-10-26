"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import Button from "@/components/utils/Button";

const Landing = () => {
  const t = useTranslations("landing");
  const [stats] = useState({
    users: 500,
    wills: 200,
    sent: 100,
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url(/images/home/landing.jpg)" }}
      dir="rtl"
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <main className="relative text-center py-20 z-10">
        <h1 className="text-4xl md:text-5xl font-yekan font-bold text-white mb-4 mt-20">
          {t("heroTitle")}
        </h1>
        <p className="text-xl text-white mt-4 max-w-2xl mx-auto">
          {t("heroSubtitle")}
        </p>
        <Button className="mt-4" variant="secondary" size="lg" href="/login">
          {t("start")}
        </Button>
      </main>

      {/* <section className="relative grid grid-cols-1 md:grid-cols-3 gap-4 p-4 z-10">
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
      </section> */}
    </div>
  );
};

export default Landing;
