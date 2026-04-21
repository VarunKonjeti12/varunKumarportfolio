'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sparkles, Code, Zap } from 'lucide-react'

function FloatingShape({ delay, size, color, position }: { delay: number, size: number, color: string, position: { x: number, y: number } }) {
  return (
    <motion.div
      className="absolute rounded-full blur-xl opacity-20"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 3 + delay,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

function RotatingRing() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute border-2 border-transparent rounded-full"
          style={{
            width: `${80 + i * 20}px`,
            height: `${80 + i * 20}px`,
            borderTopColor: i === 0 ? '#00f5ff' : i === 1 ? '#00d9ff' : '#ffd700',
            borderRightColor: i === 0 ? '#00f5ff' : i === 1 ? '#00d9ff' : '#ffd700',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2 + i,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.3,
          }}
        />
      ))}
      {/* Logo in center */}
      <motion.div
        className="text-5xl font-black text-gradient bg-clip-text text-transparent bg-gradient-to-r from-neon-teal via-neon-cyan to-neon-gold relative z-10"
        animate={{
          backgroundPosition: ['0%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundSize: '200% auto',
        }}
      >
        VK
      </motion.div>
    </div>
  )
}

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 opacity-10">
      <motion.div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing')

  const loadingMessages = [
    'Initializing',
    'Loading Assets',
    'Preparing Portfolio',
    'Almost Ready',
  ]

  useEffect(() => {
    let currentMessageIndex = 0
    const messageInterval = setInterval(() => {
      currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length
      setLoadingText(loadingMessages[currentMessageIndex])
    }, 800)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(messageInterval)
          setTimeout(() => setIsLoading(false), 800)
          return 100
        }
        return prev + 1.5
      })
    }, 40)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Animated Background Elements */}
          <AnimatedGrid />
          
          {/* Floating Shapes */}
          <FloatingShape delay={0} size={200} color="#00f5ff" position={{ x: 20, y: 30 }} />
          <FloatingShape delay={1} size={150} color="#00d9ff" position={{ x: 80, y: 60 }} />
          <FloatingShape delay={0.5} size={180} color="#ffd700" position={{ x: 50, y: 80 }} />
          <FloatingShape delay={1.5} size={120} color="#00f5ff" position={{ x: 10, y: 70 }} />
          <FloatingShape delay={0.8} size={160} color="#00d9ff" position={{ x: 90, y: 20 }} />

          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-md mx-auto px-6">
            {/* Logo with Rotating Rings */}
            <motion.div
              className="mb-16"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <RotatingRing />
            </motion.div>

            {/* Loading Text with Icon */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="flex items-center justify-center gap-3"
                key={loadingText}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="text-neon-teal" size={20} />
                </motion.div>
                <span className="text-neon-teal text-lg uppercase tracking-wider font-medium">
                  {loadingText}
                </span>
              </motion.div>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full max-w-xs mb-6">
              <div className="w-full h-2 bg-dark-card rounded-full overflow-hidden relative">
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-teal via-neon-cyan to-neon-gold opacity-30 blur-md"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                {/* Progress fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-neon-teal via-neon-cyan to-neon-gold relative z-10"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Progress Percentage */}
            <motion.div
              className="mb-10"
              key={Math.floor(progress)}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-neon-teal via-neon-cyan to-neon-gold">
                {Math.floor(progress)}%
              </span>
            </motion.div>

            {/* Animated Tech Icons */}
            <motion.div
              className="flex justify-center gap-8 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: Code, color: '#00f5ff', delay: 0 },
                { icon: Zap, color: '#00d9ff', delay: 0.2 },
                { icon: Sparkles, color: '#ffd700', delay: 0.4 },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6 + item.delay, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                  >
                    <Icon size={28} style={{ color: item.color }} />
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Animated Dots */}
            <div className="flex justify-center gap-3 mb-6">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-neon-teal to-neon-cyan"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Bottom Text */}
            <motion.p
              className="text-gray-500 text-xs uppercase tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Building Your Experience
            </motion.p>
          </div>

          {/* Corner Accents */}
          <motion.div
            className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-neon-teal/30"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-neon-cyan/30"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              delay: 0.5,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-neon-gold/30"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              delay: 1,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-neon-teal/30"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              delay: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
