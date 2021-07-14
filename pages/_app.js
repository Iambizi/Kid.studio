import '../styles/globals.css'
import '../styles/scss/_globals.scss'
import '../styles/scss/_index.scss'
import styles from "../styles/scss/common/_transition.module.scss";
import { PageTransition } from 'next-page-transitions';


function MyApp({ Component, pageProps }) {
  return(
    <PageTransition timeout={500} classNames="page-transition">
      <Component {...pageProps} />
  </PageTransition>  
  )
  
}

export default MyApp
