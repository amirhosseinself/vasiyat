"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
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
    const baseStyles =
      "rounded-xl font-yekan font-medium transition-all duration-200 backdrop-blur-[2px] border border-white/20 shadow-sm";
    const variantStyles = {
      primary:
        "bg-primary/10 text-white hover:bg-primary/50 focus:ring-2 focus:ring-primary/50",
      secondary:
        "bg-secondary/10 text-white hover:bg-secondary/50 focus:ring-2 focus:ring-secondary/50",
    };
    const sizeStyles = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${
      sizeStyles[size]
    } ${className || ""}`;

    if (href) {
      return (
        <Link href={href} className={`${combinedStyles} inline-block`}>
          {loading ? (
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
          ) : (
            children
          )}
        </Link>
      );
    }

    return (
      <button
        className={combinedStyles}
        disabled={loading}
        ref={ref}
        {...props}
      >
        {loading ? (
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
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
