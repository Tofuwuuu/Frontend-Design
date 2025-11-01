'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{ scaleX }}
    >
      <div className="h-full w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 shadow-lg shadow-purple-500/50" />
    </motion.div>
  )
}

