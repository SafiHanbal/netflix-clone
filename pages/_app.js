import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { magic } from '@/lib/magic-client';
import '@/styles/globals.css';

import Loader from '@/components/loader/loader';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) router.push('/');
      else router.push('/login');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);
  return isLoading ? <Loader /> : <Component {...pageProps} />;
}
