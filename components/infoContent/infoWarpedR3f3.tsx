import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { isMobile } from 'react-device-detect';
import { useTexture } from "@react-three/drei";


interface Type {
    src: string;
}

export const InfoPlane = ({ src }: Type): JSX.Element => {

    const infoPlaneRef = useRef<THREE.Mesh>();

    let hovering = false;
    let snapping = false;
    let mouseDown = false;
    let prevMouse = { x: 0, y: 0 };
    let snapback = { x: 0, y: 0 };
    let hover_dist = 0.3;
    let i = 0;
    let timerx = 500;
    let mouse = { x: 0, y: 0 };

    const texture = useTexture(`${src}`);

    const width = isMobile ? 3.26 : 9;
    const height = isMobile ? 1.76 : 5;

    const animateMesh = (state) => {

        const hoverMove = () => {
            mouse.x > 0.5 ? infoPlaneRef.current.rotation.y < hover_dist && (infoPlaneRef.current.rotation.y += 0.002) : mouse.x < 0.5 && infoPlaneRef.current.rotation.y > -hover_dist && (infoPlaneRef.current.rotation.y -= 0.002),
                mouse.y > 0.5 ? infoPlaneRef.current.rotation.x < hover_dist && (infoPlaneRef.current.rotation.x += 0.002) : mouse.y < 0.5 && infoPlaneRef.current.rotation.x > -hover_dist && (infoPlaneRef.current.rotation.x -= 0.002);
            (infoPlaneRef.current.rotation.y > hover_dist || infoPlaneRef.current.rotation.y < -hover_dist) && (infoPlaneRef.current.rotation.x > hover_dist || infoPlaneRef.current.rotation.x < -hover_dist) && (hovering = true);
        }
        const snapBack = () => {
            infoPlaneRef.current.rotation.x < 0.002 && infoPlaneRef.current.rotation.x > -0.002 && infoPlaneRef.current.rotation.y < 0.002 && infoPlaneRef.current.rotation.y > -0.002 && (snapping = false);
            infoPlaneRef.current.rotation.x -= snapback.x;
            infoPlaneRef.current.rotation.y -= snapback.y;
        }
        const hover = () => {
            i == timerx && (i = 0);
            timerx / 2 > i ? ((infoPlaneRef.current.rotation.x += 3e-4), (infoPlaneRef.current.rotation.y -= 3e-4)) : ((infoPlaneRef.current.rotation.x -= 3e-4), (infoPlaneRef.current.rotation.y += 3e-4));
            i++;
        }
        snapping ? snapBack() : hovering ? hover() : hoverMove();
    }

    useFrame((state, delta) => {
        animateMesh(state);
    });

    useEffect(() => {

        const onMouseDown = (e) => {
            mouseDown = true;
            hovering = true;  
            prevMouse.x = mouse.x; 
            prevMouse.y = mouse.y;
        }

        const onMouseUp = (e) => {
            mouseDown = false; 
            snapping = true; 
            snapback.x = infoPlaneRef.current.rotation.x / 60; 
            snapback.y = infoPlaneRef.current.rotation.y / 60;
        }

        const onDocumentMouseMove = (e) => {
            hovering = false;
            mouse.x = e.clientX / window.innerWidth;
            mouse.y = e.clientY / window.innerHeight;
        }

        document.addEventListener("mousemove", onDocumentMouseMove, false);
        document.addEventListener("mousedown", onMouseDown, false);
        document.addEventListener("mouseup", onMouseUp, false);

        return () => {
            document.removeEventListener("mousemove", onDocumentMouseMove, false);
            document.removeEventListener("mousedown", onMouseDown, false);
            document.removeEventListener("mouseup", onMouseUp, false);
        };
    })

    return (
        <mesh ref={infoPlaneRef} position={isMobile ? [0, -.7, .1] : [0, 0, .1]}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    )
}