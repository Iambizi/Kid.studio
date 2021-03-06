import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Loader from "../common/R3FLoader";
import InfoPlane from "./infoWarpedPlane";
import { isMobile } from "react-device-detect";
// import InfoPlane from "../homeContent/r3fPlanes/planes";

interface Types {
    src: string;
    loaderLink: string;
}

const InfoPlaneCanvas: React.FC<Types> = ({ src, loaderLink }): JSX.Element => {

    return (
        <>
            <div className={`${styles.homeScene}`}>
                <Canvas dpr={isMobile ? [1, 2] : [0, 1]}>
                    <Suspense fallback={<Loader loaderLink={loaderLink} />}>
                    {/* <InfoPlane projects={src} position={0} projectIndex={0}/>  */}
                        <InfoPlane src={src} />
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}

export default InfoPlaneCanvas;