import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import Credentials from "next-auth/providers/credentials";
import { Users } from "@/app/lib/model/users";
import mongoose from "mongoose";
import { MONGO_DB } from "@/app/lib/db";
import bcrypt from "bcrypt";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGO_DB);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/error",
    newUser: "/",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider !== "credentials") {
        try {
          await connectDB();
          const existingUser = await Users.findOne({ email: user.email });

          if (!existingUser) {
            const newUser = new Users({
              name: user.name,
              email: user.email,
              password: "",
              provider: account.provider,
            });
            await newUser.save();
            console.log("✅ New OAuth user created:", user.email);
          }
        } catch (error) {
          console.error("Error creating OAuth user:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        try {
          await connectDB();
          console.log("✅ DB connected");

          const user = await Users.findOne({ email: credentials.email });
          console.log("User found:", user ? "YES" : "NO");

          if (!user) {
            console.log("❌ User not found:", credentials.email);
            return null;
          }

          console.log("User password exists:", !!user.password);
          console.log(
            "Password starts with hash:",
            user.password.substring(0, 4)
          );

          const isHashed =
            user.password.startsWith("$2a$") ||
            user.password.startsWith("$2b$");
          console.log("Password is hashed:", isHashed);

          let passwordMatch = false;

          if (isHashed) {
            passwordMatch = await bcrypt.compare(
              credentials.password as string,
              user.password
            );
            console.log("Bcrypt compare result:", passwordMatch);
          } else {
            passwordMatch = credentials.password === user.password;
            console.log("⚠️ Plain text comparison:", passwordMatch);
          }

          if (!passwordMatch) {
            console.log("❌ Password mismatch");
            return null;
          }

          console.log("✅ Authentication successful");

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (err) {
          console.error("❌ Auth Error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
