import * as THREE from "three"
import React, { useEffect, useRef, useMemo, useState } from "react"
import { extend, useFrame, useThree, createPortal } from "@react-three/fiber"
import { EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass } from "three-stdlib"


extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass })

export default function Effects({ children }) {
  const [scene] = useState(() => new THREE.Scene())
  const composer = useRef()
  const effect = useRef()
  const water = useRef()
  const bloom = useRef()
  const { gl, size, camera } = useThree()
  useFrame(() => {
  }, 1)
  return createPortal(
    <>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" scene={scene} camera={camera} />
      </effectComposer>
      {children}
    </>,
    scene
  )
}
