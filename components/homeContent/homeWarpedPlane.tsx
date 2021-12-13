import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { useRouter } from 'next/router';


interface Type{
    carouselX : number;
    slideNext: boolean;
    slidePrevious: boolean;
    count: number;
    projects: any;
    goNext: any;
    goPrevious: any;
}

export default function warpedImage({ slideNext, slidePrevious, carouselX, count, projects }:Type):JSX.Element{
    const src = projects[count]?.fields.featuredProjectImage.fields ? projects[count].fields.featuredProjectImage.fields.file.url : null;

    const homePlaneRef = useRef<HTMLElement | any>(null!);
    const homePlaneControls = useRef<HTMLElement | any>(null!);
    const router = useRouter();
    const homePath = /\/$/gm;

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
        const scale = 1;

        const scene = new THREE.Scene();
        // scene.background = new THREE.Color( 0xFFA500 );
        // this along with code on lines 42 & 43 sets scene color to transparent
        // scene.background = null;
        
        const loader = new THREE.TextureLoader();
        const texture = loader.load(`${src}`);
        
        //Handles moire effect on image texture
        texture.minFilter = THREE.LinearFilter
 
        // const width = screenWidth >= 1200 ? 5.5 : 2.1;
        // const height = screenWidth >= 1200 ? 3 : 1.2;
        const width = 5.4;
        const height = 2.9;
        const geometry = new THREE.PlaneGeometry(width * scale, height * scale);
        
        const material = new THREE.MeshBasicMaterial({ map: texture });
        // // const material = new THREE.MeshBasicMaterial( {color: 0xC0C0C0, side: THREE.DoubleSide} );
        const mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
         //camera
        // const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1e4);
        
        //Renderer
        const canvas = document.querySelector('.homeScene');

        // camera.position.z = 3;
        camera.position.z = screenWidth >= 1200 ? 3 : 8;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: !0
        })

        function resizeRender(){
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
        
        renderer.setSize(sizes.width, sizes.height);
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
                (mouseDown = !1), (snapping = !0), (snapback.x = mesh.rotation.x / 60), (snapback.y = mesh.rotation.y / 60);
            }
            const onDocumentMouseMove = (e)=> {
                (hovering = !1), (mouse.x = e.clientX / window.innerWidth), (mouse.y = e.clientY / window.innerHeight);
            }
            const dragMove = () => {
                (distMouse.x = prevMouse.x - mouse.x), (distMouse.y = prevMouse.y - mouse.y);
                (mesh.rotation.y -= 2 * distMouse.x), (mesh.rotation.x -= 2 * distMouse.y);
            }
            const hoverMove = () => {
                    mouse.x > 0.5 ? mesh.rotation.y < hover_dist && (mesh.rotation.y += 0.002) : mouse.x < 0.5 && mesh.rotation.y > -hover_dist && (mesh.rotation.y -= 0.002),
                    mouse.y > 0.5 ? mesh.rotation.x < hover_dist && (mesh.rotation.x += 0.002) : mouse.y < 0.5 && mesh.rotation.x > -hover_dist && (mesh.rotation.x -= 0.002);
                (mesh.rotation.y > hover_dist || mesh.rotation.y < -hover_dist) && (mesh.rotation.x > hover_dist || mesh.rotation.x < -hover_dist) && (hovering = !0);
            }
            const snapBack = () => {
                mesh.rotation.x < 0.002 && mesh.rotation.x > -0.002 && mesh.rotation.y < 0.002 && mesh.rotation.y > -0.002 && (snapping = !1);
                (mesh.rotation.x -= snapback.x), (mesh.rotation.y -= snapback.y);
            }
            const hover = () => {
                i == timerx && (i = 0);
                timerx / 2 > i ? ((mesh.rotation.x += 3e-4), (mesh.rotation.y -= 3e-4)) : ((mesh.rotation.x -= 3e-4), (mesh.rotation.y += 3e-4));
                i++;
            }
            window.requestAnimationFrame(animationLoop);

            mouseDown ? dragMove() : snapping ? snapBack() : hovering ? hover() : hoverMove()
            leftScroll && (transitionFrames >= transitionCounter ? ((camera.position.x += 62.5), transitionCounter++) : ((transitionCounter = 0), (leftScroll = !1)));
            dLeftScroll && (transitionFrames >= transitionCounter ? ((camera.position.x += 125), transitionCounter++) : ((transitionCounter = 0), (dLeftScroll = !1)));
            rightScroll && (transitionFrames >= transitionCounter ? ((camera.position.x -= 62.5), transitionCounter++) : ((transitionCounter = 0), (rightScroll = !1)));
            dRightScroll && (transitionFrames >= transitionCounter ? ((camera.position.x -= 125), transitionCounter++) : ((transitionCounter = 0), (dRightScroll = !1)));
            mouseDown && ((prevMouse.y = mouse.y), (prevMouse.x = mouse.x))

            
            /** End of Warped tilt hover functionality **/

            /** controls mouse and hover effects **/
                scene.add(mesh);
                // camera.position.z = 500;
                // mesh.position.x = 2e3;
                document.addEventListener("mousemove", onDocumentMouseMove, !1)
                document.addEventListener("mousedown", onMouseDown, !1)
                document.addEventListener("mouseup", onMouseUp, !1)
            /** End controls mouse and hover effects **/

            // Render
            renderer.render(scene, camera);
        }
        animationLoop()
    },[count])
    return(
        <>
            <canvas className={`${styles.homeScene} homeScene`}>
            </canvas>
        </>
    )
}