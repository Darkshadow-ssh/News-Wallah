import mongoose from "mongoose";

export interface UserDoc {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  provider?: string;
  isVerified?: boolean;
  otp?: string;
  otpExpiry?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    provider: {
      type: String,
      default: "credentials",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiry: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Users =
  mongoose.models.users || mongoose.model<UserDoc>("users", userSchema);
