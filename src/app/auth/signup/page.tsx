"use client";
import { JSX, useState, FormEvent, useRef } from "react";
// import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage(): JSX.Element {
    const { data, status } = useSession();
    const router = useRouter();
    const [step, setStep] = useState<'signup' | 'verify'>('signup');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            setSuccess("OTP sent to your email! Please verify.");
            setStep('verify');
            startResendTimer();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred during signup";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOTPChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const otpValue = otp.join("");

        if (otpValue.length !== 6) {
            setError("Please enter complete OTP");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: otpValue }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "OTP verification failed");
            }

            setSuccess("Email verified successfully! Redirecting to login...");
            setTimeout(() => router.push("/auth/login"), 2000);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Verification failed";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (resendTimer > 0) return;

        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to resend OTP");
            }

            setSuccess("OTP resent successfully!");
            setOtp(["", "", "", "", "", ""]);
            startResendTimer();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to resend OTP";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const startResendTimer = () => {
        setResendTimer(60);
        const interval = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    if (status === "authenticated" && data) {
        router.push("/");
        return (
            <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <p className="text-gray-700 dark:text-gray-300">Redirecting...</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="relative isolate px-4 sm:px-6 lg:px-8">
                <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div
                        style={{
                            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                    />
                </div>

                <div className="flex items-center justify-center min-h-screen py-12 sm:py-20">
                    <div className="backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 bg-indigo-50/80 dark:bg-indigo-900/20 transition-colors">

                        {step === 'signup' ? (
                            <>
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                                    Create Your Account
                                </h2>

                                {error && (
                                    <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700">
                                        <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
                                    </div>
                                )}

                                {success && (
                                    <div className="mb-4 p-3 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700">
                                        <p className="text-sm text-green-600 dark:text-green-400 text-center">{success}</p>
                                    </div>
                                )}

                                <form onSubmit={handleSignup} className="space-y-4 sm:space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all"
                                            placeholder="John Doe"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all"
                                            placeholder="you@example.com"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all"
                                            placeholder="********"
                                            required
                                            minLength={8}
                                            disabled={isLoading}
                                        />
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            Must be at least 8 characters
                                        </p>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all"
                                            placeholder="********"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            required
                                        />
                                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                            I agree to the{" "}
                                            <Link href="#" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                                                Terms and Conditions
                                            </Link>
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {isLoading ? "Creating account..." : "Create Account"}
                                    </button>
                                    <div className="text-center mt-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Already have an account?{" "}
                                            <Link href="login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                                                Sign in
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                                    Verify Your Email
                                </h2>
                                <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
                                    We&apos;ve sent a 6-digit OTP to<br />
                                    <span className="font-semibold">{email}</span>
                                </p>

                                {error && (
                                    <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700">
                                        <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
                                    </div>
                                )}

                                {success && (
                                    <div className="mb-4 p-3 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700">
                                        <p className="text-sm text-green-600 dark:text-green-400 text-center">{success}</p>
                                    </div>
                                )}

                                <form onSubmit={handleVerifyOTP} className="space-y-6">
                                    <div className="flex justify-center gap-2 sm:gap-3">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => {
                                                    if (el) {
                                                        otpInputRefs.current[index] = el;
                                                    }
                                                }}
                                                type="text"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOTPChange(index, e.target.value)}
                                                onKeyDown={(e) => handleOTPKeyDown(index, e)}
                                                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white transition-all"
                                                disabled={isLoading}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {isLoading ? "Verifying..." : "Verify OTP"}
                                    </button>

                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Didn&apos;t receive the code?{" "}
                                            {resendTimer > 0 ? (
                                                <span className="font-semibold text-gray-500">
                                                    Resend in {resendTimer}s
                                                </span>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={handleResendOTP}
                                                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                                                    disabled={isLoading}
                                                >
                                                    Resend OTP
                                                </button>
                                            )}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setStep('signup')}
                                            className="mt-4 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                                        >
                                            ← Change email address
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>

                <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                    <div
                        style={{
                            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
                    />
                </div>
            </div>
        </div>
    );
}
