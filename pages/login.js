import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { magic } from '@/lib/magic-client';
import styles from '../styles/login.module.css';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeComplete', handleComplete);
    router.events.off('routeChangeComplete', handleComplete);
  }, [router]);

  const handleOnChangeEmail = (e) => {
    setUserMsg('');
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    console.log('log in');
    if (!email) return setUserMsg('Enter a valid email address');
    if (email === 'safihanbal@gmail.com') {
      setIsLoading(true);
      try {
        const didToken = await magic.auth.loginWithMagicLink({ email });
        if (didToken) {
          router.push('/');
          setIsLoading(true);
        }
      } catch {
        // Handle errors if required!
        console.log('Something went wrong');
      }
    } else {
      // show user message
      setUserMsg('Something went wrong');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix logo"
                width={128}
                height={34}
              />
            </div>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            className={styles.emailInput}
            type="text"
            placeholder="Email"
            onChange={handleOnChangeEmail}
          />
          {userMsg && <p className={styles.userMsg}>{userMsg}</p>}

          <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
