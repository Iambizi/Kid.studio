import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
// import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';


interface Type{
    count: number;
    projects: any;
    carouselX : number;
    slideNext: boolean;
    slidePrevious: boolean;
    goNext: any;
    goPrevious: any;
}

export default function warpedImage({ count, projects, carouselX, slideNext, slidePrevious, goNext, goPrevious }:Type):JSX.Element{

    const src1 = projects[0]?.fields.featuredProjectImage.fields ? projects[0].fields.featuredProjectImage.fields.file.url : null;
    const src2 = projects[1]?.fields.featuredProjectImage.fields ? projects[1].fields.featuredProjectImage.fields.file.url : null;
    const src3 = projects[2]?.fields.featuredProjectImage.fields ? projects[2].fields.featuredProjectImage.fields.file.url : null;

    const homePlaneControls = useRef<HTMLElement | any>(null!);
    const router = useRouter();
    const homePath = /\/$/gm;

    const [snapDone , setSnapDone] = useState(false);

    const HomePlane = (props: any) =>{
        
        const homePlaneRef = useRef<THREE.Mesh>();

        let hover_dist = 0.3;
        let mouse = { x: 0, y: 0 };
        let snapback = { x: 0, y: 0 };
        let prevMouse = { x: 0, y: 0 };
        let distMouse = { x: 0, y: 0 };
        let i = 0;
        let timerx = 500;
        let hovering = !1;
        let snapping = !1;
        let mouseDown = !1;

        const loader = new THREE.TextureLoader();

        const texture1 = loader.load(`${src1}`);
        const texture2 = loader.load(`${src2}`);
        const texture3 = loader.load(`${src3}`);

        texture1.minFilter = THREE.LinearFilter;
        texture2.minFilter = THREE.LinearFilter;
        texture3.minFilter = THREE.LinearFilter;

        const width = isMobile ? 3.1 : 9;
        const height = isMobile ? 1.7 : 5;

        useFrame((state) => {
                init()
            });

            const init = () => {
                if(homePlaneRef && homePlaneRef.current !== undefined){
                    const onMouseDown = (e) => {
                        // homePlaneRef.current = e;
                        // (mouseDown = !0), (prevMouse.x = mouse.x), (prevMouse.y = mouse.y);
                        snapping = true;
                        // e.stopImmediatePropagation();
                        
                    }
                    const onMouseUp = (e) => {
                        // homePlaneRef.current = e;
                        // (mouseDown = !1), (snapping = !0), (snapback.x = homePlaneRef.current.rotation.x / 60), (snapback.y = homePlaneRef.current.rotation.y / 60);
                        setTimeout(() => snapping = false, 950);
                    }
                    const onDocumentMouseMove = (e)=> {
                        hovering = !1;
                        mouse.x = e.clientX / window.innerWidth; 
                        mouse.y = e.clientY / window.innerHeight;
                    }
                    const dragMove = () => {
                        (distMouse.x = prevMouse.x - mouse.x), (distMouse.y = prevMouse.y - mouse.y);
                        (homePlaneRef.current.rotation.y -= 2 * distMouse.x), (homePlaneRef.current.rotation.x -= 2 * distMouse.y);
                    }
                    const hoverMove = () => {
                            mouse.x > 0.5 ? homePlaneRef.current.rotation.y < hover_dist && (homePlaneRef.current.rotation.y += 0.002) : mouse.x < 0.5 && homePlaneRef.current.rotation.y > -hover_dist && (homePlaneRef.current.rotation.y -= 0.002),
                            mouse.y > 0.5 ? homePlaneRef.current.rotation.x < hover_dist && (homePlaneRef.current.rotation.x += 0.002) : mouse.y < 0.5 && homePlaneRef.current.rotation.x > -hover_dist && (homePlaneRef.current.rotation.x -= 0.002);
                        (homePlaneRef.current.rotation.y > hover_dist || homePlaneRef.current.rotation.y < -hover_dist) && (homePlaneRef.current.rotation.x > hover_dist || homePlaneRef.current.rotation.x < -hover_dist) && (hovering = !0);
                    }
                    const snapBack = () => {
                        // homePlaneRef.current.rotation.x < 0.002 && homePlaneRef.current.rotation.x > -0.002 && homePlaneRef.current.rotation.y < 0.002 && homePlaneRef.current.rotation.y > -0.002 && (snapping = !1);
                        // (homePlaneRef.current.rotation.x -= snapback.x), (homePlaneRef.current.rotation.y -= snapback.y);

                        let speed = 0.005
                        if (homePlaneRef.current.rotation.x < 0) homePlaneRef.current.rotation.x += speed
                        if (homePlaneRef.current.rotation.x > 0) homePlaneRef.current.rotation.x -= speed
                        if (homePlaneRef.current.rotation.y < 0) homePlaneRef.current.rotation.y += speed
                        if (homePlaneRef.current.rotation.y > 0) homePlaneRef.current.rotation.y -= speed
                    }
                    const hover = () => {
                        i == timerx && (i = 0);
                        timerx / 2 > i ? ((homePlaneRef.current.rotation.x += 3e-4), (homePlaneRef.current.rotation.y -= 3e-4)) : ((homePlaneRef.current.rotation.x -= 3e-4), (homePlaneRef.current.rotation.y += 3e-4));
                        i++;
                    }
    
                    snapping ? snapBack() : hovering ? hover() : hoverMove();
                    document.addEventListener("mousemove", onDocumentMouseMove, !1);
                    document.addEventListener("mousedown", onMouseDown, !1);
                    document.addEventListener("mouseup", onMouseUp, !1);
    
                }
            }

            return(
                <>
                    <mesh {...props} ref={homePlaneRef}>
                        <planeGeometry args={[width, height]} />
                        <meshBasicMaterial map={texture1} />
                    </mesh>
                </>
            )
    }

    const next = () =>{
        goNext();
    }
    const previous = ()=>{
        goPrevious();
    }
    homePlaneControls.current = { next, previous }

    return(
        <>
            <div className={`${styles.homeScene} homeScene`}>
                <p className={styles.nextButton} onClick={homePlaneControls.current.next}>NEXT</p>
                <p className={styles.previousButton} onClick={homePlaneControls.current.previous}>PREVIOUS</p>
                <Canvas id={"mesh"} camera={{ position: [0, 0, 5]}}>
                    <HomePlane position={[0, 0, 0]} /> 
                    <HomePlane position={[100, 0, 0]} />
                    <HomePlane position={[200, 0, 0]} /> 
                </Canvas>
            </div>
        </>
    )
}