"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import Button from "./Button";
import clsx from "clsx";
import Link from "next/link";

const Navbar = () => {
  const t = useTranslations("landing");
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((v) => setScrolled(v > 30));
  }, [scrollY]);

  // Close mobile menu when scrolled
  useEffect(() => {
    if (scrolled && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [scrolled, mobileMenuOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        className={clsx(
          "fixed top-0 left-0 z-50 w-full transition-all duration-300",
          scrolled ? "py-2" : "py-4"
        )}
      >
        {/* Background with glass effect */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="navbar-bg"
              className="absolute inset-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
          )}
        </AnimatePresence>

        {/* Gradient overlay when not scrolled */}
        {!scrolled && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
        )}

        {/* Navigation Content */}
        <nav className="relative container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className={clsx(
                "flex items-center gap-3 text-2xl md:text-3xl font-bold transition-all duration-300",
                scrolled ? "text-primary" : "text-white"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Heart
                  className={scrolled ? "text-accent" : "text-accent-light"}
                  fill="currentColor"
                  size={32}
                />
              </motion.div>
              <span className="font-yekan">{t("appName")}</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant={scrolled ? "primary" : "gradient"}
              size="md"
              href="/login"
              className="transition-all duration-300"
            >
              {t("loginSignup")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={clsx(
              "md:hidden p-2 rounded-lg transition-colors",
              scrolled
                ? "text-primary hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            )}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 text-xl font-bold text-primary">
                    <Heart className="text-accent" fill="currentColor" size={24} />
                    <span className="font-yekan">{t("appName")}</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Mobile Menu Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                  >
                    <Button
                      variant="gradient"
                      size="lg"
                      href="/login"
                      fullWidth
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("loginSignup")}
                    </Button>
                  </motion.div>
                </div>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-gray-100">
                  <p className="text-sm text-center text-gray-500 rtl">
                    {t("footerText")}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
