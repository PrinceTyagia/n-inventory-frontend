// src/app/(auth)/login/LoginForm.tsx
'use client';

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import { useLoginMutation } from "@/hooks/Api/auth/authHook";
import Image from "next/image";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formInput, setFormInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldError] = useState<Partial<LoginInputState>>({});
  const [resError, setResError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMut, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    const result = userLoginSchema.safeParse(formInput);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setFieldError(fieldError as Partial<LoginInputState>);
      return;
    }
    try {
      const payload = {
        email: formInput.email,
        password: formInput.password,
      };
      const response = await loginMut(payload).unwrap();
      if (response.success) {
        toast.success("Login Successful");
        router.push("/dashboard");
      } else {
        if (response.redirectUrl) {
          window.open(response.redirectUrl, '_blank');
        }
        setResError(response?.message);
        toast.error(response?.message);
      }
    } catch (error: any) {
      setResError(error?.data?.message);
      toast.error("Sign-in error", {
        description:
          "Please check your credentials or make sure you verified your email",
      });
    }
  };

  return (
    <div className="relative z-20 bg-[#e5e7eb]/25 w-full lg:grid min-h-screen lg:grid-cols-2">
      {/* Background Grids */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      {/* Login Form Section */}
      <div className="flex flex-col justify-center px-10">
        <Image src="/ninventoryPro.png" height={200} width={200} unoptimized className="w-[200px]" alt="Logo" />
        <div className="flex justify-center items-center flex-col">
          <div className="grid mb-8 text-center">
            <h1 className="text-3xl font-bold">Login to your Account</h1>
            <p className="text-muted-foreground text-sm pt-2">
              Welcome Back to <span className="text-rose-600">nInventory Pro</span>
            </p>
          </div>
          <form className="w-full max-w-sm">
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formInput.email || searchParams.get("email") || ""}
                  onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
                  placeholder="Email"
                  className="bg-white h-10 rounded-none"
                />
                {fieldErrors.email && <p className="text-red-600 text-xs mt-1">{fieldErrors.email}</p>}
              </div>

              <div>
                <Label>Password</Label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formInput.password}
                    onChange={(e) => setFormInput({ ...formInput, password: e.target.value })}
                    className="block w-full border py-2 pl-3 pr-10 text-sm bg-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-rose-600 rounded-none"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                <div className="min-h-[20px]">
                  {fieldErrors.password && <p className="text-red-600 text-xs mt-1">{fieldErrors.password}</p>}
                  {resError && <p className="text-red-600 text-xs mt-1">{resError}</p>}
                </div>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              type="button"
              disabled={isLoading}
              className="w-full mt-6 bg-rose-600 hover:bg-rose-500"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading Please wait...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <p className="text-sm text-gray-500 mt-3 text-center">
              Not Registered?
              <Link href="/register" className="font-semibold text-rose-600 ml-1 hover:text-rose-500">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side Content */}
      <div className="hidden lg:flex items-center justify-center bg-rose-100">
        <p className="text-gray-400">Right side content or illustration</p>
      </div>
    </div>
  );
};

export default LoginForm;
