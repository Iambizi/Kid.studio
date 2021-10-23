import '../styles/globals.css'
import '../styles/scss/_globals.scss'
import '../styles/scss/_index.scss'
import { PageTransition } from 'next-page-transitions';
import React from "react";

function MyApp({ Component, pageProps}) {

  return(
    <PageTransition timeout={700} classNames="page-transition">
      <Component {...pageProps} key={router.route} />
    </PageTransition>  
  )
  
}

export default MyApp
