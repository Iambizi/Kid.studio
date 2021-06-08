import styles from '../../../styles/scss/common/_navigation.module.scss';
import Link from 'next/link';
import Logo from './logo';

interface Type {
    bgImg?: boolean;
    setbgImg?: any;
}

export default function navigation({ bgImg, setbgImg }:Type):JSX.Element{
    return(
        <>
            <header>
                <nav className={styles.navigation}>
                    <Logo />
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