"use client";

import { motion } from "framer-motion";
import { Lightbulb, Edit3, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

interface stepType {
  title: string;
  description: string;
}

const HowItWorks = () => {
  const t = useTranslations("howItWorks");

  const icons = [Lightbulb, Edit3, ShieldCheck];
  const steps = t.raw("steps"); // چون steps آرایه است باید raw استفاده کنیم

  return (
    <section className="py-24 bg-[#89CFF0]/20" id="how-it-works">
      <div className="container text-center">
        <motion.h2
          className="text-4xl font-bold mb-4 text-blue-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("title")}
        </motion.h2>

        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("subtitle")}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          {steps.map((step: stepType, index: number) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                className="flex flex-col items-start bg-gray-50/50 p-8 rounded-2xl hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Icon className="size-16 text-blue-500 mb-10" />
                <h3 className="text-xl font-semibold mb-2 text-blue-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-start">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
