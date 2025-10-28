"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import clsx from "clsx";
import Button from "@/components/utils/Button";

// ✅ اسکیمای اعتبارسنجی با Zod
const phoneSchema = z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست");
const nameSchema = z
  .string()
  .min(2, "نام باید حداقل ۲ حرف باشد")
  .max(30, "نام بیش از حد طولانی است");
const familySchema = z
  .string()
  .min(2, "نام خانوادگی باید حداقل ۲ حرف باشد")
  .max(30, "نام خانوادگی بیش از حد طولانی است");
const otpSchema = z
  .string()
  .min(6, "کد تأیید باید 6 رقم باشد")
  .max(6, "کد تأیید باید 6 رقم باشد");

// ✅ کامپوننت ورودی با لیبل شناور
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
  // اگر value موجود باشه، لیبل باید در حالت "کوچک‌شده" قرار بگیره
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
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />

      <label
        htmlFor={id}
        className={clsx(
          "absolute right-2 transition-all pointer-events-none",
          // حالت پیش‌فرض وقتی خالیه و بدون فوکوس
          !isFilled
            ? "top-4 text-lg text-gray-400"
            : "-top-6 text-sm text-white",
          // اما اگر فوکوس شد، همیشه به حالت کوچک بره
          "peer-focus:-top-6 peer-focus:text-sm peer-focus:text-white"
        )}
      >
        {label}
      </label>

      {error && (
        <p id={`${id}-error`} className="text-red-400 text-sm mt-1 rtl">
          {error}
        </p>
      )}
    </div>
  );
};

const LoginPage = () => {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [otp, setOtp] = useState("");
  const [hasAccount, setHasAccount] = useState<null | boolean>(null);
  const [step, setStep] = useState<"check" | "otp">("check");
  const [loading, setLoading] = useState(false);

  // خطاهای جدا برای هر فیلد
  const [errors, setErrors] = useState<{
    phone?: string;
    name?: string;
    family?: string;
    otp?: string;
  }>({});

  // ✳️ بررسی شماره تلفن
  const handleCheckUser = () => {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      setErrors({ phone: result.error.issues[0].message });
      return;
    }
    setErrors({});
    setLoading(true);

    setTimeout(() => {
      // تست بدون API
      if (phone === "09370529694") {
        setHasAccount(true);
        setStep("otp");
      } else {
        setHasAccount(false);
      }
      setLoading(false);
    }, 800);
  };

  // ✳️ ارسال کد ثبت‌نام برای کاربر جدید
  const handleSendOtp = () => {
    const nameCheck = nameSchema.safeParse(name);
    const familyCheck = familySchema.safeParse(family);
    const newErrors: typeof errors = {};

    if (!nameCheck.success) newErrors.name = nameCheck.error.issues[0].message;
    if (!familyCheck.success)
      newErrors.family = familyCheck.error.issues[0].message;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setStep("otp");
      setLoading(false);
    }, 800);
  };

  // ✳️ تأیید کد OTP
  const handleVerifyOtp = () => {
    const otpCheck = otpSchema.safeParse(otp);
    if (!otpCheck.success) {
      setErrors({ otp: otpCheck.error.issues[0].message });
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-[#156494] to-[#2f2f7e] px-4">
      <div className="bg-white/5 shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-4xl font-semibold text-white mb-10">
          ورود / ثبت‌نام
        </h2>

        {/* مرحله ۱: شماره تلفن */}
        {hasAccount === null && (
          <>
            <FloatingInput
              id="phone"
              label="شماره موبایل"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
            />
            <Button
              variant="white"
              size="lg"
              onClick={handleCheckUser}
              disabled={loading}
              className="w-full"
            >
              {loading ? "در حال بررسی..." : "ادامه"}
            </Button>
          </>
        )}

        {/* مرحله ۲: نام و نام خانوادگی */}
        {hasAccount === false && step === "check" && (
          <>
            <FloatingInput
              id="name"
              label="نام"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
            <FloatingInput
              id="family"
              label="نام خانوادگی"
              type="text"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              error={errors.family}
            />
            <Button
              variant="white"
              size="lg"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full"
            >
              {loading ? "در حال ارسال..." : "دریافت کد ورود"}
            </Button>
          </>
        )}

        {/* مرحله ۳: کد OTP */}
        {(hasAccount === true || step === "otp") && (
          <>
            <FloatingInput
              id="otp"
              label="کد تأیید"
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              error={errors.otp}
            />
            <Button
              variant="white"
              size="lg"
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full"
            >
              {loading ? "در حال ورود..." : "ورود به حساب"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
