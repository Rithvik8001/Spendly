// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <SignIn
//         path="/sign-in"
//         routing="path"
//         signUpUrl="/sign-up"
//         afterSignInUrl="/dashboard"
//       />
//     </div>
//   );
// }

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignIn
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
