import crypto from "crypto";

export function generateOTP(length: number = 6): string {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

export function generateOTPHash(otp: string, email: string): string {
  return crypto
    .createHmac("sha256", process.env.OTP_SECRET || "your-secret-key")
    .update(`${otp}${email}`)
    .digest("hex");
}
