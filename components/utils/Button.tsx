"use client";

import { forwardRef, ComponentPropsWithoutRef, FC, ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  Transition,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

type MotionButtonProps = ComponentPropsWithoutRef<typeof motion.button>;

interface ButtonProps extends Omit<MotionButtonProps, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children?: ReactNode;
}

// ✨ Enhanced Background Layers with smooth transitions
const BackgroundLayers: FC<{
  normal: string;
  hover: string;
  opacity: MotionValue<number>;
}> = ({ normal, hover, opacity }) => {
  return (
    <>
      {/* Base background */}
      <motion.span
        className="absolute inset-0 rounded-xl"
        style={{
          background: normal,
        }}
      />

      {/* Hover background with smooth transition */}
      <motion.span
        className="absolute inset-0 rounded-xl"
        style={{
          background: hover,
          opacity,
        }}
      />

      {/* Subtle shine effect */}
      <motion.span
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-10 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
        }}
      />
    </>
  );
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      loading = false,
      disabled = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    // 🎨 Base styles with enhanced design
    const baseStyles = clsx(
      "relative overflow-hidden font-yekan font-medium transition-smooth",
      "flex justify-center items-center gap-2 cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-60 disabled:cursor-not-allowed select-none",
      fullWidth ? "w-full" : "inline-flex"
    );

    // 📏 Size variants with refined spacing
    const sizeStyles = {
      xs: "h-8 px-3 text-xs rounded-lg gap-1.5",
      sm: "h-10 px-5 text-sm rounded-xl gap-2",
      md: "h-12 px-8 text-base rounded-xl gap-2",
      lg: "h-14 px-10 text-lg rounded-2xl gap-2.5",
      xl: "h-16 px-12 text-xl rounded-2xl gap-3",
    } as const;

    // 🎨 Enhanced variant styles using new design system
    const variantStyles = {
      primary: {
        normal: "var(--color-primary)",
        hover: "var(--color-primary-hover)",
        gradient:
          "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
        hoverGradient:
          "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)",
        text: "text-white",
        ring: "focus-visible:ring-primary",
        shadow: "shadow-lg hover:shadow-xl",
      },
      secondary: {
        normal: "var(--color-secondary)",
        hover: "var(--color-secondary-dark)",
        gradient:
          "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%)",
        hoverGradient:
          "linear-gradient(135deg, var(--color-secondary-dark) 0%, var(--color-secondary) 100%)",
        text: "text-white",
        ring: "focus-visible:ring-secondary",
        shadow: "shadow-lg hover:shadow-xl",
      },
      gradient: {
        normal: "",
        hover: "",
        gradient:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        hoverGradient:
          "linear-gradient(135deg, #764ba2 0%, #667eea 50%, #f093fb 100%)",
        text: "text-white",
        ring: "focus-visible:ring-purple-500",
        shadow: "shadow-xl hover:shadow-2xl",
      },
      outline: {
        normal: "transparent",
        hover: "var(--color-background-secondary)",
        gradient: "",
        hoverGradient: "",
        text: "text-primary border-2 border-primary hover:border-primary-hover",
        ring: "focus-visible:ring-primary",
        shadow: "shadow-sm hover:shadow-md",
      },
      ghost: {
        normal: "transparent",
        hover: "var(--color-background-secondary)",
        gradient: "",
        hoverGradient: "",
        text: "text-primary hover:text-primary-hover",
        ring: "focus-visible:ring-primary",
        shadow: "",
      },
      danger: {
        normal: "var(--color-error)",
        hover: "#c53030",
        gradient:
          "linear-gradient(135deg, var(--color-error) 0%, #c53030 100%)",
        hoverGradient:
          "linear-gradient(135deg, #c53030 0%, var(--color-error) 100%)",
        text: "text-white",
        ring: "focus-visible:ring-red-500",
        shadow: "shadow-lg hover:shadow-xl",
      },
    } as const;

    const currentVariant = variantStyles[variant];
    const sizeClass = sizeStyles[size];

    // 🎭 Animation configuration
    const transition: Transition = {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    };

    const combinedClass = clsx(
      baseStyles,
      sizeClass,
      currentVariant.text,
      currentVariant.ring,
      currentVariant.shadow,
      className
    );

    // 🎛 Motion value for smooth hover transitions
    const hoverProgress = useMotionValue(0);
    const opacity = useSpring(hoverProgress, {
      stiffness: 200,
      damping: 25,
    });

    const handleHoverStart = () => !disabled && !loading && hoverProgress.set(1);
    const handleHoverEnd = () => hoverProgress.set(0);

    // 🔄 Loading spinner
    const LoadingSpinner = (
      <Loader2 className="animate-spin" size={size === "xs" || size === "sm" ? 16 : 20} />
    );

    // Render icon if provided
    const IconElement = icon && (
      <span className="inline-flex items-center justify-center">
        {icon}
      </span>
    );

    const ButtonContent = (
      <>
        {/* Background layers for gradient variants */}
        {(variant === "primary" ||
          variant === "secondary" ||
          variant === "gradient" ||
          variant === "danger") && (
          <BackgroundLayers
            normal={currentVariant.gradient || currentVariant.normal}
            hover={currentVariant.hoverGradient || currentVariant.hover}
            opacity={opacity}
          />
        )}

        {/* Content layer */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading && LoadingSpinner}
          {!loading && icon && iconPosition === "left" && IconElement}
          {children && <span>{children}</span>}
          {!loading && icon && iconPosition === "right" && IconElement}
        </span>
      </>
    );

    const motionProps = {
      onHoverStart: handleHoverStart,
      onHoverEnd: handleHoverEnd,
      whileHover: disabled || loading ? {} : { scale: 1.02, y: -2 },
      whileTap: disabled || loading ? {} : { scale: 0.98 },
      transition,
    };

    // Render as Link if href is provided
    if (href && !disabled && !loading) {
      return (
        <Link href={href} className={fullWidth ? "w-full" : "inline-block"}>
          <motion.div {...motionProps} className={combinedClass}>
            {ButtonContent}
          </motion.div>
        </Link>
      );
    }

    // Render as button
    return (
      <motion.button
        ref={ref}
        disabled={disabled || loading}
        {...motionProps}
        className={combinedClass}
        {...props}
      >
        {ButtonContent}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
