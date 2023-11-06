'use client'
import LoginForm from "@/components/login/LoginForm";
import { AuthProvider } from "@/context/AuthContext";

const LoginPage = () => {
    return <AuthProvider>
        <div>
            <h1>Login page</h1>
            <LoginForm />
        </div>
    </AuthProvider>
}
export default LoginPage;
