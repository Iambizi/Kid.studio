import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Loader from "../common/R3FLoader";
import InfoPlane from "./infoWarpedPlane";
import { isMobile } from 'react-device-detect';

interface Type {
    src: string;
}

const InfoPlaneCanvas = ({ src }: Type): JSX.Element  => {

    return (
        <>
            <div className={`${styles.homeScene}`}>
                <Canvas dpr={isMobile ? [1, 2] : [0, 1]}>
                    <Suspense fallback={<Loader/>}>
                        <InfoPlane src={src} />
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}

export default InfoPlaneCanvas;