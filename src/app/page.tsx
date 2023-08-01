"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  const handleLogin = () => {
    signIn();
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
