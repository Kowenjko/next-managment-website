import { SignIn } from "@stackframe/stack";
import Link from "next/link";

export default function SignInPage(){
  return (
  <div className="min-h-screen flex-center">
    <div className="max-w-md w-full space-y-8">
      <SignIn/>
      <Link href="/" className="underline text-sm"> Go Back Home</Link>
    </div>
  </div>
  )
}