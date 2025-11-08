// services/auth.service.ts
import axiosInstance from "@/lib/axios";
import type {
  LoginRequest,
  SignupRequest,
  SignupResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ApiResponse,
} from "@/types/api";

class AuthService {
  /**
   * درخواست OTP - مرحله اول
   * POST /api/v1/users/otp
   */
  async requestOtp(
    data: LoginRequest
  ): Promise<{ temp: string; mobile: string }> {
    const response = await axiosInstance.post("/v1/users/otp", {
      mobile: data.phone,
      device_id: this.getDeviceId(),
    });

    const temp = response.data?.data?.newOtp?.temp;
    const mobile = response.data?.data?.newOtp?.mobile;

    if (!temp || !mobile) {
      throw new Error("Invalid OTP response format");
    }

    return { temp, mobile };
  }

  /**
   * تأیید OTP - مرحله دوم
   * POST /api/v1/users/otpverify
   */
  async verifyOtp(
    data: VerifyOtpRequest
  ): Promise<ApiResponse<VerifyOtpResponse>> {
    const response = await axiosInstance.post("/v1/users/otpverify", {
      mobile: data.phone,
      temp: data.temp, // از response requestOtp
      code: data.otp,
      device_id: this.getDeviceId(),
      device_name: this.getDeviceName(),
    });

    // ذخیره توکن
    if (response.data.success && response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      if (response.data.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
      }
    }

    return response.data;
  }

  /**
   * تکمیل ثبت‌نام - اگر signup: true بود
   * POST /api/v1/users/signup
   */
  async signup(data: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    const response = await axiosInstance.post("/v1/users/signup", {
      fullname: `${data.name} ${data.family}`,
    });
    return response.data;
  }

  /**
   * خروج از حساب
   */
  async logout(): Promise<void> {
    try {
      // اگر endpoint logout دارید
      // await axiosInstance.post("/v1/users/logout");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  }

  /**
   * دریافت توکن
   */
  getToken(): string | null {
    return localStorage.getItem("token");
  }

  /**
   * بررسی لاگین
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * تولید Device ID
   */
  private getDeviceId(): string {
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
      deviceId = this.generateUUID();
      localStorage.setItem("device_id", deviceId);
    }
    return deviceId;
  }

  /**
   * دریافت نام دستگاه
   */
  private getDeviceName(): string {
    return navigator.userAgent;
  }

  /**
   * تولید UUID ساده
   */
  private generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}

export default new AuthService();
