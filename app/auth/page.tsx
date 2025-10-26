"use client";
// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [hasAccount, setHasAccount] = useState(null);
  // ... states for name, otp, etc.

  const checkUser = async () => {
    const res = await axios.post("/api/check-user", { phone });
    setHasAccount(res.data.hasAccount);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {!hasAccount && (
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="شماره موبایل"
            className="w-full mb-4"
          />
        )}
        <button
          onClick={checkUser}
          className="bg-blue-500 text-white w-full py-2"
        >
          ارسال
        </button>
      </div>
    </div>
  );
};

export default Login;
