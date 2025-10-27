"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

import Button from "@/components/utils/Button";

const Landing = () => {
  const t = useTranslations("landing");

  return (
    <div className="h-screen bg-blue-50 relative" dir="rtl">
      {/* bg */}
      <div className="w-full aspect-[4.3/1] relative">
        <Image
          src={"/images/home/lake.webp"}
          alt="دریاچه"
          fill
          className="object-cover"
        ></Image>
        <div className="absolute h-20 bottom-0 w-full bg-gradient-to-white"></div>
      </div>
      {/* decor */}
      <div className="absolute top-0 left-0 size-full overflow-hidden opacity-40 z-0 pointer-events-none">
        <svg className="size-full" viewBox="0 0 1440 250">
          <path
            fill="url(#gradient)"
            d="M0,400C200,300,400,500,720,400C1040,300,1240,500,1440,400V600H0Z"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#4B6CB7", stopOpacity: 0.3 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#89CFF0", stopOpacity: 0 }}
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* main text */}
      <main className="container flex flex-col items-center text-center pt-4 pb-12 z-10">
        <motion.h1
          className="text-4xl md:text-5xl max-w-3xl leading-tight font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("heroTitle")}
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 mt-4 max-w-2xl"
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
          className="mt-6"
        >
          <Button variant="primary" size="lg" href="/login">
            {t("start")}
          </Button>
          <Button variant="secondary" size="lg" href="/about" className="mr-4">
            بیشتر بدانید
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Landing;
