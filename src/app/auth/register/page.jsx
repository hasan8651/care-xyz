import { Suspense } from "react";
import RegisterClient from "./RegisterClient";


export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <RegisterClient />
    </Suspense>
  );
}
