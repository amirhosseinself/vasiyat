// types/api.ts

// ===== Authentication Types =====
export interface LoginRequest {
  phone: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    newOtp: {
      temp: string;
      mobile: string;
    };
  };
}

export interface SignupRequest {
  phone: string;
  name: string;
  family: string;
  token?: string; // توکن از مرحله قبل
}

export interface SignupResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
  temp: string; // از response requestOtp
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  token: string;
  refreshToken?: string;
  user: User;
  signup?: boolean; // اگر true باید به صفحه signup بره
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
}

// ===== User Types =====
export interface User {
  id: string;
  phone: string;
  name: string;
  family: string;
  fullname?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  family?: string;
  email?: string;
}

// ===== Home Types =====
export interface HomeData {
  success: boolean;
  message: string;
  comments: Comment[];
  orders: {
    submited: number;
    success: number;
  };
}

export interface Comment {
  _id: string;
  user_id: string;
  product_id: string;
  comment: string;
  fullname: string;
  confirmed: boolean;
  rate: number;
  createdAt: string;
  __v: number;
  device_id: string;
  ip: string;
  name: string;
  user: string;
}

// ===== Will Types =====
export interface Will {
  id: string;
  userId: string;
  title: string;
  content: string;
  mediaFiles?: MediaFile[];
  recipients: Recipient[];
  status: "draft" | "active" | "sent";
  createdAt: string;
  updatedAt: string;
  scheduledDate?: string;
}

export interface CreateWillRequest {
  title: string;
  content: string;
  recipients: RecipientInput[];
}

export interface UpdateWillRequest {
  id: string;
  title?: string;
  content?: string;
  recipients?: RecipientInput[];
}

export interface DeleteWillRequest {
  id: string;
}

// ===== Recipient Types =====
export interface Recipient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  relation: string;
}

export interface RecipientInput {
  name: string;
  phone: string;
  email?: string;
  relation: string;
}

// ===== Media Types =====
export interface MediaFile {
  id: string;
  type: "image" | "video" | "audio" | "document";
  url: string;
  name: string;
  size: number;
  createdAt: string;
}

export interface UploadMediaRequest {
  file: File;
  willId: string;
}

export interface UploadMediaResponse {
  media: MediaFile;
}

// ===== Check-in Types =====
export interface CheckInRequest {
  userId: string;
}

export interface CheckInResponse {
  message: string;
  nextCheckInDate: string;
}

// ===== API Response Wrapper =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

// ===== Pagination Types =====
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
