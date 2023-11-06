'use client'
import App from '@/components/game/App';
import { ReduxProvider } from '@/context/reduxProvider';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { AuthProvider } from '@/context/AuthContext';
import MainPage from '@/components/main.page/MainPage';

function Home() {
  const { auth } = useAuth();
  const token = auth.token;
  return (
    <AuthProvider>
      <ReduxProvider>
        <MainPage />
      </ReduxProvider>
    </AuthProvider>
  )
}

export default Home;
