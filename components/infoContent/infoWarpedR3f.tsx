import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
// import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { isMobile } from 'react-device-detect';


interface Type{
    src: string;
}

export default function warpedImage({ src }:Type):JSX.Element{

    const InfoPlane = (props: any) =>{
        
        const infoPlaneRef = useRef<HTMLElement | any>(null!);

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
        
        const texture1 = loader.load(`${src}`);

        const width = isMobile ? 3.1 : 9;
        const height = isMobile ? 1.7 : 5;
            
        useFrame((state, delta) => {
            init();
        });

            const init = ()=>{
                if(infoPlaneRef && infoPlaneRef.current !== undefined  ){
                    
                    const onMouseDown = (e) => {
                        (mouseDown = !0), (prevMouse.x = mouse.x), (prevMouse.y = mouse.y);
                        e.stopImmediatePropagation();
                    }
                    const onMouseUp = () => {
                        (mouseDown = !1), (snapping = !0), (snapback.x = infoPlaneRef.current.rotation.x / 60), (snapback.y = infoPlaneRef.current.rotation.y / 60);
                    }
                    const onDocumentMouseMove = (e)=> {
                        (hovering = !1), (mouse.x = e.clientX / window.innerWidth), (mouse.y = e.clientY / window.innerHeight);
                    }
                    const dragMove = () => {
                        (distMouse.x = prevMouse.x - mouse.x), (distMouse.y = prevMouse.y - mouse.y);
                        (infoPlaneRef.current.rotation.y -= 2 * distMouse.x), (infoPlaneRef.current.rotation.x -= 2 * distMouse.y);
                    }
                    const hoverMove = () => {
                            mouse.x > 0.5 ? infoPlaneRef.current.rotation.y < hover_dist && (infoPlaneRef.current.rotation.y += 0.002) : mouse.x < 0.5 && infoPlaneRef.current.rotation.y > -hover_dist && (infoPlaneRef.current.rotation.y -= 0.002),
                            mouse.y > 0.5 ? infoPlaneRef.current.rotation.x < hover_dist && (infoPlaneRef.current.rotation.x += 0.002) : mouse.y < 0.5 && infoPlaneRef.current.rotation.x > -hover_dist && (infoPlaneRef.current.rotation.x -= 0.002);
                        (infoPlaneRef.current.rotation.y > hover_dist || infoPlaneRef.current.rotation.y < -hover_dist) && (infoPlaneRef.current.rotation.x > hover_dist || infoPlaneRef.current.rotation.x < -hover_dist) && (hovering = !0);
                    }
                    const snapBack = () => {
                        infoPlaneRef.current.rotation.x < 0.002 && infoPlaneRef.current.rotation.x > -0.002 && infoPlaneRef.current.rotation.y < 0.002 && infoPlaneRef.current.rotation.y > -0.002 && (snapping = !1);
                        (infoPlaneRef.current.rotation.x -= snapback.x), (infoPlaneRef.current.rotation.y -= snapback.y);
                    }
                    const hover = () => {
                        i == timerx && (i = 0);
                        timerx / 2 > i ? ((infoPlaneRef.current.rotation.x += 3e-4), (infoPlaneRef.current.rotation.y -= 3e-4)) : ((infoPlaneRef.current.rotation.x -= 3e-4), (infoPlaneRef.current.rotation.y += 3e-4));
                        i++;
                    }
                    snapping ? snapBack() : hovering ? hover() : hoverMove();                
                    document.addEventListener("mousemove", onDocumentMouseMove, !1);
                    // document.addEventListener("mousedown", onMouseDown, !1);
                    // document.addEventListener("mouseup", onMouseUp, !1);
                }
            }

            return(
                <mesh {...props} ref={infoPlaneRef}>
                    <planeGeometry args={[width, height]} />
                    <meshBasicMaterial  map={texture1} />
                </mesh>
            )
    }

    return(
        <>
            <div className={`${styles.homeScene} homeScene`}>
                <Canvas dpr={[1, 2]}>
                   { isMobile ? <InfoPlane position={[0, -.7, 0]} /> : <InfoPlane position={[0, 0, 0]} /> }
                </Canvas>
            </div>
        </>
    )
}