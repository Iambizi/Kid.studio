import styles from '../../styles/scss/info/_info.module.scss';
import * as THREE from 'three';
import React, { useEffect } from "react";

export default function inforWarpImg():JSX.Element{
    const cors = "https://cors-anywhere.herokuapp.com";
    useEffect(()=>{

        const screenWidth = window.innerWidth;

        const scene = new THREE.Scene();
        // scene.background = new THREE.Color( 0xFFA500 );
        // this along with code on lines 42 & 43 sets scene color to transparent
        scene.background = null;
        
        const loader = new THREE.TextureLoader();
        // loader.setCrossOrigin("anonymous");
        const texture = loader.load(`https://kidstudio.co/content/3-info/1.png`);

        console.log(texture);
 
        const width = screenWidth >= 1200 ? 5.5 : 1.6;
        const height = screenWidth >= 1200 ? 3 : 1;
        // const geometry = new THREE.PlaneGeometry(5.5,3);
        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.MeshBasicMaterial( {color: 0xffa805, side: THREE.DoubleSide} );
        // const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
         //camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        
        //Renderer
        const canvas = document.querySelector('.sceneInfo');

        camera.position.z = 3

        camera.lookAt(mesh.position);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        })

        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
              renderer.setSize(width, height, false);
            }
            return needResize;
        }

        renderer.setClearColor( 0x000000, 0 );
        
        renderer.setSize(sizes.width, sizes.height);
        //pixel ratio: corresponds to how many physical pixels you have on the screen for one pixel unit on the software part.
        // Device pixel ratio: allows us to adjust the pixel ratio of our scene to pixel ratio of our device
        renderer.setPixelRatio(Math.min(window.devicePixelRatio),2);

        // const render = () =>{
        //     renderer.render( scene, camera )
        // }
        renderer.render(scene, camera);

            // Clock
        let clock = new THREE.Clock()
    
        // Animations loop function
        const animationLoop = () =>
        {   
            /** Makes canvas responsive canvas **/

            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            
            /** End Makes canvas responsive canvas **/
            

            const elapsedTime = clock.getElapsedTime();

            camera.lookAt(mesh.position)

            let rotationX = mesh.rotation.x

            let rotationY = mesh.rotation.y

            // mesh.rotation.x = - elapsedTime / 10
            // mesh.rotation.y = - elapsedTime / 10

            let scaling = 1;
            let widthIncrease = 1;
            let heightIncrease = 1;
            let prevHeight = window.innerHeight;
            let prevWidth = window.innerWidth;
            let hover_dist = 0.3;
            let mouse, snapback, prevMouse, distMouse = { x: 0, y: 0 };
            let i = 0;
            // let prevMouse = { x: 0, y: 0 };
            // let distMouse = { x: 0, y: 0 };
            let timerx = 500;
            let transitionFrames = 31;
            let hovering, snapping, mouseDown = !1;

            if(rotationX <= -0.31){
                mesh.rotation.x = -0.31
                ;
                mesh.rotation.y = -0.31
                ;
            }
            const dragMove = () => {
                (distMouse.x = prevMouse.x - mouse.x), (distMouse.y = prevMouse.y - mouse.y);
                (mesh.rotation.y -= 2 * distMouse.x), (mesh.rotation.x -= 2 * distMouse.y);
            }
            const hoverMove = () => {
                for (var a = 0; a < mesh.length; a++)
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
            mouseDown ? dragMove() : snapping ? snapBack() : hovering ? hover() : hoverMove()
            // Render
            renderer.render(scene, camera);
            window.requestAnimationFrame(animationLoop);
        }
        animationLoop()

    },[])

    
    return(
        <>
            <canvas className={`${styles.sceneInfo} sceneInfo`}>
            </canvas>
        </>
    )
}