import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
export default function JoinPage() {
  const router = useRouter();
  const { ref, platform } = router.query;
  useEffect(() => {
    if (!router.isReady) return;
    // Store referral code in localStorage
    if (ref) {
      localStorage.setItem('referralCode', ref);
    }
    // Detect platform
    const userAgent = navigator.userAgent || navigator.vendor;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    // Try to open the app
    const appLink = `summerswheeps://join?ref=${ref || ''}`;
    window.location.href = appLink;
    // Fallback to store after 2.5 seconds
    const timeout = setTimeout(() => {
      if (isAndroid || platform === 'android') {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.sixfaces.summerswheeps';
      } else if (isIOS || platform === 'ios') {
        window.location.href = 'https://apps.apple.com/app/swheeps/id123456789';
      } else {
        // Desktop fallback
        router.push(`/signup?ref=${ref || ''}`);
      }
    }, 2500);
    return () => clearTimeout(timeout);
  }, [router.isReady, ref, platform]);
  return (
    <>
      <Head>
        <title>Join Swheeps</title>
      </Head>
      <div style={styles.container}>
        <h1>Opening Swheeps...</h1>
        <p>{"If the app doesn't open, you'll be redirected to download it."}</p>
      </div>
    </>
  );
}
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #24A7DD, #1a7ba8)',
    color: 'white',
    textAlign: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
};