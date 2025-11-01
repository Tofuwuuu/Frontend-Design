'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Create procedural noise texture for planet surface
function createNoiseTexture() {
  if (typeof document === 'undefined') return null
  
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  
  const imageData = ctx.createImageData(size, size)
  const data = imageData.data
  
  for (let i = 0; i < data.length; i += 4) {
    const value = Math.random() * 255
    data[i] = value     // R
    data[i + 1] = value // G
    data[i + 2] = value // B
    data[i + 3] = 255   // A
  }
  
  ctx.putImageData(imageData, 0, 0)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 2)
  return texture
}

function Planet() {
  const planetRef = useRef<THREE.Mesh>(null!)
  const cloudsRef = useRef<THREE.Mesh>(null!)
  
  const noiseTexture = useMemo(() => createNoiseTexture(), [])
  
  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.15
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.18
    }
  })

  return (
    <group>
      {/* Main planet body */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.7}
          metalness={0.3}
          emissive="#4c1d95"
          emissiveIntensity={0.2}
          map={noiseTexture}
        />
      </mesh>
      
      {/* Atmospheric glow */}
      <mesh>
        <sphereGeometry args={[2.15, 64, 64]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Clouds layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.05, 128, 128]} />
        <meshStandardMaterial
          color="#c4b5fd"
          transparent
          opacity={0.3}
          emissive="#a78bfa"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  )
}

function PlanetRing() {
  const ring1Ref = useRef<THREE.Mesh>(null!)
  const ring2Ref = useRef<THREE.Mesh>(null!)
  const ring3Ref = useRef<THREE.Mesh>(null!)
  
  useFrame((state, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.08
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += delta * 0.12
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.06
    }
  })

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {/* Inner ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.6, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Middle ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.2, 0.06, 16, 100]} />
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#8b5cf6"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Outer ring */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.8, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#ddd6fe"
          emissive="#a78bfa"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  )
}

function StarField() {
  const pointsRef = useRef<THREE.Points>(null!)
  
  const stars = useMemo(() => {
    const positions = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      const radius = 5 + Math.random() * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return new THREE.BufferGeometry().setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )
  }, [])

  return (
    <points ref={pointsRef} geometry={stars}>
      <pointsMaterial color="#fff" size={0.05} sizeAttenuation={true} />
    </points>
  )
}

function PlanetScene() {
  const lightRef = useRef<THREE.DirectionalLight>(null!)
  
  useFrame((state) => {
    // Rotate directional light around planet for dynamic day/night effect
    if (lightRef.current) {
      const angle = state.clock.elapsedTime * 0.3
      lightRef.current.position.x = Math.cos(angle) * 8
      lightRef.current.position.z = Math.sin(angle) * 8
      lightRef.current.position.y = 4
    }
  })
  
  return (
    <>
      <fog attach="fog" args={['#0a0a1a', 5, 15]} />
      
      {/* Main lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-5, 2, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, -5, 0]} intensity={0.3} color="#a78bfa" />
      
      {/* Add subtle rim light */}
      <pointLight position={[0, 0, 8]} intensity={0.4} color="#c4b5fd" />
      
      <StarField />
      <Planet />
      <PlanetRing />
    </>
  )
}

const Planet3D = dynamic(
  () =>
    Promise.resolve(function Planet3DComponent() {
      return (
        <div className="w-full h-full bg-gradient-to-b from-purple-950/20 via-transparent to-purple-950/20">
          <Canvas
            camera={{ position: [0, 0, 7], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <PlanetScene />
          </Canvas>
        </div>
      )
    }),
  { ssr: false }
)

export default function PlanetSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  return (
    <section
      id="planet"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="gradient-text">Explore</span>{' '}
            <span className="text-white">New Worlds</span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Journey through stunning 3D environments crafted with cutting-edge
            web technologies. Experience immersive visuals that push the
            boundaries of web design.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full rounded-3xl overflow-hidden glass"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Planet3D />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            {
              title: 'Interactive 3D',
              description: 'Engage with fully interactive 3D elements',
              icon: '🌍',
            },
            {
              title: 'Smooth Performance',
              description: 'Optimized for 60fps rendering',
              icon: '⚡',
            },
            {
              title: 'WebGL Powered',
              description: 'Hardware-accelerated graphics',
              icon: '🎮',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Up Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.button
          onClick={handleScrollToTop}
          className="glass rounded-full p-4 shadow-lg backdrop-blur-md border border-white/20 hover:border-white/40 transition-all group"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  )
}

