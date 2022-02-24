import styles from "../../styles/scss/common/_loader.module.scss";
import React from "react";

export default function Loader() {
    // const [ isLoading, setIsLoading ] = useState(false);
    // const router = useRouter();

    // useEffect(()=>{
    //     const updateLoadingStatus = () => setIsLoading(!isLoading);

    //     router.events.on("routeChangeStart", updateLoadingStatus);
    //     router.events.on("routeChangeComplete", updateLoadingStatus);

    //     return () => {
    //         router.events.off("routeChangeStart", updateLoadingStatus);
    //         router.events.off("routeChangeComplete", updateLoadingStatus);
    //       };
    //     }, [isLoading]);

    return (
        <>
            {/* <div className={styles.loaderBackground}>
                <div className={styles.loader}>
                </div>
            </div> */}
            <div className={styles.loader}>
            </div>
        </>
    )
}