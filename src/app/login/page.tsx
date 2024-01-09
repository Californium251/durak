"use client";
import LoginForm from "@/components/login/LoginForm";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { auth } = useAuth();
  const router = useRouter();
  if (auth.token) {
    router.push("/");
  }
  return (
    <div>
      <h1>Login page</h1>
      <LoginForm />
    </div>
  );
};
export default LoginPage;
