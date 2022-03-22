import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { HomePlane1 } from "./r3fPlanes/homePlane15";
import { HomePlane2 } from "./r3fPlanes/homePlane16";
import { HomePlane3 } from "./r3fPlanes/homePlane17";
import { HomePlanez } from "./r3fPlanes/homePlanez"
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

    return (
        <>
            <div className={`${styles.homeScene}`}>
                <Canvas dpr={isMobile ? [1, 2] : [0, 1]}>
                    <Suspense fallback={<Loader />}>
                        <SliderContainer carouselX={carouselX}>
                            {/* <HomePlane1  projects={projects} />
                            <HomePlane2  projects={projects} />
                            <HomePlane3  projects={projects} /> */}
                            <HomePlanez projects={projects} position={0} projectIndex={0} />
                            <HomePlanez projects={projects} position={100} projectIndex={1} />
                            <HomePlanez projects={projects} position={200} projectIndex={2} />
                        </SliderContainer>
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}