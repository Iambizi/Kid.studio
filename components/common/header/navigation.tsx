import styles from '../../../styles/scss/common/_navigation.module.scss';
import Link from 'next/link';
import Logo from './logo';

export default function navigation():JSX.Element{
    return(
        <>
            <header>
                <nav className={styles.navigation}>
                    <Logo />
                    <ul className={styles.navLinks}>
                        <Link href={"/work"}>
                            <a className={styles.navLink}>WORK</a>
                        </Link>
                        <Link href={"/info"}>
                            <a className={styles.navLink}>INFO</a>
                        </Link>
                    </ul>
                </nav>
            </header>
        </>
    );
}