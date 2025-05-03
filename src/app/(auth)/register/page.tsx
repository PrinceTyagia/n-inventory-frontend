"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useGetCountryQuery } from "@/hooks/Api/country/countryHook";
import { useCreateOrganizationMutation } from "@/hooks/Api/organizations/organizationsHook";
import { cn } from "@/lib/utils";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import Select from "react-dropdown-select";
import { toast } from "sonner";
type Option = { value?: string; label?: string;phonecode?:string;currency?:string,name?:string };

const Page = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [formInput, setFormInput] = useState<SignupInputState>({
    organisation: "",
    firstName: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldError] = useState<Partial<SignupInputState>>({});
  // const [selected, setSelected] = useState<Option[]>([]);  
  const [resError,setResError] = useState("")
  // const {data} = useGetCountryQuery(null)
  const [registerOrg,{isLoading}] = useCreateOrganizationMutation()

  const handleRegister = async () => {
    console.log("call");
    
    const result = userSignupSchema.safeParse(formInput);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setFieldError(fieldError as Partial<SignupInputState>);
      return;
    }
    try {
      const payload = {        
        orgName:formInput.organisation,
        adminName:formInput.firstName,
        email:formInput.email,
        contactNumber:formInput.phoneNo,
        password:formInput.password,
        billingPlan: "free"
      }
      const response  = await registerOrg(payload).unwrap()
      if(response.success){
        router.push(`/verify/${response.data?.orgId}?emailId=${response?.data?.email}`)
        toast.success("Account Created successfully!",{
          description:"Your account has been Created, Pending Verification"
        })
      }
      setFieldError({})
      
    } catch (error:any) {
      setResError(error?.data?.message)
      toast.error("Account Creation Failed!",{
        description:error?.data?.message
      })
    
      setFieldError({})
    }
   
  };

  return (
    <>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="z-20 bg-[#e5e7eb]/25 w-full lg:grid min-h-screen lg:grid-cols-2 relative">
        <div className="mx-auto min-w-xl my-auto gap-6">
          <div className="grid mb-8">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground text-sm">
              Create your <span className="text-rose-600 pr-2">nInventory Pro</span>
              Account today to get started
            </p>
          </div>
          <form className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 w-full">
                <Label htmlFor="organisation">Organisation</Label>
                <Input
                  type="text"
                  id="organisation"
                  value={formInput.organisation}
                  onChange={(e) => setFormInput({ ...formInput, organisation: e.target.value })}
                  placeholder="Organisation"
                  className="bg-white h-10 rounded-none"
                />
                <div className="min-h-[20px]">
                  {fieldErrors.organisation && <p className="text-red-600 text-xs">{fieldErrors.organisation}</p>}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <Label>Name</Label>
                <Input
                  type="text"
                  value={formInput.firstName}
                  onChange={(e) => setFormInput({ ...formInput, firstName: e.target.value })}
                  placeholder="First Name"
                  className="bg-white h-10 rounded-none"
                />
                <div className="min-h-[20px]">
                  {fieldErrors.firstName && <p className="text-red-600 text-xs">{fieldErrors.firstName}</p>}
                </div>
              </div>
              {/* <div className="flex flex-col gap-1.5 w-full">
                <Label>Select Country</Label>
                <Select
                  options={data}
                  labelField="name"
                  valueField="iso3"
                  values={selected}
                  onChange={(values) => {
                    setSelected(values);
                    setFormInput({ ...formInput, country: values[0]?.name || "" });
                  }}
                  className="bg-white h-10 rounded-none"
                  placeholder="Select Country"
                />
                <div className="min-h-[20px]">
                  {fieldErrors.country && <p className="text-red-600 text-xs">{fieldErrors.country}</p>}
                </div>
              </div> */}
              
            </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 w-full">
                <Label>Phone No</Label>
                <Input
                  type="text"
                  value={formInput.phoneNo}
                  onChange={(e) => setFormInput({ ...formInput, phoneNo: e.target.value })}
                  placeholder="Phone Number"
                  className="bg-white h-10 rounded-none"
                />
                <div className="min-h-[20px]">
                  {fieldErrors.phoneNo && <p className="text-red-600 text-xs">{fieldErrors.phoneNo}</p>}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formInput.email}
                  onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
                  placeholder="Email"
                  className="bg-white h-10 rounded-none"
                />
                <div className="min-h-[20px]">
                  {fieldErrors.email && <p className="text-red-600 text-xs">{fieldErrors.email}</p>}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <Label>Password</Label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formInput.password}
                  onChange={(e) => setFormInput({ ...formInput, password: e.target.value })}
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
              <div className="min-h-[20px]">
                {fieldErrors.password && <p className="text-red-600 text-xs">{fieldErrors.password}</p>}
                {resError && <p className="text-red-600 text-xs">{resError}</p>}
              </div>
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
    "Sign Up"
  )}
</Button>
            {/* <button
              onClick={handleRegister}
              type="button"
              className="rounded-md w-full bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-500"
            >
              {
                isLoading ? 'Creating Please wait...' :' Sign Up'
              }
             
            </button> */}
            <p className="text-sm text-gray-500 mt-2">
              Already Registered?{' '}
              <Link className="font-semibold text-rose-600 hover:text-rose-500" href="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
        <div>Right side</div>
      </div>
    </>
  );
};

export default Page;