import styles from '../../styles/scss/common/_footer.module.scss';
import Link from 'next/link';

interface Type {
    bgImg?: boolean;
    setbgImg?: any;
}

export default function footer({ bgImg, setbgImg }:Type):JSX.Element{
    return(
        <>
            <footer className={styles.footer}>
                <ul className={styles.footerLinks}>
                    <a className={ bgImg ? `${styles.footerLink} ${styles.hoverColor}` : `${styles.footerLink}` } href={"http://instagram.com/kidstudio_"}>INSTAGRAM</a>
                    /
                    <Link href={"/work/reel"}>
                        <a className={ bgImg ? `${styles.footerLink} ${styles.hoverColor}` : `${styles.footerLink}` }>REEL</a>
                    </Link>
                    /
                    <a className={ bgImg ? `${styles.footerLink} ${styles.hoverColor}` : `${styles.footerLink}` } href={""}>EMAIL@KIDSTUDIO.CO</a>
                </ul>
            </footer>
        </>
    )
}