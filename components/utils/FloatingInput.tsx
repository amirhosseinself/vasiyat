// components/utils/FloatingInput.tsx
"use client";

import clsx from "clsx";

type FloatingInputProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const FloatingInput = ({
  id,
  label,
  type,
  value,
  onChange,
  error,
}: FloatingInputProps) => {
  const isFilled = value.trim().length > 0;

  return (
    <div
      className={clsx("relative w-full mb-7", type === "text" ? "rtl" : "ltr")}
    >
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={clsx(
          "peer w-full border-b-2 p-2 rounded-2xl pt-5 text-lg text-white bg-white/5 focus:outline-none transition-all",
          type === "number" || type === "tel" ? "text-center" : "",
          error
            ? "border-red-400 focus:border-red-400"
            : "border-gray-300 focus:border-white"
        )}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={clsx(
          "absolute right-2 transition-all pointer-events-none",
          !isFilled
            ? "top-4 text-lg text-gray-400"
            : "-top-6 text-sm text-white",
          "peer-focus:-top-6 peer-focus:text-sm peer-focus:text-white"
        )}
      >
        {label}
      </label>
      {error && <p className="text-red-400 text-sm mt-1 rtl">{error}</p>}
    </div>
  );
};

export default FloatingInput;
