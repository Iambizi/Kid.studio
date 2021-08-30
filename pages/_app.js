import '../styles/globals.css'
import '../styles/scss/_globals.scss'
import '../styles/scss/_index.scss'
import { useRouter } from "next/router";
import { PageTransition } from 'next-page-transitions';

function MyApp({ Component, pageProps}) {
  const router = useRouter();
  return(
    <PageTransition timeout={600} classNames="page-transition">
      <Component {...pageProps} key={router.route} />
    </PageTransition>  
  )
  
}

export default MyApp
