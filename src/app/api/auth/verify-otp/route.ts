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
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.otp || !user.otpExpiry) {
      return NextResponse.json({ message: "No OTP found" }, { status: 400 });
    }

    if (new Date() > user.otpExpiry) {
      return NextResponse.json({ message: "OTP has expired" }, { status: 400 });
    }

    const isValidOTP = await bcrypt.compare(otp, user.otp);
    if (!isValidOTP) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { message: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
