import styles from '../../styles/scss/common/_footer.module.scss';
import Link from 'next/link'

export default function footer():JSX.Element{
    return(
        <>
            <footer className={styles.footer}>
                <ul className={styles.footerLinks}>
                    <a className={styles.footerLink} href={"http://instagram.com/kidstudio_"}>INSTAGRAM</a>
                    /
                    <Link href={"work/reel"}>
                        <a className={styles.footerLink}>REEL</a>
                    </Link>
                    /
                    <a className={styles.footerLink} href={""}>EMAIL@KIDSTUDIO.CO</a>
                </ul>
            </footer>
        </>
    )
}