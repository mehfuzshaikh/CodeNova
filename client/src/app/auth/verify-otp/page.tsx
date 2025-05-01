"use client";

import { Controller,useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const schema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .length(6, "OTP must be 6 digits"),
});

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const [resendDisabled, setResendDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/verifyotp",
        {
          email,
          otp: data.otp,
        }
      );
      alert(res.data.message);
      // Save token or redirect to dashboard
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  const resendOtp = async () => {
    try {
      setResendDisabled(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/resendotp",
        { email }
      );
      alert(res.data.message);
      setTimeout(() => setResendDisabled(false), 60000); // re-enable after 60s
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to resend OTP");
      setResendDisabled(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter the 6-digit OTP sent to{" "}
          <span className="font-semibold">{email}</span>
        </p>

        <div>
          <Controller
            name="otp"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputOTP
                {...field}
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                onChange={(val) => field.onChange(val)} // this is key!
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {/* <Input {...register("otp")} maxLength={6} placeholder="123456" /> */}
          {errors.otp && (
            <p className="text-sm text-red-600">{errors.otp.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Verify
        </Button>

        <button
          type="button"
          className="text-blue-600 text-sm underline mt-2 w-full"
          disabled={resendDisabled}
          onClick={resendOtp}
        >
          {resendDisabled ? "Wait 60s to resend OTP" : "Resend OTP"}
        </button>
      </form>
    </div>
  );
}
