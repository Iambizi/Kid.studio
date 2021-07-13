import styles from '../../styles/scss/info/_info.module.scss';

export default function infoBox(){

    return(
    <>
        <div className={styles.infoContainer}>
                <p>Inspired by our youth, influenced by our city.</p>
                <p>→ Creative Direction + Music Videos + Commercials</p>
                <p>email@kidstudio.co</p>
        </div>
    </>
    )
}