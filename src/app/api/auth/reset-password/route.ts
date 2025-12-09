import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/app/lib/model/users";
import mongoose from "mongoose";
import { MONGO_DB } from "@/app/lib/db";
import bcrypt from "bcrypt";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGO_DB);
}

export async function POST(request: NextRequest) {
  try {
    const { email, otp, newPassword } = await request.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (!user.otp || !user.otpExpiry) {
      return NextResponse.json(
        {
          message: "No password reset request found. Please request a new one.",
        },
        { status: 400 }
      );
    }
    if (new Date() > user.otpExpiry) {
      return NextResponse.json(
        { message: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const isOTPValid = await bcrypt.compare(otp, user.otp);
    if (!isOTPValid) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
