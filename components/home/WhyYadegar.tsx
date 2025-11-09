"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Heart, PenLine, Shield, Sparkles } from "lucide-react";

interface itemType {
  title: string;
  description: string;
}

const WhyYadegar = () => {
  const t = useTranslations("whyYadegar");
  const points = t.raw("points");
  const icons = [Heart, PenLine, Shield];
  const colors = [
    {
      bg: "from-blue-500 to-blue-700",
      light: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      bg: "from-purple-500 to-purple-700",
      light: "bg-purple-50",
      border: "border-purple-200",
    },
    {
      bg: "from-indigo-500 to-indigo-700",
      light: "bg-indigo-50",
      border: "border-indigo-200",
    },
  ];

  return (
    <section
      className="py-32 bg-gray-50 relative overflow-hidden"
      id="why-wasiyatnameh"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20 rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-md"
          >
            <Sparkles className="text-primary" size={20} />
            <span className="text-primary font-medium">مزایای یادگار</span>
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
            className="text-gray-600 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Bento Grid Layout - Creative & Modern */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {points.map((item: itemType, index: number) => {
            const Icon = icons[index];
            const color = colors[index];

            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Card */}
                <div
                  className={`relative h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${color.border} overflow-hidden group-hover:-translate-y-2`}
                >
                  {/* Decorative Circle Background */}
                  <div
                    className={`absolute -top-10 -right-10 w-40 h-40 ${color.light} rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700`}
                  />

                  {/* Icon with Gradient Background */}
                  <div className="relative mb-6">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${color.bg} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                    >
                      <Icon className="text-white" size={40} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative rtl">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover Effect Line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color.bg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyYadegar;
