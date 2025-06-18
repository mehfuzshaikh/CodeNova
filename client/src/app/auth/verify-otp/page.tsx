import { Suspense } from "react";
import VerifyOtpComponent  from "../../../components/VerifyOtpComponent";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <VerifyOtpComponent />
    </Suspense>
  );
}
