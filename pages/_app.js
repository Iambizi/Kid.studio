import '../styles/globals.css'
import '../styles/scss/_globals.scss'
import '../styles/scss/_index.scss'
import { PageTransition } from 'next-page-transitions';
import React from "react";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps}) {
  const router = useRouter();

  return(
    <PageTransition timeout={700} classNames="page-transition">
      <Component {...pageProps} key={router.route} />
    </PageTransition>  
  )
  
}

export default MyApp
