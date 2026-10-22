"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, googleStart } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const redirectUrl = searchParams.get("redirect_url");
  const signInUrl = redirectUrl
    ? `/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`
    : "/sign-in";

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (await register(name, email, password)) {
        router.push(signInUrl);
      } else {
        setError(
          "Account creation failed. Please check your details and try again."
        );
      }
    } catch {
      setError("Unable to create your account right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-dark-2 text-white">
      <div className="w-full max-w-md rounded-xl bg-dark-1 p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">Create Account</h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}
          <input
            type="text"
            placeholder="Full Name"
            className="rounded bg-dark-3 p-3 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            disabled={loading}
            className="rounded bg-blue-1 p-3 font-semibold hover:bg-blue-2 disabled:bg-gray-600"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-[1px] flex-grow bg-dark-3" />
          <span className="px-2 text-sm">OR</span>
          <div className="h-[1px] flex-grow bg-dark-3" />
          <div className="h-[1px] flex-grow bg-dark-3" />
        </div>

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
          Already have an account?{" "}
          <Link href={signInUrl} className="text-blue-400 underline">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
