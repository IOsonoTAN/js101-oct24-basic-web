"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
      }

      const user = await response.json();
      console.log("Logged in user:", user);

      // Redirect to home page or dashboard after successful login
      router.push("/");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="w-[400px] mx-auto p-10 bg-white">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleEmailChange}
          type="email"
          placeholder="Email"
          className="w-full bg-js101 p-4 mb-4"
          required
        />
        <input
          onChange={handlePasswordChange}
          type="password"
          placeholder="Password"
          className="w-full bg-green-400 p-4 mb-4"
          required
        />
        <button type="submit" className="w-full bg-slate-400 p-4">
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
