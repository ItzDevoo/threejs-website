import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const ModernScene = dynamic(() => import('../components/ModernScene'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />
});

export default function Nexis() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleHomeClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/');
    }, 150); // Small delay for smoother transition
  };

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsTransitioning(true);
    };

    const handleRouteChangeComplete = () => {
      setIsTransitioning(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Nexis - ItzDevoo's Portfolio</title>
        <meta name="description" content="Nexis app by ItzDevoo - Coming Soon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/profile.png" />
      </Head>

      <div className="min-h-screen bg-black">
        <div className="fixed inset-0 w-full h-full">
          <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-75' : 'opacity-100'}`}>
            <ModernScene 
              currentSection="nexis" 
              setCurrentSection={() => {}} 
              onHomeClick={handleHomeClick}
            />
          </div>
        </div>
        
        {/* Invisible content to enable scrolling */}
        <div className="relative z-0 h-[200vh]" />
      </div>
    </>
  );
}