import Link from 'next/link';
import styles from '../../../styles/scss/common/_navigation.module.scss';

interface Type {
    bgImg?: boolean;
    LogoBlack: string;
    LogoWhite: string;
}

const Logo: React.FC<Type> = ({ bgImg, LogoBlack, LogoWhite }): JSX.Element => {
    return(
        <>
            <div className={styles.logo}>
                <Link href={"/"}>
                    <a>
                        <img src={ bgImg ? `https:${LogoWhite}` : `https:${LogoBlack}` } alt="Kid Studio logo" width={85}
                        height={46.3} />
                    </a>
                </Link>
            </div>
        </>
    )
};

export default Logo;