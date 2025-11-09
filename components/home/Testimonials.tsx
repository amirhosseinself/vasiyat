"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote, Star } from "lucide-react";

interface itemType {
  role: string;
  text: string;
}

const Testimonials = () => {
  const t = useTranslations("testimonials");
  const testimonials = t.raw("list");

  return (
    <section
      className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      id="testimonials"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="testimonial-pattern"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="30"
                cy="30"
                r="2"
                fill="currentColor"
                className="text-primary"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonial-pattern)" />
        </svg>
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
            <Star className="text-yellow-500" fill="currentColor" size={20} />
            <span className="text-gray-700 font-medium">نظرات کاربران</span>
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
            className="text-gray-600 max-w-4xl mx-auto text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
            }}
            loop={true}
            centeredSlides={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {testimonials.map((item: itemType, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <motion.div
                    className="group h-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col group-hover:-translate-y-2 rtl">
                      {/* Quote Icon */}
                      <div className="mb-6">
                        <div className="inline-flex p-3 bg-primary/10 rounded-2xl">
                          <Quote className="text-primary" size={32} />
                        </div>
                      </div>

                      {/* Stars Rating */}
                      <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="text-yellow-400"
                            fill="currentColor"
                            size={18}
                          />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-700 leading-relaxed mb-6 flex-1 text-lg">
                        "{item.text}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                        {/* Avatar Placeholder */}
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {item.role.charAt(0)}
                        </div>

                        <div>
                          <h5 className="font-bold text-gray-900">
                            {item.role}
                          </h5>
                          <p className="text-sm text-gray-500">کاربر یادگار</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
