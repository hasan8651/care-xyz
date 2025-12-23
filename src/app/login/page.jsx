import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage(props) {
  const searchParams = await props.searchParams;
  const callbackUrl = searchParams?.callbackUrl || "/";

  const session = await getServerSession(authOptions);
  if (session) {
    redirect(callbackUrl);
  }

  return <LoginForm callbackUrl={callbackUrl} />;
}
