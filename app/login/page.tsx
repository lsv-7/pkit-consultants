"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

console.log("API Response:", data);

setLoading(false);

if (!data.success) {
  alert("Invalid Email or Password");
  return;
}

console.log("Redirecting...");

window.location.href = "/admin";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <form
        onSubmit={login}
        className="bg-slate-900 w-full max-w-md rounded-xl p-8 space-y-6"
      >

        <h1 className="text-3xl font-bold text-center">
          PKIT Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-4 font-semibold"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

      </form>

    </div>
  );
}