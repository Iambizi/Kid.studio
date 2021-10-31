import styles from '../../../styles/scss/common/_navigation.module.scss';
import Link from 'next/link';
import Logo from './logo';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';


interface Type {
    bgImg?: boolean;
}

export default function navigation( { bgImg }:Type ):JSX.Element{
    const router = useRouter();
    const [notFixed, setNotFixed] = useState(false);
    const path = router.pathname;
    const workPath = /\bwork\b/;

    const setFixedNav = () =>{
        if(router.pathname.match(workPath)){
            setNotFixed(false);
            console.log("not fixed");
        }else{
            setNotFixed(false);
            console.log("fixed");
        }
    }


    useEffect(()=>{
        setFixedNav();

        // router.events.on('beforeHistoryChange', setFixedNav);
        // return () => {
        //   router.events.off('beforeHistoryChange', setFixedNav);
        // };
    },[]);

    console.log(notFixed);

    return(
        <>
            <header>
                <nav className={notFixed ? `${styles.navigation} fixed`: `${styles.navigation}`}>
                        <Logo bgImg={bgImg} />
                            <ul className={styles.navLinks}>
                                <Link href={"/work"}>
                                    <a className={ bgImg ? `${styles.navLink} ${styles.hoverColor}` : `${styles.navLink}` }>WORK</a>
                                </Link>
                                <Link href={"/info"}>
                                    <a className={ bgImg ? `${styles.navLink} ${styles.hoverColor}` : `${styles.navLink}` }>INFO</a>
                                </Link>
                            </ul>
                </nav>
            </header>
        </>
    );
}