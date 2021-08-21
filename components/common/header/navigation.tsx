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