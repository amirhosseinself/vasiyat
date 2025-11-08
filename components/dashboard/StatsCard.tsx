"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "secondary" | "accent" | "success" | "warning";
  delay?: number;
}

const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "primary",
  delay = 0,
}: StatsCardProps) => {
  const colorConfig = {
    primary: {
      bg: "bg-blue-50",
      icon: "text-primary",
      gradient: "from-primary to-primary-light",
    },
    secondary: {
      bg: "bg-purple-50",
      icon: "text-secondary",
      gradient: "from-secondary to-secondary-light",
    },
    accent: {
      bg: "bg-yellow-50",
      icon: "text-accent",
      gradient: "from-accent to-accent-light",
    },
    success: {
      bg: "bg-green-50",
      icon: "text-success",
      gradient: "from-green-400 to-green-600",
    },
    warning: {
      bg: "bg-orange-50",
      icon: "text-warning",
      gradient: "from-orange-400 to-orange-600",
    },
  };

  const config = colorConfig[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Background Gradient */}
      <div className={clsx(
        "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10",
        `bg-gradient-to-br ${config.gradient}`
      )} />

      <div className="relative rtl">
        {/* Icon */}
        <div className={clsx("inline-flex p-3 rounded-xl mb-4", config.bg)}>
          <Icon className={config.icon} size={28} />
        </div>

        {/* Title */}
        <h3 className="text-gray-600 text-sm font-medium mb-2">
          {title}
        </h3>

        {/* Value */}
        <div className="flex items-baseline gap-2 mb-2">
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay + 0.2, duration: 0.4, type: "spring" }}
            className="text-4xl font-bold text-gray-900"
          >
            {value}
          </motion.p>

          {/* Trend */}
          {trend && (
            <span
              className={clsx(
                "text-sm font-medium px-2 py-0.5 rounded-full",
                trend.isPositive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
            </span>
          )}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-gray-500 text-sm">
            {subtitle}
          </p>
        )}
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-500"
        style={{
          transform: "translateX(-100%)",
        }}
        whileHover={{
          transform: "translateX(100%)",
          transition: { duration: 0.6 },
        }}
      />
    </motion.div>
  );
};

export default StatsCard;
