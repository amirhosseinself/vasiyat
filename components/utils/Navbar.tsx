"use client";

import { useTranslations } from "next-intl";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import Button from "./Button";
import clsx from "clsx";

const Navbar = () => {
  const t = useTranslations("landing");
  const { scrollY } = useScroll();

  // تغییر رنگ متن از سفید به رنگ اصلی بعد از اسکرول
  const textColor = useTransform(
    scrollY,
    [0, 100],
    ["#ffffff", "var(--color-primary-text)"]
  );

  // وضعیت اسکرول برای کنترل نمایش پس‌زمینه
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((v) => setScrolled(v > 50));
  }, [scrollY]);

  return (
    <motion.header
      className={clsx(
        "fixed top-0 left-0 z-50 w-full",
        scrolled ? "bg-none" : "bg-linear-to-b from-black/40 to transparent"
      )}
    >
      {/* انیمیشن ورود پس‌زمینه فقط زمانی که scrolled = true است */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="navbar-bg"
            className="absolute inset-0 bg-white shadow-md"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* محتوای نوار ناوبری */}
      <nav className="relative flex items-center justify-between container mx-auto xl:max-w-7xl py-4 px-6">
        <motion.div
          className={clsx(
            "text-xl font-yekan font-bold transition-colors duration-300",
            scrolled ? "text-primary-text" : "text-white"
          )}
        >
          وصیت‌نامه
        </motion.div>

        <Button
          variant={scrolled ? "primary" : "white"}
          size="lg"
          href="/login"
          className="transition-colors duration-300"
        >
          {t("loginSignup")}
        </Button>
      </nav>
    </motion.header>
  );
};

export default Navbar;
