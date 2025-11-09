"use client";

import { motion } from "framer-motion";
import { Lightbulb, Edit3, ShieldCheck, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

interface stepType {
  title: string;
  description: string;
}

const HowItWorks = () => {
  const t = useTranslations("howItWorks");

  const icons = [Lightbulb, Edit3, ShieldCheck];
  const steps = t.raw("steps");

  return (
    <section
      className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden"
      id="how-it-works"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20 rtl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              نحوه کار
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t("title")}
          </motion.h2>

          <motion.p
            className="text-gray-600 w-full text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Timeline Steps - Zigzag Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Line - Hidden on mobile */}
          <div className="hidden md:block absolute right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          {steps.map((step: stepType, index: number) => {
            const Icon = icons[index];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className={`relative flex items-center mb-16 md:mb-24 last:mb-0 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Content Card */}
                <div
                  className={`w-full md:w-5/12 ${
                    isEven ? "md:text-left" : "md:text-right"
                  }`}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 rtl">
                    {/* Step Number */}
                    <div className={`flex items-center gap-4 mb-6`}>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold text-xl">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-24 h-24 items-center justify-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-xl opacity-50" />

                    {/* Icon Container */}
                    <div className="relative bg-gradient-to-br from-primary to-secondary p-5 rounded-2xl shadow-xl">
                      <Icon className="text-white" size={36} />
                    </div>
                  </motion.div>
                </div>

                {/* Mobile Icon */}
                <div className="md:hidden mb-4">
                  <div className="inline-flex bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl shadow-lg">
                    <Icon className="text-white" size={32} />
                  </div>
                </div>

                {/* Arrow for Desktop */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-full right-1/2 -translate-x-1/2 mt-8 text-primary/30"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    <ArrowLeft size={24} className="rotate-90" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
