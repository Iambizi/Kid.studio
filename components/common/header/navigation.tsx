import styles from '../../../styles/scss/common/_navigation.module.scss';
import Link from 'next/link';
import Logo from './logo';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';


interface Type {
    bgImg?: boolean;
}

const Navigation = ( { bgImg }:Type ):JSX.Element => {
    const router = useRouter();

    //Handles logic for removal of fixed positioning along pages
    const [notFixed, setNotFixed] = useState(false);
    const workPath = /\/work$/gm;
    const infoPath = /\/info$/gm;
    const homePath = /\/$/gm;

    const setFixedNav = () =>{
        if(router.pathname.match(workPath) || router.pathname.match(infoPath) || router.pathname.match(homePath) ){
            setNotFixed(true);
        }
    }

    useEffect(()=>{
        setFixedNav();

        router.events.on('beforeHistoryChange', setFixedNav);
        return () => {
          router.events.off('beforeHistoryChange', setFixedNav);
        };
    },[]);

    return(
        <>
            <header>
                <nav className={notFixed ? `${styles.navigation}`: `${styles.navigation} ${styles.fixed}`}>
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
};

export default Navigation;