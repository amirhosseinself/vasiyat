"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
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

const LoginPage = () => {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [hasAccount, setHasAccount] = useState<null | boolean>(null);
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"check" | "otp">("check");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckUser = () => {
    setError("");
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      setError(result.error.message);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // ✅ لاجیک تستی بدون API
      if (phone === "09370529694") {
        setHasAccount(true);
        setStep("otp");
      } else {
        setHasAccount(false);
      }
      setLoading(false);
    }, 800);
  };

  const handleSendOtp = () => {
    setError("");

    const nameCheck = nameSchema.safeParse(name);
    const familyCheck = familySchema.safeParse(family);
    console.log(nameCheck.error?.issues[0].message);

    if (!nameCheck.success) return setError(nameCheck.error?.issues[0].message);
    if (!familyCheck.success)
      return setError(familyCheck.error?.issues[0].message);

    setLoading(true);
    setTimeout(() => {
      setStep("otp");
      setLoading(false);
    }, 800);
  };

  const handleVerifyOtp = () => {
    setError("");
    if (otp.trim() === "") {
      setError("کد تأیید را وارد کنید");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-white">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[360px] text-center">
        <h2 className="text-2xl font-semibold text-primary mb-6">
          ورود / ثبت‌نام
        </h2>

        {/* مرحله ۱: شماره تلفن */}
        {hasAccount === null && (
          <>
            <input
              type="tel"
              placeholder="شماره موبایل"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 text-center focus:outline-none focus:border-primary"
            />
            <Button
              variant="primary"
              size="lg"
              onClick={handleCheckUser}
              disabled={loading}
              className="w-full"
            >
              {loading ? "در حال بررسی..." : "ادامه"}
            </Button>
          </>
        )}

        {/* مرحله ۲: فرم نام و فامیل در صورت نداشتن حساب */}
        {hasAccount === false && step === "check" && (
          <>
            <input
              type="text"
              placeholder="نام"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-3 text-center focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="نام خانوادگی"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-3 text-center focus:outline-none focus:border-primary"
            />
            <Button
              variant="primary"
              size="lg"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full"
            >
              {loading ? "در حال ارسال..." : "دریافت کد ورود"}
            </Button>
          </>
        )}

        {/* مرحله ۳: دریافت کد OTP */}
        {(hasAccount === true || step === "otp") && (
          <>
            <input
              type="text"
              placeholder="کد تأیید"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 text-center focus:outline-none focus:border-primary"
            />
            <Button
              variant="primary"
              size="lg"
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full"
            >
              {loading ? "در حال ورود..." : "ورود به حساب"}
            </Button>
          </>
        )}

        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
