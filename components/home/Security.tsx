"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShieldCheck, Lock, Cloud, Check } from "lucide-react";
import Image from "next/image";

interface itemType {
  title: string;
  description: string;
}

const Security = () => {
  const t = useTranslations("security");
  const features = t.raw("features");
  const icons = [Lock, ShieldCheck, Cloud];

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="security">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Split Layout - Image + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Right Side - Image & Visual */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Security Shield Illustration */}
            <div className="relative">
              {/* Main Shield */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Animated Rings */}
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute inset-0 border-4 border-primary/20 rounded-full"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.2, 0.1, 0.2]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: ring * 0.5
                    }}
                  />
                ))}

                {/* Center Shield */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl blur-2xl opacity-50" />
                    <div className="relative bg-gradient-to-br from-primary to-secondary p-12 rounded-3xl shadow-2xl">
                      <ShieldCheck className="text-white" size={120} />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Icons */}
              {icons.map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute bg-white rounded-2xl p-4 shadow-xl"
                  style={{
                    top: index === 0 ? '10%' : index === 1 ? '50%' : '80%',
                    left: index === 0 ? '-5%' : index === 1 ? '-10%' : '5%',
                  }}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <Icon className="text-primary" size={32} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Left Side - Content */}
          <div className="order-2 lg:order-1 rtl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                امنیت و حریم خصوصی
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                {t("title")}
              </h2>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
                {t("subtitle")}
              </p>
            </motion.div>

            {/* Feature List */}
            <div className="space-y-6">
              {features.map((item: itemType, index: number) => {
                const Icon = icons[index];
                return (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Icon className="text-primary group-hover:text-white transition-colors" size={24} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="text-green-500" size={20} />
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
