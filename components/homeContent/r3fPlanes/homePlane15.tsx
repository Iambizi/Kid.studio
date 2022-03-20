import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { isMobile } from 'react-device-detect';


interface Type {
    projects: any;
}

export const  HomePlane1 = ( { projects, ...props}: Type): JSX.Element => {

    const src1 = projects[0]?.fields.featuredProjectImage.fields ? projects[0].fields.featuredProjectImage.fields.file.url : null;
    
    let hovering = false;
    let snapping = false;
    let mouseDown = false;
    let prevMouse = { x: 0, y: 0 };
    let snapback = { x: 0, y: 0 };
    let hover_dist = 0.3;
    let i = 0;
    let timerx = 500;
    let mouse = { x: 0, y: 0 };

    const homePlaneRef1 = useRef<THREE.Mesh>();

    const textures = useTexture(src1);

    textures.minFilter = THREE.LinearFilter;

    const width = isMobile ? 3.26 : 9;
    const height = isMobile ? 1.76 : 5;
    
    const animateMesh = (state) => {

        const hoverMove = () => {
            mouse.x > 0.5 ? homePlaneRef1.current.rotation.y < hover_dist && (homePlaneRef1.current.rotation.y += 0.002) : mouse.x < 0.5 && homePlaneRef1.current.rotation.y > -hover_dist && (homePlaneRef1.current.rotation.y -= 0.002),
                mouse.y > 0.5 ? homePlaneRef1.current.rotation.x < hover_dist && (homePlaneRef1.current.rotation.x += 0.002) : mouse.y < 0.5 && homePlaneRef1.current.rotation.x > -hover_dist && (homePlaneRef1.current.rotation.x -= 0.002);
            (homePlaneRef1.current.rotation.y > hover_dist || homePlaneRef1.current.rotation.y < -hover_dist) && (homePlaneRef1.current.rotation.x > hover_dist || homePlaneRef1.current.rotation.x < -hover_dist) && (hovering = true);
        }

        const snapBack = () => {
            homePlaneRef1.current.rotation.x < 0.002 && homePlaneRef1.current.rotation.x > -0.002 && homePlaneRef1.current.rotation.y < 0.002 && homePlaneRef1.current.rotation.y > -0.002 && (snapping = false);
            homePlaneRef1.current.rotation.x -= snapback.x; 
            homePlaneRef1.current.rotation.y -= snapback.y;
        }
        const hover = () => {
            i === timerx && (i = 0);
            timerx / 2 > i ? ((homePlaneRef1.current.rotation.x += 3e-4), (homePlaneRef1.current.rotation.y -= 3e-4)) : ((homePlaneRef1.current.rotation.x -= 3e-4), (homePlaneRef1.current.rotation.y += 3e-4));
            i++;
        }
        
        snapping ? snapBack() : hovering ? hover() : hoverMove();
    }

    useFrame((state) => {
        animateMesh(state);
    });


    useEffect(() => {

        const onMouseDown = (e) => {
            mouseDown = true; 
            prevMouse.x = mouse.x; 
            prevMouse.y = mouse.y;
        }

        const onMouseUp = (e) => {
            mouseDown = false; 
            snapping = true; 
            snapback.x = homePlaneRef1.current.rotation.x / 60; 
            snapback.y = homePlaneRef1.current.rotation.y / 60;
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
        <>
            <mesh {...props} ref={homePlaneRef1} position={[0, 0, .1]}>
                <planeBufferGeometry args={[width, height]} />
                <meshBasicMaterial map={textures} />
            </mesh>
        </>
    )
}

