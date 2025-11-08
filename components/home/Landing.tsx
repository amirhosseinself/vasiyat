"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Heart, ArrowDown, Sparkles } from "lucide-react";
import Button from "@/components/utils/Button";

const Landing = () => {
  const t = useTranslations("landing");
  const { scrollY } = useScroll();

  // Parallax effect for background
  const imageY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 via-purple-50 to-white" dir="rtl">
      {/* Animated Background Image with Parallax */}
      <motion.div
        style={{ y: imageY }}
        className="absolute top-0 left-0 right-0 h-[70vh] z-0"
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
          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20" />
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-emotional opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-gradient-secondary opacity-15 rounded-full blur-3xl" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles
              className="text-accent/30"
              size={Math.random() * 20 + 10}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.main
        style={{ y: contentY, opacity }}
        className="relative z-10 container-custom flex flex-col items-center text-center pt-32 md:pt-40 pb-20"
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
          className="mb-6"
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
              className="absolute inset-0 bg-accent/20 rounded-full blur-xl"
            />
            <Heart
              className="text-accent relative z-10"
              fill="currentColor"
              size={64}
            />
          </div>
        </motion.div>

        {/* Title with elegant animation */}
        <motion.h1
          className="text-5xl md:text-7xl max-w-4xl leading-tight font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {t("heroTitle")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-700 mt-4 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {t("heroSubtitle")}
        </motion.p>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-200"
        >
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Heart className="text-accent" fill="currentColor" size={16} />
            <span className="font-medium">قابل اعتماد، امن و رمزگذاری‌شده</span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Button
            variant="gradient"
            size="xl"
            href="/login"
            icon={<Heart size={20} />}
          >
            {t("start")}
          </Button>
          <Button
            variant="outline"
            size="xl"
            href="#how-it-works"
          >
            بیشتر بدانید
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl"
        >
          {[
            { value: "10,000+", label: "کاربر فعال" },
            { value: "50,000+", label: "یادگار ثبت‌شده" },
            { value: "99.9%", label: "امنیت" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 1.2 + index * 0.1,
                }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5 },
            y: { duration: 1.5, repeat: Infinity },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-sm">ادامه مطالب</span>
            <ArrowDown size={24} />
          </div>
        </motion.div>
      </motion.main>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
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
