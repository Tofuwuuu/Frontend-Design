'use client'

import { motion } from 'framer-motion'
import Scene3D from '@/components/Scene3D'
import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Scene3D />
      <div className="relative z-10">
        <HeroSection />
      </div>
      
      {/* Additional animated background elements */}
      <div className="fixed inset-0 pointer-events-none -z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </main>
  )
}

