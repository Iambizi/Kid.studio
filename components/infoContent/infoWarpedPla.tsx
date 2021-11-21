import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
// import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import styles from "../../styles/scss/homePage/_carousel.module.scss";

import Link from "next/link";

import { isMobile } from 'react-device-detect';
import { useTexture } from "@react-three/drei";
import { Plane } from "@react-three/drei";


interface Type{
    src: string;
}

export default function warpedImage({ src }:Type):JSX.Element{

    const Planee = (props: any) =>{
        
        const ref = useRef<HTMLElement | any>(null!);
        const current = ref?.current;
        // const texture = useLoader(TextureLoader, src1);

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

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
            
        useFrame((state, delta) => {
            if(ref && ref!== null && ref!== undefined && ref.current && ref.current!== null && ref.current!== undefined  ){
                
                const onMouseDown = (e) => {
                    (mouseDown = !0), (prevMouse.x = mouse.x), (prevMouse.y = mouse.y);
                    e.stopImmediatePropagation();
                }
                const onMouseUp = () => {
                    (mouseDown = !1), (snapping = !0), (snapback.x = ref?.current.rotation.x / 60), (snapback.y = ref?.current.rotation.y / 60);
                }
                const onDocumentMouseMove = (e)=> {
                    (hovering = !1), (mouse.x = e.clientX / window.innerWidth), (mouse.y = e.clientY / window.innerHeight);
                }
                const dragMove = () => {
                    (distMouse.x = prevMouse.x - mouse.x), (distMouse.y = prevMouse.y - mouse.y);
                    (ref.current.rotation.y -= 2 * distMouse.x), (ref.current.rotation.x -= 2 * distMouse.y);
                }
                const hoverMove = () => {
                        mouse.x > 0.5 ? ref.current.rotation.y < hover_dist && (ref.current.rotation.y += 0.002) : mouse.x < 0.5 && ref.current.rotation.y > -hover_dist && (ref.current.rotation.y -= 0.002),
                        mouse.y > 0.5 ? ref.current.rotation.x < hover_dist && (ref.current.rotation.x += 0.002) : mouse.y < 0.5 && ref.current.rotation.x > -hover_dist && (ref.current.rotation.x -= 0.002);
                    (ref.current.rotation.y > hover_dist || ref.current.rotation.y < -hover_dist) && (ref.current.rotation.x > hover_dist || ref.current.rotation.x < -hover_dist) && (hovering = !0);
                }
                const snapBack = () => {
                    ref.current.rotation.x < 0.002 && ref.current.rotation.x > -0.002 && ref.current.rotation.y < 0.002 && ref.current.rotation.y > -0.002 && (snapping = !1);
                    (ref.current.rotation.x -= snapback.x), (ref.current.rotation.y -= snapback.y);
                }
                const hover = () => {
                    i == timerx && (i = 0);
                    timerx / 2 > i ? ((ref.current.rotation.x += 3e-4), (ref.current.rotation.y -= 3e-4)) : ((ref.current.rotation.x -= 3e-4), (ref.current.rotation.y += 3e-4));
                    i++;
                }
                // hovering ? hover() : hoverMove();
                mouseDown ? dragMove() : snapping ? snapBack() : hovering ? hover() : hoverMove();
                document.addEventListener("mousemove", onDocumentMouseMove, !1)
                // document.addEventListener("mousedown", onMouseDown, !1)
                // document.addEventListener("mouseup", onMouseUp, !1)
            }
            

            // mouseDown ? dragMove() : snapping ? snapBack() : hovering ? hover() : hoverMove();
            // mouseDown && ((prevMouse.y = mouse.y), (prevMouse.x = mouse.x));
            })

            return(
                <mesh {...props} ref={ref}>
                    <planeGeometry args={[width, height]} />
                    <meshBasicMaterial  map={texture1} />
                </mesh>

            )
    }

    return(
        <>
            <div className={`${styles.homeScene} homeScene`}>
                <Canvas dpr={[1, 2]}>
                   { isMobile ? <Planee position={[0, .1, 0]} /> : <Planee position={[0, 0, 0]} /> }
                </Canvas>

            </div>
        </>
    )
}