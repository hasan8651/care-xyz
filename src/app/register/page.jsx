import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage(props) {
  const searchParams = await props.searchParams;
  const callbackUrl = searchParams?.callbackUrl || "/";

   const session = await getServerSession(authOptions);
  if (session) {
    redirect(callbackUrl);
  }

  return <RegisterForm callbackUrl={callbackUrl} />;
}