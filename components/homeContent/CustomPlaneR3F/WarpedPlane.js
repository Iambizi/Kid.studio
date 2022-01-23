import * as THREE from "three";
import React, { forwardRef, useRef } from "react";
import { isMobile } from 'react-device-detect';
import "./CustomMaterial";

export default forwardRef(({ shift = 100, args, map, ...props }, ref) => {
  const material = useRef();
  const width = isMobile ? 3.1 : 9;
  const height = isMobile ? 1.7 : 5;

  return (
    <mesh ref={ref} {...props}>
      <planeGeometry args={[width, height]} />
      <customMaterial ref={material} map={map} map-minFilter={THREE.LinearFilter} />
    </mesh>
  )
});
