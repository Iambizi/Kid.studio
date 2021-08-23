import '../styles/globals.css'
import '../styles/scss/_globals.scss'
import '../styles/scss/_index.scss'
import { useRouter } from "next/router";
import { PageTransition } from 'next-page-transitions';
import Router from "next/router";

// Add that code to _app.tsx / _app.jsx
    const routeChange = () => {
      // Temporary fix to avoid flash of unstyled content
      // during route transitions. Keep an eye on this
      // issue and remove this code when resolved:
      // https://github.com/vercel/next.js/issues/17464

      const tempFix = () => {
        const allStyleElems = document.querySelectorAll('style[media="x"]');
        allStyleElems.forEach((elem) => {
          elem.removeAttribute("media");
        });
      };
      tempFix();
    };

   Router.events.on("routeChangeComplete", routeChange );
   Router.events.on("routeChangeStart", routeChange );


function MyApp({ Component, pageProps}) {
  const router = useRouter();
  return(
    <PageTransition timeout={600} classNames="page-transition">
      <Component {...pageProps} key={router.route} />
    </PageTransition>  
  )
  
}

export default MyApp
