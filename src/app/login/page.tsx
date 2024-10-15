"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    console.log("email ->", email);
    console.log("password ->", password);
  };

  return (
    <div className="w-[400px] mx-auto p-10 bg-white">
      <input
        onChange={handleEmailChange}
        type="text"
        className="w-full bg-js101 p-4"
      />
      <input
        onChange={handlePasswordChange}
        type="password"
        className="w-full bg-green-400 p-4"
      />
      <button onClick={handleSubmit} className="w-full bg-slate-400 p-4">
        Login
      </button>
    </div>
  );
}
