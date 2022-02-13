import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { isMobile } from 'react-device-detect';
import { useRouter } from "next/router";



interface Type {
    projects: any;
    snapping: boolean;
}

export default function HomePlane1({ projects, snapping }: Type): JSX.Element {

    const src1 = projects[0]?.fields.featuredProjectImage.fields ? projects[0].fields.featuredProjectImage.fields.file.url : null;
    const src2 = projects[1]?.fields.featuredProjectImage.fields ? projects[1].fields.featuredProjectImage.fields.file.url : null;
    const src3 = projects[2]?.fields.featuredProjectImage.fields ? projects[2].fields.featuredProjectImage.fields.file.url : null;

    const router = useRouter();

    const HomePlane = (props: any) => {

        const homePlaneRef = useRef<THREE.Mesh>();

        let hover_dist = 0.3;
        let i = 0;
        let timerx = 500;
        let hovering = false;
        // let snapping = false;
        let mouse = { x: 0, y: 0 };

        let onDocumentMouseMove;
        let onMouseDown;
        let onMouseUp;

        const textures = useTexture([src1, src2, src3]);

        textures[0].minFilter = THREE.LinearFilter;
        textures[1].minFilter = THREE.LinearFilter;
        textures[2].minFilter = THREE.LinearFilter;

        const width = isMobile ? 3.1 : 9;
        const height = isMobile ? 1.7 : 5;

        useFrame((state) => {
            animateMesh(state);
        });

        const animateMesh = (state) => {

                const hoverMove = () => {
                    mouse.x > 0.5 ? homePlaneRef.current.rotation.y < hover_dist && (homePlaneRef.current.rotation.y += 0.002) : mouse.x < 0.5 && homePlaneRef.current.rotation.y > -hover_dist && (homePlaneRef.current.rotation.y -= 0.002),
                        mouse.y > 0.5 ? homePlaneRef.current.rotation.x < hover_dist && (homePlaneRef.current.rotation.x += 0.002) : mouse.y < 0.5 && homePlaneRef.current.rotation.x > -hover_dist && (homePlaneRef.current.rotation.x -= 0.002);
                    (homePlaneRef.current.rotation.y > hover_dist || homePlaneRef.current.rotation.y < -hover_dist) && (homePlaneRef.current.rotation.x > hover_dist || homePlaneRef.current.rotation.x < -hover_dist) && (hovering = true);
                }
                const snapBack = () => {
                    let speed = 0.005
                    if (homePlaneRef.current.rotation.x < 0) homePlaneRef.current.rotation.x += speed;
                    if (homePlaneRef.current.rotation.x > 0) homePlaneRef.current.rotation.x -= speed;
                    if (homePlaneRef.current.rotation.y < 0) homePlaneRef.current.rotation.y += speed;
                    if (homePlaneRef.current.rotation.y > 0) homePlaneRef.current.rotation.y -= speed;
                }
                const hover = () => {
                    i == timerx && (i = 0);
                    timerx / 2 > i ? ((homePlaneRef.current.rotation.x += 3e-4), (homePlaneRef.current.rotation.y -= 3e-4)) : ((homePlaneRef.current.rotation.x -= 3e-4), (homePlaneRef.current.rotation.y += 3e-4));
                    i++;
                }

                snapping ? snapBack() : hovering ? hover() : hoverMove();
        }

        useEffect(() => {

            const onMouseDown = (e) => {
                snapping = true;
                console.log("plane1 mouse click");
            }

            const onMouseUp = (e) => {
                setTimeout(() => snapping = false, 950);
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

        }, []);

        return (
            <>
                <mesh {...props} ref={homePlaneRef}>
                    <planeGeometry args={[width, height]} />
                    <meshBasicMaterial map={textures[2]} />
                </mesh>
            </>
        )
    }

    return (
        <>
            <HomePlane position={[200, 0, 0]} />
        </>
    )
}

