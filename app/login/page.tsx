// app/login/page.tsx
"use client";

import { useState } from "react";
import Button from "@/components/utils/Button";
import FloatingInput from "@/components/utils/FloatingInput";
import { useRequestOtp, useVerifyOtp, useSignup } from "@/hooks/useAuth";
import {
  phoneSchema,
  nameSchema,
  familySchema,
  otpSchema,
} from "./loginSchemas";
import { getErrorMessage } from "@/utils/error-handler";

type Step = "phone" | "otp" | "signup";
type Errors = { phone?: string; name?: string; family?: string; otp?: string };

const LoginPage = () => {
  // States
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<Step>("phone");
  const [temp, setTemp] = useState(""); // کد موقت از API
  const [errors, setErrors] = useState<Errors>({});

  // Mutations
  const requestOtpMutation = useRequestOtp();
  const verifyOtpMutation = useVerifyOtp();
  const signupMutation = useSignup();

  // ✅ مرحله 1: درخواست OTP
  const handleRequestOtp = async () => {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      setErrors({ phone: result.error.issues[0].message });
      return;
    }

    setErrors({});

    try {
      const response = await requestOtpMutation.mutateAsync({ phone });
      setTemp(response.temp);
      setStep("otp");
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "خطا در ارسال کد");
      setErrors({ phone: errorMessage });
    }
  };

  // ✅ مرحله 2: تأیید OTP
  const handleVerifyOtp = async () => {
    const otpCheck = otpSchema.safeParse(otp);
    if (!otpCheck.success) {
      setErrors({ otp: otpCheck.error.issues[0].message });
      return;
    }

    setErrors({});

    try {
      const response = await verifyOtpMutation.mutateAsync({
        phone,
        otp,
        temp,
      });

      // اگر signup: true بود، باید اطلاعات تکمیلی بگیریم
      if (response.data.signup) {
        setStep("signup");
      }
      // اگر signup: false بود، کاربر لاگین شده و redirect می‌شه
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "کد تأیید اشتباه است");
      setErrors({ otp: errorMessage });
    }
  };

  // ✅ مرحله 3: تکمیل ثبت‌نام (فقط برای کاربران جدید)
  const handleSignup = async () => {
    const nameCheck = nameSchema.safeParse(name);
    const familyCheck = familySchema.safeParse(family);
    const newErrors: Errors = {};

    if (!nameCheck.success) newErrors.name = nameCheck.error.issues[0].message;
    if (!familyCheck.success)
      newErrors.family = familyCheck.error.issues[0].message;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await signupMutation.mutateAsync({ phone, name, family });
      // redirect به dashboard توسط هوک انجام می‌شود
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "خطا در ثبت‌نام");
      setErrors({ name: errorMessage });
    }
  };

  const loading =
    requestOtpMutation.isPending ||
    verifyOtpMutation.isPending ||
    signupMutation.isPending;

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-[#1e77ae] to-[#373787] px-4">
      <div className="bg-black/10 shadow-lg rounded-2xl p-10 w-full max-w-lg min-h-[300px] text-center">
        <h2 className="text-4xl font-semibold text-white mb-16">
          ورود / ثبت‌نام
        </h2>

        {/* مرحله 1: شماره موبایل */}
        {step === "phone" && (
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
              onClick={handleRequestOtp}
              disabled={loading}
              loading={loading}
              className="w-full"
            >
              دریافت کد تأیید
            </Button>
          </>
        )}

        {/* مرحله 2: تأیید OTP */}
        {step === "otp" && (
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
              loading={loading}
              className="w-full"
            >
              تأیید کد
            </Button>
          </>
        )}

        {/* مرحله 3: ثبت‌نام (فقط کاربران جدید) */}
        {step === "signup" && (
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
              onClick={handleSignup}
              disabled={loading}
              loading={loading}
              className="w-full"
            >
              تکمیل ثبت‌نام
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
