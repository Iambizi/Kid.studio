import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import HomePlane1 from "./r3fPlanes/homePlane1";
import HomePlane2 from "./r3fPlanes/homePlane2";
import HomePlane3 from "./r3fPlanes/homePlane3";


interface Type {
    count: number;
    projects: any;
    carouselX: number;
    slideNext: boolean;
    slidePrevious: boolean;
    goNext: any;
    goPrevious: any;
}

export default function WarpedImage({ count, projects, carouselX, slideNext, slidePrevious, goNext, goPrevious }: Type): JSX.Element {

    const homePlaneControls = useRef<HTMLElement | any>(null!);

    const ScrollContainer = ({ children }) => {
        const items = useRef<THREE.Mesh>();
        const vec = new THREE.Vector3();
        useFrame((state, delta) => {
            state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, carouselX, 7, delta);
        })
        return (
            <group ref={items}>
                {children}
            </group>
        );
    }

    const next = () => {
        goNext();
    }
    const previous = () => {
        goPrevious();
    }
    homePlaneControls.current = { next, previous }

    return (
        <>
            <div className={`${styles.homeScene} homeScene`}>
                <p className={styles.nextButton} onClick={homePlaneControls.current.next}>NEXT</p>
                <p className={styles.previousButton} onClick={homePlaneControls.current.previous}>PREVIOUS</p>
                <Canvas id={"mesh"} camera={{ position: [0, 0, 5] }}>
                    <Suspense fallback={null}>
                        <ScrollContainer>
                            <HomePlane1 projects={projects} />
                            <HomePlane2 projects={projects} />
                            <HomePlane3 projects={projects} />
                        </ScrollContainer>
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}