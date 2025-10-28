// app/login/useLogin.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  phoneSchema,
  nameSchema,
  familySchema,
  otpSchema,
} from "./loginSchemas";
import { checkUserExists, sendOtp, verifyOtp } from "./loginApi";

type Step = "check" | "otp";
type Errors = { phone?: string; name?: string; family?: string; otp?: string };

export const useLogin = () => {
  const router = useRouter();

  // form states
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<Step>("check");
  const [hasAccount, setHasAccount] = useState<null | boolean>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  // ✅ Step 1: Check if user exists
  const handleCheckUser = async () => {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      setErrors({ phone: result.error.issues[0].message });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const exists = await checkUserExists(phone);
      setHasAccount(exists);
      setStep(exists ? "otp" : "check");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Send OTP for new user
  const handleSendOtp = async () => {
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

    setLoading(true);
    setErrors({});

    try {
      await sendOtp(name, family);
      setStep("otp");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 3: Verify OTP
  const handleVerifyOtp = async () => {
    const otpCheck = otpSchema.safeParse(otp);
    if (!otpCheck.success) {
      setErrors({ otp: otpCheck.error.issues[0].message });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const valid = await verifyOtp(otp);
      if (valid) router.push("/dashboard");
      else setErrors({ otp: "کد تأیید اشتباه است" });
    } finally {
      setLoading(false);
    }
  };

  return {
    phone,
    name,
    family,
    otp,
    setPhone,
    setName,
    setFamily,
    setOtp,
    step,
    hasAccount,
    errors,
    loading,
    handleCheckUser,
    handleSendOtp,
    handleVerifyOtp,
  };
};
