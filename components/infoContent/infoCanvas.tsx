import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Loader from "../common/loaderR3F";
import {InfoPlane} from "./infoWarpedR3f3";

interface Type {
    src: string;
}

export const InfoPlaneCanvas = ({ src }: Type): JSX.Element  => {

    return (
        <>
            <div className={`${styles.homeScene}`}>
                <Canvas dpr={[1, 2]}>
                    <Suspense fallback={<Loader/>}>
                        <InfoPlane src={src} />
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}