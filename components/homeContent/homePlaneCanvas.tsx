import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { HomePlane1 } from "./r3fPlanes/homePlane15";
import { HomePlane2 } from "./r3fPlanes/homePlane16";
import { HomePlane3 } from "./r3fPlanes/homePlane17";
import Loader from "../common/loaderR3F";
import { isMobile } from 'react-device-detect';



interface Type {
    projects?: any;
    carouselX: number;
}


const SliderContainer = ({ children, carouselX }) => {

    const items = useRef<THREE.Mesh>();

    useFrame((state, delta) => {
        state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, carouselX, 7, delta);
    });

    return (
        <group ref={items}>
            {children}
        </group>
    );
}

export const WarpedImage = ({ projects, carouselX }: Type): JSX.Element => {

    const container = useRef<THREE.Mesh>();

    let hovering = false;
    let snapping = false;
    let hover_dist = 0.3;
    let i = 0;
    let timerx = 500;
    let mouse = { x: 0, y: 0 };

    return (
        <>
            <div className={`${styles.homeScene}`} ref={container}>
                <Canvas dpr={isMobile ? [1, 2] : [0, 1]}>
                    <Suspense fallback={<Loader />}>
                        <SliderContainer carouselX={carouselX}>
                            <HomePlane1 projects={projects} snapping={snapping} hover_dist={hover_dist} i={i} timerx={timerx} hovering={hovering} mouse={mouse} />
                            <HomePlane2 projects={projects} snapping={snapping} hover_dist={hover_dist} i={i} timerx={timerx} hovering={hovering} mouse={mouse} />
                            <HomePlane3 projects={projects} snapping={snapping} hover_dist={hover_dist} i={i} timerx={timerx} hovering={hovering} mouse={mouse} />
                        </SliderContainer>
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}