'use client'
import SignUpForm from '@/components/signup/SignUpForm';
import { AuthProvider } from '@/context/AuthContext';

const SignupPage = () => {
  return (
    <AuthProvider>
      <div>
        <h1>Signup</h1>
        <SignUpForm />
      </div>
    </AuthProvider>
  )
}

export default SignupPage;
