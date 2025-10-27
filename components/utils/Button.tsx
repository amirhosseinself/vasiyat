// components/utils/Button.tsx
"use client";

import { forwardRef, ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { motion, Transition } from "framer-motion";

// 🧩 ترکیب درست تایپ دکمه با motion.button
type MotionButtonProps = ComponentPropsWithoutRef<typeof motion.button>;

interface ButtonProps extends MotionButtonProps {
  variant?: "primary" | "secondary" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      loading = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // 🧱 Base Tailwind styles
    const baseStyles =
      "rounded-full font-yekan font-medium shadow-sm flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none px-4";

    const sizeStyles = {
      sm: "h-8 px-4 text-sm",
      md: "h-10 px-8 text-base",
      lg: "h-12 px-10 text-lg",
    };

    // 🎨 استفاده از رنگ‌های CSS از theme.css
    const variantGradients = {
      primary: {
        normal:
          "linear-gradient(45deg, var(--color-primary), var(--color-secondary))",
        hover:
          "linear-gradient(45deg, var(--color-primary-hover), var(--color-primary))",
        text: "text-white",
      },
      secondary: {
        normal:
          "linear-gradient(45deg, var(--color-secondary), var(--color-secondary-light))",
        hover:
          "linear-gradient(45deg, var(--color-secondary), var(--color-secondary-light))",
        text: "text-primary-text",
      },
      white: {
        normal: "linear-gradient(45deg, var(--color-surface), #f5f5f5)",
        hover: "linear-gradient(45deg, #f1f1f1, #e7e7e7)",
        text: "text-primary-text",
      },
    };

    const { normal, hover, text } = variantGradients[variant];
    const sizeClass = sizeStyles[size];

    // ⚙️ Transition معتبر
    const transition: Transition = {
      duration: 0.4,
      ease: ["easeInOut"],
    };

    // 🌀 Motion config
    const motionProps = {
      initial: { background: normal },
      whileHover: {
        background: hover,
        scale: 1.03,
        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
      },
      whileTap: { scale: 0.98 },
      transition,
    };

    const combinedClass = `${baseStyles} ${sizeClass} ${text} ${
      className || ""
    }`;

    // 🔄 Loader animation
    const Loader = (
      <span className="flex items-center gap-2">
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
        </svg>
        در حال بارگذاری...
      </span>
    );

    // 🌐 Link mode
    if (href) {
      return (
        <Link href={href} className="inline-block">
          <motion.div
            {...motionProps}
            className={combinedClass}
            style={{ background: normal }}
          >
            {loading ? Loader : children}
          </motion.div>
        </Link>
      );
    }

    // 🖱️ Button mode
    return (
      <motion.button
        {...motionProps}
        ref={ref}
        className={combinedClass}
        disabled={loading}
        {...props}
        style={{ background: normal }}
      >
        {loading ? Loader : children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
