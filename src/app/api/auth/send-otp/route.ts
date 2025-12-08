import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/app/lib/model/users";
import mongoose from "mongoose";
import { MONGO_DB } from "@/app/lib/db";
import { generateOTP } from "@/app/lib/otp";
import { sendOTPEmail } from "@/app/lib/email";
import bcrypt from "bcrypt";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGO_DB);
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const otp = generateOTP(6);
    const hashedOTP = await bcrypt.hash(otp, 10);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = hashedOTP;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOTPEmail(email, otp, user.name);

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
