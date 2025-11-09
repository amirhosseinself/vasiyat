"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Heart, ArrowDown, Shield, Users, Clock } from "lucide-react";
import Button from "@/components/utils/Button";

const Landing = () => {
  const t = useTranslations("landing");
  const { scrollY } = useScroll();

  // Parallax effect for background
  const imageY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -30]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white" dir="rtl">
      {/* Background Image with Dark Overlay */}
      <motion.div
        style={{ y: imageY }}
        className="absolute top-0 left-0 right-0 h-full z-0"
      >
        <div className="relative w-full h-full">
          <Image
            src={"/images/home/lake.webp"}
            alt="دریاچه آرامش"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Dark overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.main
        style={{ y: contentY }}
        className="relative z-10 container-custom flex flex-col items-center text-center pt-32 md:pt-48 pb-24 min-h-screen justify-center"
      >
        {/* Animated Heart Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0 bg-accent/30 rounded-full blur-2xl"
            />
            <Heart
              className="text-white relative z-10 drop-shadow-2xl"
              fill="currentColor"
              size={72}
            />
          </div>
        </motion.div>

        {/* Title - Simple and Clear */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-tight font-extrabold text-white mb-8 drop-shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t("heroTitle")}
        </motion.h1>

        {/* Subtitle - Wider for better readability */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-white/95 mt-4 max-w-4xl leading-relaxed font-medium drop-shadow-lg px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {t("heroSubtitle")}
        </motion.p>

        {/* Trust Features - Horizontal Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full px-4"
        >
          {[
            { icon: Shield, text: "امنیت کامل" },
            { icon: Clock, text: "تحویل به‌موقع" },
            { icon: Users, text: "قابل اعتماد" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20"
            >
              <feature.icon className="text-white" size={24} />
              <span className="text-white font-medium text-lg">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Button
            variant="primary"
            size="xl"
            href="/login"
            className="shadow-2xl bg-white text-primary hover:bg-gray-100"
          >
            {t("start")}
          </Button>
          <Button
            variant="outline"
            size="xl"
            href="#how-it-works"
            className="border-2 border-white text-white hover:bg-white/10"
          >
            بیشتر بدانید
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.8 },
            y: { duration: 1.5, repeat: Infinity },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-sm">ادامه مطالب</span>
            <ArrowDown size={24} />
          </div>
        </motion.div>
      </motion.main>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10">
        <svg
          className="w-full h-24 md:h-32"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Landing;
