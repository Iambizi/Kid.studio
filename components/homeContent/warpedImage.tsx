import styles from "../../styles/scss/homePage/_home.module.scss";
import React, {useEffect} from 'react';
import * as THREE from 'three';

export default function warpedImage():JSX.Element{
    useEffect(()=>{

        //Creat your scene, (your movie set)
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color( 0x000000 );

        const geometry = new THREE.PlaneGeometry( 5, 20, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xfffffff, side: THREE.DoubleSide} );
        const Mesh = new THREE.Mesh( geometry, material );
        scene.add( Mesh );

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
         //camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);

        //Renderer
        const canvas = document.querySelector('.scene');

        // Control
        // const controls = new OrbitControls(camera, canvas)
        
        // // Damping: allows for smoother controls. Gives a sense of weight to the controls
        // controls.enableDamping = true;

        // //Controls speed at which damping will happen 
        // controls.autoRotateSpeed = 3;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            // antialias: true
            alpha: true
        })
        renderer.setClearColor( 0x000000, 0 );
        renderer.render(scene, camera);
    },[]);
    return(
        <>
            <canvas className={"scene"}>
            </canvas>
        </>
    )
}