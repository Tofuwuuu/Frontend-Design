'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Stars() {
  const ref = useRef<THREE.Points>(null!)
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3)
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() - 0.5) * 2000
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    return new THREE.BufferGeometry().setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref} geometry={sphere} frustumCulled={false}>
        <pointsMaterial
          transparent
          color="#fff"
          size={0.5}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

function FloatingShapes() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const meshRef2 = useRef<THREE.Mesh>(null!)
  const meshRef3 = useRef<THREE.Mesh>(null!)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 2
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 3
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x -= delta * 0.3
      meshRef2.current.rotation.z += delta * 0.4
      meshRef2.current.position.y = Math.cos(state.clock.elapsedTime * 0.8) * 1.5
      meshRef2.current.position.x = Math.sin(state.clock.elapsedTime * 0.6) * 2
    }
    if (meshRef3.current) {
      meshRef3.current.rotation.y += delta * 0.6
      meshRef3.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 1.8
      meshRef3.current.position.z = Math.cos(state.clock.elapsedTime * 0.4) * 2
    }
  })

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, -10]}>
        <octahedronGeometry args={[3, 0]} />
        <meshStandardMaterial
          color="#667eea"
          wireframe
          emissive="#667eea"
          emissiveIntensity={0.5}
          opacity={0.6}
          transparent
        />
      </mesh>
      <mesh ref={meshRef2} position={[5, 2, -12]}>
        <icosahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          color="#764ba2"
          wireframe
          emissive="#764ba2"
          emissiveIntensity={0.4}
          opacity={0.5}
          transparent
        />
      </mesh>
      <mesh ref={meshRef3} position={[-4, -1, -8]}>
        <tetrahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
          opacity={0.4}
          transparent
        />
      </mesh>
    </group>
  )
}

function SceneContent() {
  return (
    <>
      <Stars />
      <FloatingShapes />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}

