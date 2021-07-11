import styles from '../../../styles/scss/common/_navigation.module.scss';
import Link from 'next/link';
import Logo from './logo';

interface Type {
    bgImg?: boolean;
}

export default function navigation( { bgImg }:Type ):JSX.Element{
    return(
        <>
            <header>
                <nav className={styles.navigation}>
                    <Link href={process.env.NEXT_PUBLIC_APP_DOMAIN + "/"}>
                        <Logo bgImg={bgImg} />
                    </Link>
                    <ul className={styles.navLinks}>
                        <Link href={process.env.NEXT_PUBLIC_APP_DOMAIN + "/work"}>
                            <a className={ bgImg ? `${styles.navLink} ${styles.hoverColor}` : `${styles.navLink}` }>WORK</a>
                        </Link>
                        <Link href={process.env.NEXT_PUBLIC_APP_DOMAIN + "/info"}>
                            <a className={ bgImg ? `${styles.navLink} ${styles.hoverColor}` : `${styles.navLink}` }>INFO</a>
                        </Link>
                    </ul>
                </nav>
            </header>
        </>
    );
}