// components/utils/FloatingInput.tsx
"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

type FloatingInputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  icon?: ReactNode;
  maxLength?: number;
  helperText?: string;
  required?: boolean;
  autoComplete?: string;
  name?: string;
};

const FloatingInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  placeholder,
  icon,
  maxLength,
  helperText,
  required = false,
  autoComplete,
  name,
}: FloatingInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isFilled = value.trim().length > 0;
  const isFloating = isFocused || isFilled;

  // Determine if this is a number/tel input for RTL handling
  const isNumericInput = type === "number" || type === "tel";
  const actualType = type === "password" && showPassword ? "text" : type;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={clsx("relative w-full mb-6", !isNumericInput && "rtl")}>
      <div className="relative">
        {/* Icon on the right (for RTL) */}
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <motion.input
          id={id}
          name={name}
          type={actualType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete={autoComplete}
          required={required}
          className={clsx(
            "peer w-full h-14 px-4 pt-6 pb-2 rounded-xl",
            "bg-white border-2 transition-all duration-200",
            "text-base font-medium",
            "focus:outline-none",
            "disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50",
            isNumericInput ? "text-center ltr" : "text-right",
            icon && "pr-12",
            type === "password" && "pl-12",
            error
              ? "border-red-300 focus:border-red-500 text-red-900"
              : isFocused
              ? "border-primary shadow-lg shadow-primary/10"
              : "border-gray-200 hover:border-gray-300",
            !error && isFocused && "ring-4 ring-primary/10"
          )}
          placeholder={isFloating ? placeholder : " "}
          style={{
            color: error ? "var(--color-error)" : "var(--color-text-primary)",
          }}
        />

        {/* Floating Label */}
        <motion.label
          htmlFor={id}
          className={clsx(
            "absolute right-4 transition-all duration-200 pointer-events-none",
            "font-medium",
            icon && "right-12",
            error
              ? "text-red-500"
              : isFocused
              ? "text-primary"
              : "text-gray-500",
            isFloating
              ? "top-2 text-xs"
              : "top-1/2 -translate-y-1/2 text-base"
          )}
        >
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </motion.label>

        {/* Password Toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {/* Character Count */}
        {maxLength && isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute left-3 top-2 text-xs text-gray-400"
          >
            {value.length}/{maxLength}
          </motion.div>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="flex items-center gap-2 mt-2 text-sm text-red-600 rtl"
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper Text */}
      {helperText && !error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-sm text-gray-500 rtl"
        >
          {helperText}
        </motion.p>
      )}
    </div>
  );
};

export default FloatingInput;
