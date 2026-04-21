'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown, Mail, Phone, MapPin, Sparkles } from 'lucide-react'
import TypewriterText from '@/components/TypewriterText'

function FloatingOrb({ delay, duration, size, color, position }: { delay: number, duration: number, size: number, color: string, position: { x: string, y: string } }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-20"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        left: position.x,
        top: position.y,
      }}
      animate={{
        x: [0, 100, 0],
        y: [0, -50, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

function AnimatedGradientWave() {
  return (
    <motion.div
      className="absolute inset-0 opacity-10"
      animate={{
        background: [
          'radial-gradient(circle at 20% 30%, rgba(0,245,255,0.3) 0%, transparent 50%)',
          'radial-gradient(circle at 80% 70%, rgba(0,217,255,0.3) 0%, transparent 50%)',
          'radial-gradient(circle at 50% 50%, rgba(0,245,255,0.3) 0%, transparent 50%)',
          'radial-gradient(circle at 20% 30%, rgba(0,245,255,0.3) 0%, transparent 50%)',
        ],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

function FloatingShape({ delay, duration, size, color, position, shape }: { delay: number, duration: number, size: number, color: string, position: { x: string, y: string }, shape: 'circle' | 'square' | 'triangle' }) {
  const shapeClass = shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-lg rotate-45' : ''

  return (
    <motion.div
      className={`absolute ${shapeClass} opacity-10`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        left: position.x,
        top: position.y,
        clipPath: shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        rotate: [0, 180, 360],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

function AnimatedGrid() {
  return (
    <motion.div
      className="absolute inset-0 opacity-[0.03]"
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,245,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  )
}

function LightRay({ delay, duration, angle, position }: { delay: number, duration: number, angle: number, position: { x: string, y: string } }) {
  return (
    <motion.div
      className="absolute w-1 h-full opacity-5"
      style={{
        left: position.x,
        top: position.y,
        background: 'linear-gradient(to bottom, transparent, rgba(0,245,255,0.5), transparent)',
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'top center',
      }}
      animate={{
        opacity: [0.05, 0.15, 0.05],
        scaleY: [1, 1.5, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Hero() {
  const [showTypewriter, setShowTypewriter] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Start typewriter after a short delay (after loading screen)
    const timer = setTimeout(() => {
      setShowTypewriter(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Set video properties
    video.muted = true
    video.loop = true
    video.playsInline = true

    const playVideo = async () => {
      try {
        video.currentTime = 0
        await video.play()
      } catch (error) {
        console.log('Video autoplay prevented, will retry:', error)
        setTimeout(() => {
          video.play().catch(() => {})
        }, 100)
      }
    }

    // Play when video is ready
    const handleCanPlay = () => {
      playVideo()
    }

    if (video.readyState >= 2) {
      playVideo()
    } else {
      video.addEventListener('canplay', handleCanPlay, { once: true })
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover pointer-events-none"
            style={{
              filter: 'brightness(0.2) contrast(1.2) saturate(1.1)',
              minHeight: '100%',
              minWidth: '100%',
            }}
            onLoadedMetadata={(e) => {
              const video = e.currentTarget
              video.play().catch(() => {
                console.log('Video autoplay prevented, will play on interaction')
              })
            }}
            onCanPlayThrough={(e) => {
              const video = e.currentTarget
              video.play().catch(() => {})
            }}
          >
            <source src="/about-bg-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-dark-bg/60 backdrop-blur-[1px]" />
        {/* Gradient overlay for better visual effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg/70 via-dark-surface/50 to-dark-bg/70" />
      </div>

      {/* Base Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg/40 via-dark-surface/30 to-dark-bg/40" />

      {/* Animated Gradient Wave */}
      <AnimatedGradientWave />

      {/* Floating Orbs */}
      <FloatingOrb delay={0} duration={20} size={400} color="#00f5ff" position={{ x: '10%', y: '20%' }} />
      <FloatingOrb delay={5} duration={25} size={300} color="#00d9ff" position={{ x: '80%', y: '60%' }} />

      {/* Floating Geometric Shapes */}
      <FloatingShape delay={0} duration={8} size={60} color="#00f5ff" position={{ x: '15%', y: '30%' }} shape="circle" />
      <FloatingShape delay={2} duration={10} size={40} color="#00d9ff" position={{ x: '75%', y: '25%' }} shape="square" />
      <FloatingShape delay={4} duration={12} size={50} color="#00d9ff" position={{ x: '85%', y: '70%' }} shape="triangle" />
      <FloatingShape delay={6} duration={9} size={45} color="#00f5ff" position={{ x: '20%', y: '75%' }} shape="circle" />

      {/* Animated Grid */}
      <AnimatedGrid />

      {/* Light Rays */}
      <LightRay delay={0} duration={6} angle={15} position={{ x: '25%', y: '0%' }} />
      <LightRay delay={2} duration={8} angle={-20} position={{ x: '75%', y: '0%' }} />
      <LightRay delay={4} duration={7} angle={10} position={{ x: '50%', y: '0%' }} />

      {/* Subtle Accent Lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-teal/30 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          delay: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-24 text-center"
        initial="hidden"
        animate="visible"
      >
        {/* Professional Badge */}
        <motion.div
          custom={0}
          variants={textVariants}
          className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 glass rounded-full border border-neon-teal/20"
        >
          <Sparkles className="text-neon-teal" size={16} />
          <span className="text-neon-teal text-sm font-medium tracking-wider uppercase">
            AI Professional • Machine Learning Engineer
          </span>
        </motion.div>

        {/* Main Heading with Typewriter Effect */}
        <div className="mb-8">
          <motion.h1
            custom={1}
            variants={textVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-3 leading-tight overflow-hidden"
          >
            {showTypewriter ? (
              <TypewriterText
                text="Varun Kumar"
                speed={80}
                delay={200}
                className="block text-white"
              />
            ) : (
              <span className="block text-white opacity-0">Varun Kumar</span>
            )}
          </motion.h1>
          <motion.h1
            custom={2}
            variants={textVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold overflow-hidden"
          >
            {showTypewriter ? (
              <TypewriterText
                text="Konjeti"
                speed={100}
                delay={1200}
                className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-neon-teal via-neon-cyan to-neon-cyan"
              />
            ) : (
              <span className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-neon-teal via-neon-cyan to-neon-gold opacity-0">
                Konjeti
              </span>
            )}
          </motion.h1>
        </div>

        {/* Professional Description */}
        <motion.p
          custom={3}
          variants={textVariants}
          className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Highly motivated and results-driven professional with a strong background in{' '}
          <span className="text-neon-teal font-semibold">Artificial Intelligence</span>.
          Passionate about solving complex problems through innovation and technology.
        </motion.p>

        {/* Contact Info */}
        <motion.div
          custom={4}
          variants={textVariants}
          className="flex flex-wrap justify-center gap-6 mb-12 text-sm md:text-base"
        >
          <motion.a
            href="mailto:varunkonjeti77@gmail.com"
            className="group flex items-center gap-2 px-5 py-3 glass rounded-lg border border-white/5 hover:border-neon-teal/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="text-neon-teal" size={18} />
            <span className="text-gray-300 group-hover:text-white transition-colors">
              varunkonjeti77@gmail.com
            </span>
          </motion.a>
          <motion.a
            href="tel:+917780744275"
            className="group flex items-center gap-2 px-5 py-3 glass rounded-lg border border-white/5 hover:border-neon-cyan/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="text-neon-cyan" size={18} />
            <span className="text-gray-300 group-hover:text-white transition-colors">
              +91 7780744275
            </span>
          </motion.a>
          <div className="flex items-center gap-2 px-5 py-3 glass rounded-lg border border-white/5">
            <MapPin className="text-neon-cyan" size={18} />
            <span className="text-gray-300">Singapore</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          custom={5}
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.a
            href="#projects"
            className="px-10 py-4 bg-gradient-to-r from-neon-teal to-neon-cyan text-dark-bg font-semibold text-lg rounded-lg hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            className="px-10 py-4 glass border-2 border-neon-teal/50 text-neon-teal font-semibold text-lg rounded-lg hover:bg-neon-teal/10 hover:border-neon-teal transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          custom={6}
          variants={textVariants}
          className="flex justify-center gap-6"
        >
          {[
            { name: 'GitHub', href: 'https://github.com/VarunKonjeti12', color: '#00f5ff' },
            { name: 'LinkedIn', href: 'https://linkedin.com/in/varunkumarkonjeti', color: '#00d9ff' },
            { name: 'Website', href: 'https://varun-konjeti.com', color: '#00d9ff' },
          ].map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 glass rounded-lg border border-white/5 hover:border-white/20 transition-all"
              style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              whileHover={{ scale: 1.1, borderColor: social.color }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <span
                className="text-gray-400 font-medium transition-colors"
                style={{ color: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = social.color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                {social.name}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-neon-teal"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-xs uppercase tracking-wider opacity-70">Scroll</span>
          <ChevronDown size={24} />
        </motion.a>
      </motion.div>
    </section>
  )
}
