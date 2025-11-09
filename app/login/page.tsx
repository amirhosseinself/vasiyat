// app/login/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Phone,
  Key,
  User,
  ArrowRight,
  Shield,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
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
  const [temp, setTemp] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  // Mutations
  const requestOtpMutation = useRequestOtp();
  const verifyOtpMutation = useVerifyOtp();
  const signupMutation = useSignup();

  // Step 1: Request OTP
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

  // Step 2: Verify OTP
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

      if (response.data.signup) {
        setStep("signup");
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "کد تأیید اشتباه است");
      setErrors({ otp: errorMessage });
    }
  };

  // Step 3: Complete Signup
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
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "خطا در ثبت‌نام");
      setErrors({ name: errorMessage });
    }
  };

  const loading =
    requestOtpMutation.isPending ||
    verifyOtpMutation.isPending ||
    signupMutation.isPending;

  const stepConfig = {
    phone: {
      title: "ورود به یادگار",
      subtitle: "شماره موبایل خود را وارد کنید",
      icon: Phone,
      color: "from-primary to-primary-light",
    },
    otp: {
      title: "تایید کد",
      subtitle: `کد ارسال‌شده به ${phone} را وارد کنید`,
      icon: Key,
      color: "from-secondary to-secondary-light",
    },
    signup: {
      title: "تکمیل ثبت‌نام",
      subtitle: "اطلاعات خود را تکمیل کنید",
      icon: User,
      color: "from-accent to-accent-light",
    },
  };

  const currentStep = stepConfig[step];
  const StepIcon = currentStep.icon;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-gradient-emotional opacity-5 rounded-full blur-3xl animate-ping" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-secondary opacity-15 rounded-full blur-3xl" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-24 pb-8">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col items-start text-right rtl"
          >
            <div className="flex items-center gap-4 mb-6">
              <Heart className="text-accent" fill="currentColor" size={56} />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                یادگار
              </h1>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              میراث معنوی خود را
              <br />
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                برای عزیزانتان بسازید
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              یادگار، پلتفرمی امن برای ثبت پیام‌ها، خاطرات و وصایای شماست که در
              زمان مناسب به دست عزیزانتان خواهد رسید.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: Shield, text: "امنیت و رمزنگاری کامل" },
                { icon: CheckCircle, text: "تحویل خودکار در زمان تعیین‌شده" },
                { icon: Heart, text: "حفظ خاطرات برای نسل‌های آینده" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="text-primary" size={24} />
                  </div>
                  <span className="text-gray-700 font-medium">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-12 border border-white/20">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                <Heart className="text-accent" fill="currentColor" size={40} />
                <h1 className="text-3xl font-bold text-primary">یادگار</h1>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center justify-center gap-3 mb-8">
                {["phone", "otp", "signup"].map((s, index) => (
                  <div
                    key={s}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      s === step
                        ? "w-12 bg-gradient-to-r " + currentStep.color
                        : index < ["phone", "otp", "signup"].indexOf(step)
                        ? "w-8 bg-primary/50"
                        : "w-8 bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Header */}
              <div className="text-center mb-8 rtl">
                <motion.div
                  key={step}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${currentStep.color} mb-4`}
                >
                  <StepIcon className="text-white" size={32} />
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {currentStep.title}
                    </h2>
                    <p className="text-gray-600">{currentStep.subtitle}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Phone */}
                  {step === "phone" && (
                    <div className="space-y-6">
                      <FloatingInput
                        id="phone"
                        label="شماره موبایل"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={errors.phone}
                        icon={<Phone size={20} />}
                        required
                      />
                      <Button
                        variant="gradient"
                        size="lg"
                        onClick={handleRequestOtp}
                        disabled={loading}
                        loading={loading}
                        fullWidth
                      >
                        دریافت کد تأیید
                      </Button>
                    </div>
                  )}

                  {/* Step 2: OTP */}
                  {step === "otp" && (
                    <div className="space-y-6">
                      <FloatingInput
                        id="otp"
                        label="کد تأیید"
                        type="tel"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        error={errors.otp}
                        icon={<Key size={20} />}
                        maxLength={4}
                        helperText="کد ۴ رقمی ارسال‌شده را وارد کنید"
                        required
                      />

                      <div className="flex gap-3">
                        <Button
                          variant="ghost"
                          size="md"
                          onClick={() => setStep("phone")}
                          icon={<ArrowRight size={20} />}
                        >
                          بازگشت
                        </Button>
                        <Button
                          variant="gradient"
                          size="lg"
                          onClick={handleVerifyOtp}
                          disabled={loading}
                          loading={loading}
                          fullWidth
                        >
                          تأیید کد
                        </Button>
                      </div>

                      <button
                        onClick={handleRequestOtp}
                        className="w-full text-center text-sm text-primary hover:text-primary-hover transition-colors"
                      >
                        ارسال مجدد کد
                      </button>
                    </div>
                  )}

                  {/* Step 3: Signup */}
                  {step === "signup" && (
                    <div className="space-y-6">
                      <FloatingInput
                        id="name"
                        label="نام"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={errors.name}
                        icon={<User size={20} />}
                        required
                      />
                      <FloatingInput
                        id="family"
                        label="نام خانوادگی"
                        type="text"
                        value={family}
                        onChange={(e) => setFamily(e.target.value)}
                        error={errors.family}
                        icon={<User size={20} />}
                        required
                      />
                      <Button
                        variant="gradient"
                        size="lg"
                        onClick={handleSignup}
                        disabled={loading}
                        loading={loading}
                        fullWidth
                      >
                        تکمیل ثبت‌نام
                      </Button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Privacy Notice */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl rtl">
                <p className="text-xs text-gray-600 text-center leading-relaxed">
                  با ورود یا ثبت‌نام در یادگار، شما{" "}
                  <a href="#" className="text-primary hover:underline">
                    قوانین و مقررات
                  </a>{" "}
                  و{" "}
                  <a href="#" className="text-primary hover:underline">
                    سیاست حریم خصوصی
                  </a>{" "}
                  را می‌پذیرید.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
