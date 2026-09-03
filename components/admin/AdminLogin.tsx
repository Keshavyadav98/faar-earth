"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Login failed.");
        return;
      }
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-card border border-border-gray bg-white p-8 shadow-card"
      >
        <h1 className="mb-6 text-center font-heading text-[22px] font-semibold text-[#404C3E]">
          Admin Login
        </h1>

        <label className="mb-1 block text-[13px] font-medium text-text-gray">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
          className="mb-4 w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
        />

        <label className="mb-1 block text-[13px] font-medium text-text-gray">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="mb-6 w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
        />

        {error && <p className="mb-4 text-[13px] text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-btn bg-primary-green px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-hover-green disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
