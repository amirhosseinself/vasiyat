// app/login/loginApi.ts

// ✅ Mock API functions — replace with real API later

export async function checkUserExists(phone: string) {
  // simulate API delay
  await new Promise((r) => setTimeout(r, 800));

  // sample mock condition
  return phone === "09370529694";
}

export async function sendOtp(name: string, family: string) {
  console.log(`Sending OTP to ${name} ${family}`);
  await new Promise((r) => setTimeout(r, 800));
  return { success: true };
}

export async function verifyOtp(otp: string) {
  await new Promise((r) => setTimeout(r, 1000));
  return otp === "123456"; // sample validation
}
