import { Suspense } from "react";
import SuccessClient from "./SuccessClient";


export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Processing...</p>}>
      <SuccessClient />
    </Suspense>
  );
}
