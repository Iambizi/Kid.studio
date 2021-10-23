import '../styles/globals.css'
import '../styles/scss/_globals.scss'
import '../styles/scss/_index.scss'
import { useRouter } from "next/router";
import { PageTransition } from 'next-page-transitions';
import React, { useEffect } from "react";

function MyApp({ Component, pageProps}) {
  const router = useRouter();
  const pathName = router.pathname;
  const comparison = pathName === "/work/[project]";

  useEffect(()=>{

    // const bg = document.body;
    
    // bg.classList.add("needsScroll");
    // console.log('scrolly');

    // const removePageScroll = () =>{
    //       bg.classList.remove("needsScroll");
    //       console.log('no scrolly');
    // }

    // router.events.on('beforeHistoryChange', removePageScroll);
    // return () => {
    //   router.events.off('beforeHistoryChange', removePageScroll);
    // };

},[]);

  return(
    <PageTransition timeout={700} classNames="page-transition">
      <Component {...pageProps} key={router.route} />
    </PageTransition>  
  )
  
}

export default MyApp
