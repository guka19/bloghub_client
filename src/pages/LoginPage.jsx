/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DarkModeToggle from "@/components/ui/darkModeToggle";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("authToken", token);
      toast.success("Successfully logged in");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-950">
      <div className="w-full max-w-md p-8 bg-white dark:bg-neutral-950 rounded-lg shadow-lg relative">
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <DarkModeToggle />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Login</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Don't have an account?</p>
          <Link
            to="/register"
            className="mt-2 font-medium"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
