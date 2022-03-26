import '../styles/globals.css';
import '../styles/scss/_globals.scss';
import { useRouter } from 'next/router';
import { PageTransition } from 'next-page-transitions';
import React, { useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const routeChange = () => {
      // Temporary fix to avoid flash of unstyled content
      // during route transitions. Keep an eye on this
      // issue and remove this code when resolved:
      // https://github.com/vercel/next.js/issues/17464

      const tempFix = () => {
        const allStyleElems = document.querySelectorAll('style[media="x"]');
        allStyleElems.forEach((elem) => {
          elem.removeAttribute('media');
        });
      };
      tempFix();
    };
    router.push(router.asPath);
    router.events.on('beforeHistoryChange', routeChange);
    router.events.on('routeChangeComplete', routeChange);
    router.events.on('routeChangeStart', routeChange);
  }, []);

  return (
    <><Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
    </Head>
      <PageTransition timeout={700} classNames="page-transition">
        <Component {...pageProps} key={router.route} />
      </PageTransition>
    </>
  );
}

export default MyApp;
