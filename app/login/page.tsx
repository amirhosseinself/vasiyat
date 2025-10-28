// app/login/page.tsx
"use client";

import Button from "@/components/utils/Button";
import FloatingInput from "@/components/utils/FloatingInput";
import { useLogin } from "./useLogin";

const LoginPage = () => {
  const {
    phone,
    name,
    family,
    otp,
    setPhone,
    setName,
    setFamily,
    setOtp,
    hasAccount,
    step,
    errors,
    loading,
    handleCheckUser,
    handleSendOtp,
    handleVerifyOtp,
  } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-[#156494] to-[#2f2f7e] px-4">
      <div className="bg-black/10 shadow-lg rounded-2xl p-10 w-full max-w-lg min-h-[300px] text-center">
        <h2 className="text-4xl font-semibold text-white mb-16">
          ورود / ثبت‌نام
        </h2>

        {/* Step 1: Phone */}
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

        {/* Step 2: New User Info */}
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

        {/* Step 3: OTP */}
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
