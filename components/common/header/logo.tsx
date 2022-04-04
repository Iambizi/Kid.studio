import Link from 'next/link';
import styles from '../../../styles/scss/common/_navigation.module.scss';

interface Type {
    bgImg?: boolean;
}

const Logo = ( { bgImg }: Type ): JSX.Element => {
    return(
        <>
            <div className={styles.logo}>
                <Link href={"/"}>
                    <a>
                        <img src={ bgImg ? "https://kidstudio.co/assets/images/kidwhite.png" : "https://kidstudio.co/assets/images/kid.png" } alt="Kid Studio logo" width={85}
                        height={46.3} />
                    </a>
                </Link>
            </div>
        </>
    )
};

export default Logo;