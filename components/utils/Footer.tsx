"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Heart, Mail, Phone, MapPin, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("landing");

  const footerLinks = [
    {
      title: "درباره ما",
      links: [
        { name: "داستان ما", href: "#" },
        { name: "تیم ما", href: "#" },
        { name: "ماموریت", href: "#" },
      ],
    },
    {
      title: "خدمات",
      links: [
        { name: "نحوه کار", href: "#" },
        { name: "امنیت", href: "#" },
        { name: "قیمت‌گذاری", href: "#" },
      ],
    },
    {
      title: "پشتیبانی",
      links: [
        { name: "سوالات متداول", href: "#" },
        { name: "تماس با ما", href: "#" },
        { name: "راهنما", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
      <div className="container-custom py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2 rtl">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="text-accent" fill="currentColor" size={40} />
              <h3 className="text-3xl font-bold text-primary font-yekan">
                {t("appName")}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-[400px]">
              یادگار، پلتفرمی امن و معتبر برای ثبت و انتقال پیام‌های ارزشمند شما
              به عزیزانتان. خاطرات و میراث معنوی خود را با اطمینان حفظ کنید.
            </p>
            <div className="flex gap-4 rtl">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div key={index} variants={itemVariants} className="rtl">
              <h4 className="text-lg font-bold text-primary mb-4 font-yekan">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-gray-200 rtl"
        >
          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">تلفن تماس</p>
              <p className="font-medium ltr">021-1234-5678</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">ایمیل</p>
              <p className="font-medium ltr">support@yadgar.ir</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">آدرس</p>
              <p className="font-medium">تهران، ایران</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 rtl"
        >
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} {t("appName")}. تمامی حقوق محفوظ است.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              قوانین و مقررات
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              حریم خصوصی
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              شرایط استفاده
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-emotional opacity-5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-secondary opacity-5 rounded-full blur-3xl -z-10" />
    </footer>
  );
};

export default Footer;
