"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const EmotionalSection = () => {
  const t = useTranslations("emotionalSection");

  return (
    <section
      className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center"
      id="emotional-section"
    >
      {/* 🌄 پس‌زمینه تصویری */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/emotional.jpg"
          alt="غروب آرام"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
      </div>

      {/* ✨ متن روی تصویر */}
      <motion.div
        className="relative z-10 max-w-4xl px-6 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-2xl md:text-3xl font-light italic leading-relaxed">
          “{t("quote")}”
        </p>
        <p className="mt-4 text-lg opacity-80">— {t("author")}</p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            href="/login"
            className="inline-block bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-200"
          >
            {t("cta")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EmotionalSection;
