'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrthographicCamera, Grid, Text } from '@react-three/drei'
import { useRef, useEffect, useState, Suspense } from 'react'
import { Group, MathUtils } from 'three'
import { type PillarId } from '@/components/sections/services-data'

const PILLAR_COLOR: Record<PillarId, string> = {
  'web3': '#204AF8',
  'ai-agents': '#10b981',
  'product-studio': '#F6851B',
}

const PILLAR_LABEL: Record<PillarId, string> = {
  'web3': 'WEB3',
  'ai-agents': 'AI',
  'product-studio': 'PRODUCT',
}

// Per-pillar label offset (relative to pillar center, world-space). Per the Figma
// canvas (Frame 1707481128): AI label sits upper-left of its plate, PRODUCT sits
// upper-right, WEB3 sits centered just above the cube top. All slant up-right.
const LABEL_OFFSET: Record<PillarId, { active: [number, number, number]; inactive: [number, number, number] }> = {
  'web3':            { active: [0,    1.95, 0  ], inactive: [-0.40, 0.30, 0   ] },
  'ai-agents':       { active: [-0.3, 1.95, 0  ], inactive: [-0.60, 0.30, 0   ] },
  'product-studio':  { active: [0,    1.95, -0.3], inactive: [ 0,   0.30, -0.6] },
}

const INACTIVE_COLOR = '#cbd5e1'
const PLATE_HEIGHT = 0.04 // thin grey slab shown for inactive

// Three slots arranged along the iso "horizontal" axis (world -X + +Z = pure screen
// left, world +X + -Z = pure screen right). Keeps all three pillars on the same
// screen Y row, matching the Figma layout.
const POSITIONS: Record<PillarId, [number, number, number]> = {
  'ai-agents':       [-1.8, 0,  1.8],
  'web3':            [ 0,   0,  0  ],
  'product-studio':  [ 1.8, 0, -1.8],
}

const CUBE_SIZE = 1.6 // edge length — also matches the major grid step

export function ServicesIsoCanvas({ activeId }: { activeId: PillarId }) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <div className="absolute inset-0" style={{ background: '#fafbff' }}>
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} shadows>
        <OrthographicCamera makeDefault position={[5, 5.5, 5]} zoom={64} near={0.1} far={50} />
        <IsoCameraTarget />

        {/* Lighting: bright top, soft cool fill — mimics the Figma cube highlight. */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[4, 10, 6]}
          intensity={1.0}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.1}
          shadow-camera-far={30}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <directionalLight position={[-5, 4, -3]} intensity={0.25} color="#dbe4ff" />

        <Floor />

        <Suspense fallback={null}>
          {(Object.keys(POSITIONS) as PillarId[]).map((id) => (
            <PillarCube
              key={id}
              id={id}
              position={POSITIONS[id]}
              isActive={id === activeId}
              reducedMotion={reducedMotion}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
}

function IsoCameraTarget() {
  useFrame(({ camera }) => {
    camera.lookAt(0, 1.0, 0)
  })
  return null
}

function Floor() {
  return (
    <group>
      {/* Shadow plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <shadowMaterial opacity={0.10} />
      </mesh>
      {/* Single-level iso diamond grid — uniform lines, no section hierarchy. */}
      <Grid
        args={[40, 40]}
        position={[0, 0, 0]}
        cellSize={1.6}
        cellThickness={0.8}
        cellColor="#b8c2cf"
        sectionSize={1.6}
        sectionThickness={0.8}
        sectionColor="#b8c2cf"
        fadeDistance={30}
        fadeStrength={1.0}
        infiniteGrid={false}
        followCamera={false}
      />
    </group>
  )
}

function PillarCube({
  id,
  position,
  isActive,
  reducedMotion,
}: {
  id: PillarId
  position: [number, number, number]
  isActive: boolean
  reducedMotion: boolean
}) {
  const extrudeRef = useRef<Group>(null)
  const targetScale = isActive ? 1 : PLATE_HEIGHT

  useFrame((_, delta) => {
    const eg = extrudeRef.current
    if (eg) {
      if (reducedMotion) {
        eg.scale.y = targetScale
      } else {
        eg.scale.y = MathUtils.damp(eg.scale.y, targetScale, 5, delta)
      }
    }
  })

  const color = isActive ? PILLAR_COLOR[id] : INACTIVE_COLOR
  const labelOffset = isActive ? LABEL_OFFSET[id].active : LABEL_OFFSET[id].inactive

  return (
    <group position={position}>
      {/* Cube — base pinned at y=0, scales upward. Inactive collapses to a thin slab. */}
      <group ref={extrudeRef} scale={[1, isActive ? 1 : PLATE_HEIGHT, 1]}>
        <mesh castShadow receiveShadow position={[0, CUBE_SIZE / 2, 0]}>
          <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
          <meshStandardMaterial color={color} metalness={0} roughness={0.55} />
        </mesh>
      </group>

      {/* Label — flat-painted on the iso top surface, slanting up-right (matches Figma). */}
      <Text
        position={labelOffset}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        fontSize={isActive ? 0.34 : 0.30}
        color="#040404"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
        characters="WEB3AIPRODUCT"
        renderOrder={10}
        material-toneMapped={false}
        material-depthTest={false}
        material-transparent={true}
      >
        {PILLAR_LABEL[id]}
      </Text>
    </group>
  )
}
