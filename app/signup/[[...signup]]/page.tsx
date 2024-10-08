import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary text-white",
          },
        }}
        redirectUrl="/dashboard"
      />
    </div>
  );
}
