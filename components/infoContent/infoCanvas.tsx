import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Loader from "../common/R3FLoader";
import {InfoPlane} from "./infoWarpedR3f3";
import { isMobile } from 'react-device-detect';

interface Type {
    src: string;
}

export const InfoPlaneCanvas = ({ src }: Type): JSX.Element  => {

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