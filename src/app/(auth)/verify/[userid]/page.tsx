"use client";
import { cn } from "@/lib/utils";
import {  useRouter, useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import { toast } from "sonner"
import { CheckCircle } from "lucide-react";
import { useVerifyOtpMutation } from "@/hooks/Api/organizations/organizationsHook";
import Image from "next/image";

const Page = () => {
  // const params = useParams();
  const searchParams  = useSearchParams()
  const router = useRouter()
  const [error,setError] = useState("")
  const [otpCode,setOtpCode] = useState("")
  const [verifyOtpMut] = useVerifyOtpMutation()
  const [verifyTemplate,setVerifyTemplate] = useState(false)

  // console.log("se",searchParams.get("emailId"));
  const verifyOtp = async() => {
    if(otpCode.length  !== 6){
      setError("enter otp 6 digit number")
      return
    }
    try {
      const payload = {
        email:searchParams.get("emailId"),
        otp:otpCode
      }
      const response = await verifyOtpMut(payload).unwrap()
    if(response.success){
      setVerifyTemplate(true)
      toast.success("Account verified successfully!",{
      description:"Your account has been successfully verified"
    })
    }
    } catch (error:any) {
      console.log(error?.data?.message);
      
      toast.error("Something went wrong",{
      description:"There was an error verifying your code. Please try again."
    })
    }
 
    
    
    
  }
  
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
        <div className="">
          <div>
            <Image src="/ninventoryPro.png" width={200} alt="inpro" unoptimized className="w-[200px]" />
          </div>
          {
            verifyTemplate ?(<> 
           <div className=" flex items-center justify-center  px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {/* Heading with green check icon */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="text-green-500 w-7 h-7" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Verification Successful
          </h1>
        </div>

        <p className="text-muted-foreground text-sm ">
        Your account has been successfully verified
        </p>

        {/* Success description */}
        <div className="mt-4 text-gray-700 text-sm bg-green-300 flex p-4">
        <CheckCircle className="text-green-500 w-5 h-5" /> <p>Your account is now active. You can start using our services.</p>
        </div>

        {/* Button to login */}
        <div className="mt-6">
          <button
            onClick={() => router.push(`/login?email=${searchParams.get("emailId")}`)}
            type="button"
            className="w-full bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold py-2 px-4 rounded-none shadow transition duration-200"
          >
            Continue to Login
          </button>
        </div>
      </div>
    </div>
          
            </>):(<> <div className="flex mx-5  justify-center items-center flex-col">
              <h1 className="text-3xl font-bold">Verify Your Account</h1>
              <p className="text-muted-foreground text-sm mt-2">
                We've sent a 6-digit verification code to {searchParams.get("emailId")}
              </p>
            </div>
            <div className="flex mx-5 my-5 justify-center items-center flex-col">
              <InputOTP
                maxLength={6}
                onChange={(value) => setOtpCode(value)}
                className="rounded-none"
              >
                <InputOTPGroup className="rounded-none">
                  <InputOTPSlot index={0} className="bg-white rounded-none" />
                  <InputOTPSlot index={1} className="bg-white" />
                  <InputOTPSlot index={2} className="bg-white" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup className="rounded-none">
                  <InputOTPSlot index={3} className="bg-white" />
                  <InputOTPSlot index={4} className="bg-white" />
                  <InputOTPSlot index={5} className="bg-white" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex mx-5 my-5 justify-center items-center flex-col">
            <button
              onClick={verifyOtp}
              type="button"
              className="rounded-md w-sm bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-500 rounded-none"
            >
              Verify Code
            </button>
            </div></>)
          }
         
         
        </div>
        <div>Right side</div>
      </div>
    </>
  );
};

export default Page;
