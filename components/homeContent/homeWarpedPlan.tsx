

import React, {useEffect} from 'react';
import * as THREE from 'three';
import styles from "../../styles/scss/homePage/_carousel.module.scss";

interface Type{
    count: number;
    projects: any;
    carouselX : number;
    slideNext: boolean;
    slidePrevious: boolean;
}

export default function warpedImage({ count, projects }:Type):JSX.Element{

    const src1 = projects[0]?.fields.featuredProjectImage.fields ? projects[0].fields.featuredProjectImage.fields.file.url : null;
    const src2 = projects[1]?.fields.featuredProjectImage.fields ? projects[1].fields.featuredProjectImage.fields.file.url : null;
    const src3 = projects[2]?.fields.featuredProjectImage.fields ? projects[2].fields.featuredProjectImage.fields.file.url : null;

    useEffect(()=>{
        const screenWidth = window.innerWidth;
        let scaling = 1;
        let widthIncrease = 1;
        let heightIncrease = 1;
        let prevHeight = window.innerHeight;
        let prevWidth = window.innerWidth;
        let hover_dist = 0.3;
        let mouse = { x: 0, y: 0 };
        let snapback = { x: 0, y: 0 };
        let prevMouse = { x: 0, y: 0 };
        let distMouse = { x: 0, y: 0 };
        let i = 0;
        let timerx = 500;
        let leftScroll = !1;
        let dLeftScroll = !1;
        let dRightScroll = !1;
        let rightScroll = !1;
        let transitionFrames = 31;
        let transitionCounter = 0;
        let hovering = !1;
        let snapping = !1;
        let mouseDown = !1;
        let scale = 1;
        let a = !1;


        const scene = new THREE.Scene();

        const group = new THREE.Group();
        
        const loader = new THREE.TextureLoader();

        const texture1 = loader.load(`${src1}`);
        const texture2 = loader.load(`${src2}`);
        const texture3 = loader.load(`${src3}`);

        texture1.minFilter = THREE.LinearFilter;
        texture2.minFilter = THREE.LinearFilter;
        texture3.minFilter = THREE.LinearFilter;
        
        const width = 5.4;
        const height = 2.9;
        // const geometry = new THREE.PlaneGeometry(width * scale, height * scale);
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        
        
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1e4);
        
        for (
               let looptyLoop = 0;
               looptyLoop < 3;
               looptyLoop++
        ){
        
            let cubes = [
                new THREE.Mesh(
                    new THREE.PlaneGeometry(width * scale, height * scale),
                    new THREE.MeshBasicMaterial({ map: texture1 })
                ),
                new THREE.Mesh(
                    new THREE.PlaneGeometry(width * scale, height * scale),
                    new THREE.MeshBasicMaterial({ map: texture2 })
                )
                ,
                new THREE.Mesh(
                    new THREE.PlaneGeometry(width * scale, height * scale),
                    new THREE.MeshBasicMaterial({ map: texture3 })
                ),
            ]
        group.add(cubes[looptyLoop]);
        const canvas = document.querySelector('.homeScene');

        camera.position.z = screenWidth >= 1200 ? 3 : 8;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: !0
        })

        const  resizeRender = () =>{
            window.addEventListener('resize', () =>
            {
                // Update sizes
                sizes.width = window.innerWidth
                sizes.height = window.innerHeight

                // Update camera
                camera.aspect = sizes.width / sizes.height
                camera.updateProjectionMatrix()

                // Update renderer
                renderer.setSize(sizes.width, sizes.height)
            })
        }

        renderer.setClearColor( 0x000000, 0 );
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        //pixel ratio: corresponds to how many physical pixels you have on the screen for one pixel unit on the software part.
        // Device pixel ratio: allows us to adjust the pixel ratio of our scene to pixel ratio of our device
        renderer.setPixelRatio(Math.min(window.devicePixelRatio),2);
    
        // Animations loop function
        const animationLoop = () =>
        {   
            // Handles geometry resize
            resizeRender();
            /** End Makes canvas responsive canvas **/
            
            /** Warped tilt hover functionality **/

            const onMouseDown = (e) => {
                (mouseDown = !0), (prevMouse.x = mouse.x), (prevMouse.y = mouse.y);
                e.stopImmediatePropagation();
            }
            const onMouseUp = () => {
                (mouseDown = !1), (snapping = !0), (snapback.x = cubes[0].rotation.x / 60), (snapback.y = cubes[0].rotation.y / 60);

            }
            const onDocumentMouseMove = (a)=> {
                (hovering = !1), (mouse.x = a.clientX / window.innerWidth), (mouse.y = a.clientY / window.innerHeight);
            }
            const dragMove = () => {
                (distMouse.x = prevMouse.x - mouse.x), (distMouse.y = prevMouse.y - mouse.y);
            for (var a = 0; a < cubes.length; a++) (cubes[a].rotation.y -= 2 * distMouse.x), (cubes[a].rotation.x -= 2 * distMouse.y);
            }
            const hoverMove = () => {
                for (var a = 0; a < cubes.length; a++)
                mouse.x > 0.5 ? cubes[a].rotation.y < hover_dist && (cubes[a].rotation.y += 0.002) : mouse.x < 0.5 && cubes[a].rotation.y > -hover_dist && (cubes[a].rotation.y -= 0.002),
                    mouse.y > 0.5 ? cubes[a].rotation.x < hover_dist && (cubes[a].rotation.x += 0.002) : mouse.y < 0.5 && cubes[a].rotation.x > -hover_dist && (cubes[a].rotation.x -= 0.002);
            (cubes[0].rotation.y > hover_dist || cubes[0].rotation.y < -hover_dist) && (cubes[0].rotation.x > hover_dist || cubes[0].rotation.x < -hover_dist) && (hovering = !0);
            }
            const snapBack = () => {
                cubes[0].rotation.x < 0.002 && cubes[0].rotation.x > -0.002 && cubes[0].rotation.y < 0.002 && cubes[0].rotation.y > -0.002 && (snapping = !1);
                for (var a = 0; a < cubes.length; a++) (cubes[a].rotation.x -= snapback.x), (cubes[a].rotation.y -= snapback.y);
            }
            const hover = () => {
                i == timerx && (i = 0);
            for (var a = 0; a < cubes.length; a++) timerx / 2 > i ? ((cubes[a].rotation.x += 3e-4), (cubes[a].rotation.y -= 3e-4)) : ((cubes[a].rotation.x -= 3e-4), (cubes[a].rotation.y += 3e-4));
            i++;
            }
            window.requestAnimationFrame(animationLoop);

            mouseDown ? dragMove() : snapping ? snapBack() : hovering ? hover() : hoverMove()
            leftScroll && (transitionFrames >= transitionCounter ? ((camera.position.x += 62.5), transitionCounter++) : ((transitionCounter = 0), (leftScroll = !1)));
            dLeftScroll && (transitionFrames >= transitionCounter ? ((camera.position.x += 125), transitionCounter++) : ((transitionCounter = 0), (dLeftScroll = !1)));
            rightScroll && (transitionFrames >= transitionCounter ? ((camera.position.x -= 62.5), transitionCounter++) : ((transitionCounter = 0), (rightScroll = !1)));
            dRightScroll && (transitionFrames >= transitionCounter ? ((camera.position.x -= 125), transitionCounter++) : ((transitionCounter = 0), (dRightScroll = !1)));
            mouseDown && ((prevMouse.y = mouse.y), (prevMouse.x = mouse.x))

            
            /** End Warped tilt hover functionality **/

            /** controls mouse and hover effects **/
                scene.add(group);
                (cubes[1].position.x = 2);
                (cubes[2].position.x = 3);
                document.addEventListener("mousemove", onDocumentMouseMove, !1)
                document.addEventListener("mousedown", onMouseDown, !1)
                document.addEventListener("mouseup", onMouseUp, !1)
            /** End controls mouse and hover effects **/

            // Render
            renderer.render(scene, camera);
        }
        animationLoop()
        }
        
    },[count])
    return(
        <>
            <canvas className={`${styles.homeScene} homeScene`}>
            </canvas>
        </>
    )
}