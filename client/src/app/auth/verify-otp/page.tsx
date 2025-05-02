"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSearchParams, useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { verifyOtp, resendOtp } from "@/lib/api/auth";
import { toast } from "sonner";

const schema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .length(6, "OTP must be 6 digits"),
});

type FormData = yup.InferType<typeof schema>;

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const [customError, setCustomError] = useState<string | null>(null);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0); // seconds left
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Countdown logic
  useEffect(() => {
    if (!resendDisabled) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendDisabled]);

  const onSubmit = async (data: FormData) => {
    setCustomError(null);
    if (!email) {
      setCustomError("Email is missing in the URL.");
      return;
    }

    try {
      setLoading(true);
      const res = await verifyOtp(email, data.otp);
      toast.success(res.data.message);
      router.push("/");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setCustomError(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setCustomError(null);
    if (!email) {
      setCustomError("Email is missing in the URL.");
      return;
    }

    try {
      const res = await resendOtp(email);
      toast.success(res.data.message);
      setResendDisabled(true)
      setCountdown(60);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setCustomError(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-35">
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
          <div className="flex justify-center">
            <Controller
              name="otp"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputOTP
                  {...field}
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  onChange={(val) => field.onChange(val)}
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          </div>
          {errors.otp && (
            <p className="text-sm text-red-600 mt-1 text-center">{errors.otp.message}</p>
          )}
          {!errors.otp && customError && (
            <p className="text-sm text-red-600 mt-1 text-center">{customError}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          {"Didn't get the OTP?"}{" "}
          <button
            type="button"
            className="font-medium text-blue-600 hover:underline disabled:text-gray-400"
            disabled={resendDisabled}
            onClick={handleResendOtp}
          >
            {resendDisabled ? `Resend OTP in ${countdown}s` : "Resend OTP"}
          </button>
        </p>
      </form>
    </div>
  );
}
