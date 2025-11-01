'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const handleScrollToPlanet = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault()
  const planetSection = document.getElementById('planet')
  if (planetSection) {
    planetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const cardVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

const features = [
  {
    title: '3D Graphics',
    description: 'Immersive three-dimensional backgrounds powered by React Three Fiber',
    icon: '🎨',
  },
  {
    title: 'Smooth Animations',
    description: 'Fluid motion design with Framer Motion for cinematic experiences',
    icon: '✨',
  },
  {
    title: 'Responsive Design',
    description: 'Perfectly optimized for all devices and screen sizes',
    icon: '📱',
  },
  {
    title: 'Modern Stack',
    description: 'Built with Next.js, TypeScript, and Tailwind CSS',
    icon: '⚡',
  },
]

export default function HeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto w-full text-center space-y-12"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="gradient-text block mb-2">Modern</span>
            <span className="text-white block">Frontend Design</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            Experience the future of web design with interactive 3D effects,
            smooth animations, and cinematic visual experiences.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 sm:gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-shadow"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass rounded-full font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="glass rounded-2xl p-6 cursor-pointer"
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{
                  rotate: hoveredIndex === index ? [0, -10, 10, -10, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.a
            href="#planet"
            onClick={handleScrollToPlanet}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block cursor-pointer group"
            whileHover={{ scale: 1.1 }}
          >
            <svg
              className="w-8 h-8 text-white/50 group-hover:text-white transition-colors"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  )
}

