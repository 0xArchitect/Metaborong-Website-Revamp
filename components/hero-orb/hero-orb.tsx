'use client'

import { Canvas } from '@react-three/fiber'
import { OrbScene } from './orb-scene'

export function HeroOrb() {
  return (
    <div
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 48 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <OrbScene />
      </Canvas>
    </div>
  )
}
