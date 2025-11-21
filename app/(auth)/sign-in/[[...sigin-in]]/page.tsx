"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login, googleStart, user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 🔥 Auto redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    await login(email, password);

    setSubmitting(false);
    router.push("/");
  };

  if (!loading && user) return null;

  return (
    <main className="flex h-screen w-full items-center justify-center bg-dark-2 text-white">
      <div className="w-full max-w-md rounded-xl bg-dark-1 p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">Sign In</h1>

        {/* Email Login */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
          <img src="/icons/google.svg" className="h-5 w-5" />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-400 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
