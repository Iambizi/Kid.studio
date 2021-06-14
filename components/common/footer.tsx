import styles from '../../styles/scss/common/_footer.module.scss';
import Link from 'next/link';

interface Type {
    bgImg?: boolean;
    setbgImg?: any;
}

export default function footer({ bgImg }:Type):JSX.Element{
    return(
        <>
            <footer className={styles.footer}>
                <ul className={ bgImg ? `${styles.footerLinks} ${styles.hoverColor}` : `${styles.footerLinks}` }>
                    <a className={styles.footerLink} href={"http://instagram.com/kidstudio_"}>INSTAGRAM</a>
                    /
                    <Link href={"/work/reel"}>
                        <a className={styles.footerLink}>REEL</a>
                    </Link>
                    /
                    <a className={styles.footerLink} href={""}>EMAIL@KIDSTUDIO.CO</a>
                </ul>
            </footer>
        </>
    )
}