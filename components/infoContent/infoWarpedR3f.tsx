import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
// import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { isMobile } from 'react-device-detect';


interface Type{
    src: string;
}

export default function WarpedImage({ src }:Type):JSX.Element{

    const InfoPlane = (props: any) =>{
        
        const infoPlaneRef = useRef<THREE.Mesh>();

        let hover_dist = 0.3;
        let prevMouse = { x: 0, y: 0 };
        let distMouse = { x: 0, y: 0 };
        let i = 0;
        let timerx = 500;
        let hovering = false;
        let snapping = false;

        const loader = new THREE.TextureLoader();
        
        const texture1 = loader.load(`${src}`);

        const width = isMobile ? 3.1 : 9;
        const height = isMobile ? 1.7 : 5;
            
        useFrame((state, delta) => {
            animateMesh(state);
        });

        const animateMesh = (state)=> {

            if( infoPlaneRef && infoPlaneRef.current !== undefined  ){
                    
                const onMouseDown = (e) => {
                    snapping = true;
                }
                const onMouseUp = () => {
                    setTimeout(() => snapping = false, 950);
                }
                const onDocumentMouseMove = (e)=> {
                    (hovering = false), (state.mouse.x = e.clientX / window.innerWidth), (state.mouse.y = e.clientY / window.innerHeight);
                }
                const dragMove = () => {
                    (distMouse.x = prevMouse.x - state.mouse.x), (distMouse.y = prevMouse.y - state.mouse.y);
                    (infoPlaneRef.current.rotation.y -= 2 * distMouse.x), (infoPlaneRef.current.rotation.x -= 2 * distMouse.y);
                }
                const hoverMove = () => {
                        state.mouse.x > 0.5 ? infoPlaneRef.current.rotation.y < hover_dist && (infoPlaneRef.current.rotation.y += 0.002) : state.mouse.x < 0.5 && infoPlaneRef.current.rotation.y > -hover_dist && (infoPlaneRef.current.rotation.y -= 0.002),
                        state.mouse.y > 0.5 ? infoPlaneRef.current.rotation.x < hover_dist && (infoPlaneRef.current.rotation.x += 0.002) : state.mouse.y < 0.5 && infoPlaneRef.current.rotation.x > -hover_dist && (infoPlaneRef.current.rotation.x -= 0.002);
                    (infoPlaneRef.current.rotation.y > hover_dist || infoPlaneRef.current.rotation.y < -hover_dist) && (infoPlaneRef.current.rotation.x > hover_dist || infoPlaneRef.current.rotation.x < -hover_dist) && (hovering = true);
                }
                const snapBack = () => {
                    let speed = 0.005;
                    if (infoPlaneRef.current.rotation.x < 0) infoPlaneRef.current.rotation.x += speed;
                    if (infoPlaneRef.current.rotation.x > 0) infoPlaneRef.current.rotation.x -= speed;
                    if (infoPlaneRef.current.rotation.y < 0) infoPlaneRef.current.rotation.y += speed;
                    if (infoPlaneRef.current.rotation.y > 0) infoPlaneRef.current.rotation.y -= speed;
                }
                const hover = () => {
                    i == timerx && (i = 0);
                    timerx / 2 > i ? ((infoPlaneRef.current.rotation.x += 3e-4), (infoPlaneRef.current.rotation.y -= 3e-4)) : ((infoPlaneRef.current.rotation.x -= 3e-4), (infoPlaneRef.current.rotation.y += 3e-4));
                    i++;
                }
                snapping ? snapBack() : hovering ? hover() : hoverMove();                
                document.addEventListener("mousemove", onDocumentMouseMove, false);
                document.addEventListener("mousedown", onMouseDown, false);
                document.addEventListener("mouseup", onMouseUp, false);
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
                   {/* <InfoPlane position={[0, 0, 0]} /> */}
                </Canvas>
            </div>
        </>
    )
}