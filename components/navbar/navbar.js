import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import styles from './navbar.module.css';
import { magic } from '@/lib/magic-client';

const Navbar = () => {
  const router = useRouter();
  const [username, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { email, publicAddress } = await magic.user.getMetadata();
        setUserName(email);
      } catch (err) {
        console.log('Error retrieving email', err);
      }
    })();
  }, []);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push('/');
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push('/browse/my-list');
  };

  const handleToggleDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await magic.user.logout();
      router.push('/login');
    } catch (err) {
      console.error('Error logging out', err);
      router.push('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={handleToggleDropdown}
            >
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand-more.svg"
                alt="Expand dropdown icon"
                width={24}
                height={24}
              />
            </button>
          </div>

          {showDropdown && (
            <div className={styles.navDropdown}>
              <div>
                <Link
                  className={styles.linkName}
                  href="/"
                  onClick={handleSignOut}
                >
                  Sign out
                </Link>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
