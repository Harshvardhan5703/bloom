"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const getInternalDestination = (value: string | null) => {
  if (!value?.startsWith("/")) return "/home";

  const destination = new URL(value, "https://bloom.invalid");
  if (destination.origin !== "https://bloom.invalid") return "/home";

  return `${destination.pathname}${destination.search}${destination.hash}`;
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, googleStart, user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const redirectUrl = searchParams.get("redirect_url");
  const destination = getInternalDestination(redirectUrl);
  const signUpUrl = redirectUrl
    ? `/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}`
    : "/sign-up";

  // 🔥 Auto redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace(destination);
    }
  }, [destination, loading, router, user]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (await login(email, password)) {
        router.replace(destination);
      } else {
        setError("Sign in failed. Check your details and try again.");
      }
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!loading && user) return null;

  return (
    <main className="flex h-screen w-full items-center justify-center bg-dark-2 text-white">
      <div className="w-full max-w-md rounded-xl bg-dark-1 p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">Sign In</h1>

        {/* Email Login */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}
          <input
            type="email"
            placeholder="Email"
            className="rounded bg-dark-3 p-3 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="rounded bg-dark-3 p-3 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={submitting}
            className="rounded bg-blue-1 p-3 font-semibold hover:bg-blue-2 disabled:bg-gray-600"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-[1px] flex-grow bg-dark-3" />
          <span className="px-2 text-sm">OR</span>
          <div className="h-[1px] flex-grow bg-dark-3" />
        </div>

        {/* Google OAuth */}
        <button
          onClick={googleStart}
          className="flex w-full items-center justify-center gap-3 rounded bg-dark-3 p-3 hover:bg-dark-4"
        >
          <span
            aria-hidden="true"
            className="flex size-5 items-center justify-center rounded-full bg-white text-sm font-bold text-[#4285f4]"
          >
            G
          </span>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href={signUpUrl} className="text-blue-400 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
