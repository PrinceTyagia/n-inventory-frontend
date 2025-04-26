"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { usePostVerifyInviteUserMutation } from "@/hooks/Api/user/userHook";
import { cn } from "@/lib/utils";

import { InviteInputState, inviteSignupSchema } from "@/schema/userSchema";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";



export function InviteFormMain() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  const orgId = searchParams.get('orgId');
  const role = searchParams.get('role');
  const token = searchParams.get('token');
  const location = searchParams.get('location');


  const [showPassword, setShowPassword] = useState(false);
  const [formInput, setFormInput] = useState<InviteInputState>({
    firstName: "",
    lastName: "",
    phoneNo: "",
    password: "",
  });
  const [fieldErrors, setFieldError] = useState<Partial<InviteInputState>>({});
  const [resError, setResError] = useState("");
  const [registerInviteUser, { isLoading }] = usePostVerifyInviteUserMutation();

  const handleRegister = async () => {
    const result = inviteSignupSchema.safeParse(formInput);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setFieldError(fieldError as Partial<InviteInputState>);
      return;
    }
    try {
      const payload = {
        firstName: formInput.firstName,
        lastName: formInput.lastName,
        slug: formInput.firstName + formInput.lastName,
        phone: formInput.phoneNo,
        email,
        password: formInput.password,
        organisation: orgId,
        role,
        token,
        location,
      };
      const response = await registerInviteUser(payload).unwrap();
      if (response.success) {
        router.push(`/login?email=${response?.data?.email}`);
        toast.success("Account Created successfully!", {
          description: "Your account has been Created, Pending Verification",
        });
      }
      setFieldError({});
    } catch (error: any) {
      setResError(error?.data?.message);
      setFieldError({});
    }
  };

  return (
    <div  
    className={cn(
              "absolute inset-0",
              "[background-size:40px_40px]",
              "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
              "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
            )}>

<div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
<div className="z-20 bg-[#e5e7eb]/25 w-full lg:grid min-h-screen lg:grid-cols-2 relative">
      <div className="mx-auto min-w-xl my-auto gap-6">
        <div className="grid mb-8">
          <h1 className="text-3xl font-bold">Invite User</h1>
          <p className="text-muted-foreground text-sm">
            Invite a user to your{" "}
            <span className="text-rose-600 pr-2">nInventory Pro</span> account to get started
          </p>
        </div>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 w-full">
              <Label htmlFor="organisation">First Name</Label>
              <Input
                type="text"
                id="firstName"
                value={formInput.firstName}
                onChange={(e) =>
                  setFormInput({ ...formInput, firstName: e.target.value })
                }
                placeholder="First Name"
                className="bg-white h-10 rounded-none"
              />
              {fieldErrors.firstName && (
                <p className="text-red-600 text-xs">{fieldErrors.firstName}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <Label>Last Name</Label>
              <Input
                type="text"
                value={formInput.lastName}
                onChange={(e) =>
                  setFormInput({ ...formInput, lastName: e.target.value })
                }
                placeholder="Last Name"
                className="bg-white h-10 rounded-none"
              />
              {fieldErrors.lastName && (
                <p className="text-red-600 text-xs">{fieldErrors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 w-full">
              <Label>Phone No</Label>
              <Input
                type="text"
                value={formInput.phoneNo}
                onChange={(e) =>
                  setFormInput({ ...formInput, phoneNo: e.target.value })
                }
                placeholder="Phone Number"
                className="bg-white h-10 rounded-none"
              />
              {fieldErrors.phoneNo && (
                <p className="text-red-600 text-xs">{fieldErrors.phoneNo}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <Label>Email</Label>
              <Input
                type="email"
                value={email || ""}
                readOnly
                placeholder="Email"
                className="bg-white h-10 rounded-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <Label>Password</Label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formInput.password}
                onChange={(e) =>
                  setFormInput({ ...formInput, password: e.target.value })
                }
                className="block w-full rounded-none border py-2 pl-3 pr-10 text-sm bg-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-rose-600 rounded-none"
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
            {fieldErrors.password && (
              <p className="text-red-600 text-xs">{fieldErrors.password}</p>
            )}
            {resError && <p className="text-red-600 text-xs">{resError}</p>}
          </div>

          <Button
            onClick={handleRegister}
            type="button"
            disabled={isLoading}
            className="w-full bg-rose-600 hover:bg-rose-500"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Please wait...
              </>
            ) : (
              "Create User"
            )}
          </Button>
        </form>
      </div>
    </div>
    </div>
  );
    
   
}
