import styles from '../../styles/scss/info/_info.module.scss';

interface Type{
    aboutUs: any;
}

 const InfoBox = ({aboutUs}:Type):JSX.Element =>{
    return(
        <>
            <div className={styles.infoContainer}>
                <p className={styles.aboutUs}>{aboutUs}</p>
            </div>
        </>
    )
}

export default InfoBox;