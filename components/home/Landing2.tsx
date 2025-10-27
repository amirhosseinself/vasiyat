// components/home/Landing.tsx
"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  UserGroupIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import Button from "@/components/utils/Button";

const Landing2 = () => {
  const t = useTranslations("landing");
  const [stats] = useState({
    users: 500,
    wills: 200,
    sent: 100,
  });

  return (
    <div
      className="h-screen pt-[75px] bg-cover bg-center relative flex flex-col justify-between"
      style={{ backgroundImage: "url(/images/home/landing.jpg)" }}
      dir="rtl"
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <main className="container relative z-10 flex flex-col items-start">
        <motion.h1
          className="text-4xl md:text-5xl max-w-2xl leading-tight font-bold text-white mb-6 mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("heroTitle")}
        </motion.h1>
        <motion.p
          className="text-xl text-gray-100 mt-4 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("heroSubtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button className="mt-4" variant="primary" size="lg" href="/login">
            <span className="flex items-center gap-2">
              {t("start")}

              <ArrowLeftIcon className="size-6" />
            </span>
          </Button>
        </motion.div>
      </main>

      <motion.section
        className="bg-black/20 backdrop-blur-[1px] relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex justify-between items-center gap-4">
          {[
            {
              value: stats.users,
              label: t("statsUsers"),
              desc: t("statsUsersDesc"),
              icon: UserGroupIcon,
            },
            {
              value: stats.wills,
              label: t("statsWills"),
              desc: t("statsWillsDesc"),
              icon: DocumentTextIcon,
            },
            {
              value: stats.sent,
              label: t("statsSent"),
              desc: t("statsSentDesc"),
              icon: PaperAirplaneIcon,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="pt-4 pb-2 rounded-lg text-white text-center shadow-md "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
            >
              <h3 className="text-4xl font-bold flex justify-center items-center gap-2 mb-4">
                <stat.icon className="size-10" />
                <CountUp start={0} end={stat.value} duration={2.5} />+
              </h3>
              <p className="text-lg">{stat.label}</p>
              <p className="text-sm opacity-80">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Landing2;
