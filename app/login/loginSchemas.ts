// app/login/loginSchemas.ts
import { z } from "zod";

export const phoneSchema = z
  .string()
  .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست");

export const nameSchema = z
  .string()
  .min(2, "نام باید حداقل ۲ حرف باشد")
  .max(30, "نام بیش از حد طولانی است");

export const familySchema = z
  .string()
  .min(2, "نام خانوادگی باید حداقل ۲ حرف باشد")
  .max(30, "نام خانوادگی بیش از حد طولانی است");

export const otpSchema = z
  .string()
  .min(4, "کد تأیید باید 4 رقم باشد")
  .max(4, "کد تأیید باید 4 رقم باشد");
