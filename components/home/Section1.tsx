"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import CountUp from "react-countup";
import {
  UserGroupIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const Section1 = () => {
  const t = useTranslations("landing");

  const [stats] = useState({
    users: 500,
    wills: 200,
    sent: 100,
  });

  const statsCardsData = [
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
  ];
  return (
    <motion.section
      className="bg-[#89CFF0]/20 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        {statsCardsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="flex-1 p-6 rounded-lg text-center bg-white/80 backdrop-blur-sm shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <stat.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
            <h3 className="text-3xl font-bold text-gray-900">
              <CountUp start={0} end={stat.value} duration={2.5} />+
            </h3>
            <p className="text-lg text-gray-700">{stat.label}</p>
            <p className="text-sm text-gray-500">{stat.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Section1;
