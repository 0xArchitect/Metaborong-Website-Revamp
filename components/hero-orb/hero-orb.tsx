'use client'

// Skills ref (3d-web-experience): detect WebGL support before creating Canvas.
// Since this component is loaded with ssr:false, we can check synchronously
// at first render — no useEffect needed, no hydration flash.

import { Canvas } from '@react-three/fiber'
import { OrbScene } from './orb-scene'

function canUseWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl') || (c as any).getContext('experimental-webgl'))
  } catch {
    return false
  }
}

// Cached once on first call (module scope would be too early — DOM not ready)
let _webGLChecked = false
let _webGLOK      = false
function isWebGLSupported(): boolean {
  if (!_webGLChecked) { _webGLChecked = true; _webGLOK = canUseWebGL() }
  return _webGLOK
}

export function HeroOrb() {
  if (!isWebGLSupported()) return null   // graceful fallback — hero still renders without orb

  return (
    <div aria-hidden="true" style={{ width: '100%', height: '100%' }}>
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
