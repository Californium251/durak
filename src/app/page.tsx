'use client'
import App from '@/components/game/App';
import { ReduxProvider } from '@/context/reduxProvider';

function Home() {
  return (
    <ReduxProvider>
      <div>Main page</div>
    </ReduxProvider>
  )
}

export default Home;
