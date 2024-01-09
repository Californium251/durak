"use client";
import SignUpForm from "@/components/signup/SignUpForm";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const { auth } = useAuth();
  const router = useRouter();
  if (auth.token) {
    router.push("/");
  }
  return (
    <div>
      <h1>Signup</h1>
      <SignUpForm />
    </div>
  );
};

export default SignupPage;
