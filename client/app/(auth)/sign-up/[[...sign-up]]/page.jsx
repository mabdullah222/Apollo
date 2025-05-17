import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp afterSignUpUrl="/register"/>
    </div>
  );
}
