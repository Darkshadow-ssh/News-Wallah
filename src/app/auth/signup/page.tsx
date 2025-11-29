"use client";
import { JSX, useState, FormEvent } from "react";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage(): JSX.Element {
    const { data, status } = useSession();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server did not return JSON response");
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            setSuccess("Account created successfully! Redirecting to login...");

            setTimeout(() => {
                router.push("/auth/login");
            }, 2000);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred during signup";
            setError(errorMessage);
            console.error("Signup error:", err);
        } finally {
            setIsLoading(false);
        }
    };


    const handleSocialSignup = async (provider: string) => {
        try {
            await signIn(provider, { callbackUrl: "/" });
        } catch (err) {
            console.error(`${provider} signup error:`, err);
        }
    };
    if (status === "authenticated" && data) {
        router.push("/");
        return (
            <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-700 dark:text-gray-300">Redirecting...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="relative isolate px-6 lg:px-8">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                    />
                </div>

                <div className="flex items-center justify-center min-h-screen py-32">
                    <div className="backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 items-center justify-center bg-indigo-50 group-hover:bg-indigo-100 dark:bg-indigo-900/20 dark:group-hover:bg-indigo-900/30 transition-colors">
                        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
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

                        <form onSubmit={handleSignup} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
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
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
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
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
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
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
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
                                <label
                                    htmlFor="terms"
                                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                >
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
                                    <Link
                                        href="login"
                                        className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-indigo-50 dark:bg-indigo-900/20 text-gray-500 dark:text-gray-400">
                                    </span>
                                </div>
                            </div>

                            <div className="backdrop-blur-sm p-2 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 items-center justify-center bg-indigo-50 group-hover:bg-indigo-100 dark:bg-indigo-900/20 dark:group-hover:bg-indigo-900/30 transition-colors">
                                <button
                                    type="button"
                                    onClick={() => handleSocialSignup("google")}
                                    className="flex flex-row items-center px-20 gap-2 shadow-sm w-full justify-center py-2 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-lg transition-colors"
                                >
                                    <Image width={24} height={24} src='/glogo.svg' alt="Google logo"></Image>
                                    <h3 className="text-gray-600 dark:text-gray-400">Continue with Google</h3>
                                </button>
                            </div>
                            <div className="flex flex-row justify-center gap-2 mt-4 mb-2">
                                <button
                                    type="button"
                                    onClick={() => handleSocialSignup("facebook")}
                                    className="hover:opacity-80 transition-opacity"
                                >
                                    <Image src="/facebook_logo.svg" alt="Facebook logo" width={38} height={38}></Image>
                                </button>
                                <button type="button" className="hover:opacity-80 transition-opacity">
                                    <Image src="/apple_logo.svg" alt="Apple logo" width={70} height={70}></Image>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSocialSignup("linkedin")}
                                    className="hover:opacity-80 transition-opacity"
                                >
                                    <Image src="/linkedin_logo.svg" alt="LinkedIn logo" width={65} height={65}></Image>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSocialSignup("github")}
                                    className="hover:opacity-80 transition-opacity"
                                >
                                    <Image src="/github_logo.png" alt="GitHub logo" width={74} height={74}></Image>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
                    />
                </div>
            </div>
        </div>
    );
}
