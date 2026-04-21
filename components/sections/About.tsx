'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { GraduationCap, Target, Lightbulb, Award, TrendingUp, Users } from 'lucide-react'

const stats = [
  { label: 'Years Experience', value: 2, icon: TrendingUp, color: 'neon-teal', suffix: '+' },
  { label: 'Projects Completed', value: 10, icon: Target, color: 'neon-cyan', suffix: '+' },
  { label: 'Certifications', value: 3, icon: Award, color: 'neon-gold', suffix: '+' },
]

function AnimatedCounter({ value, suffix = '', isInView }: { value: number, suffix?: string, isInView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    
    const duration = 2000
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isInView, value])

  return <span>{count}{suffix}</span>
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])

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
        // Retry when section is in view
        if (isInView) {
          setTimeout(() => {
            video.play().catch(() => {})
          }, 100)
        }
      }
    }

    // Play when video is ready
    const handleCanPlay = () => {
      playVideo()
    }

    // Play when section comes into view
    if (isInView) {
      if (video.readyState >= 2) {
        playVideo()
      } else {
        video.addEventListener('canplay', handleCanPlay, { once: true })
      }
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  return (
    <section 
      id="about" 
      ref={ref} 
      className="section-padding relative overflow-hidden"
      onClick={() => {
        // Play video on user interaction if autoplay failed
        videoRef.current?.play().catch(() => {})
      }}
    >
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
              filter: 'brightness(0.25) contrast(1.2) saturate(1.1)',
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
        <div className="absolute inset-0 bg-dark-bg/75 backdrop-blur-[2px]" />
        {/* Gradient overlay for better visual effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/85 via-dark-bg/60 to-dark-bg/85" />
        {/* Subtle animated overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-teal/5 via-transparent to-neon-cyan/5"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Parallax Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-neon-teal/10 blur-3xl z-[1]"
        style={{ y, opacity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-neon-cyan/10 blur-3xl z-[1]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]), opacity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              About <span className="text-gradient">Me</span>
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-neon-teal to-neon-cyan mx-auto mb-8"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.p
              className="text-gray-400 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Passionate AI professional dedicated to solving complex problems through innovation
            </motion.p>
          </motion.div>

          {/* Stats Section with Counter Animation */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  className="glass p-6 rounded-xl text-center group hover:scale-105 transition-transform relative overflow-hidden"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                  whileHover={{ y: -5, rotate: [0, -2, 2, 0] }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br from-${stat.color}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                  
                  <div
                    className="relative z-10 inline-flex p-4 rounded-lg mb-4 group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: stat.color === 'neon-teal' ? 'rgba(0,245,255,0.2)' : stat.color === 'neon-cyan' ? 'rgba(0,217,255,0.2)' : 'rgba(255,215,0,0.2)',
                    }}
                  >
                    <Icon
                      size={32}
                      style={{
                        color: stat.color === 'neon-teal' ? '#00f5ff' : stat.color === 'neon-cyan' ? '#00d9ff' : '#ffd700',
                      }}
                    />
                  </div>
                  <motion.div
                    className="text-4xl font-bold mb-2"
                    style={{
                      color: stat.color === 'neon-teal' ? '#00f5ff' : stat.color === 'neon-cyan' ? '#00d9ff' : '#ffd700',
                    }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                  </motion.div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Visual Element with Enhanced Animations */}
            <motion.div
              variants={itemVariants}
              className="relative h-96 md:h-[500px]"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 glass rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-teal/20 via-neon-cyan/20 to-neon-gold/20" />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    background: [
                      'radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(0,217,255,0.3) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 70%)',
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <motion.div
                    className="w-64 h-64 rounded-full bg-gradient-to-r from-neon-teal via-neon-cyan to-neon-gold opacity-30 blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <motion.div
                    className="text-8xl font-black text-white/10"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    AI
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Highly motivated and results-driven professional with a strong background in{' '}
                  <motion.span
                    className="text-neon-teal font-semibold inline-block"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    Artificial Intelligence
                  </motion.span>
                  . Passionate about solving complex problems through innovation and technology.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Having experience working in dynamic environments, collaborating with cross-functional
                  teams, and driving projects to successful completion. Currently pursuing{' '}
                  <motion.span
                    className="text-neon-cyan font-semibold inline-block"
                    whileHover={{ scale: 1.1 }}
                  >
                    Master of IT in Business (AI Track)
                  </motion.span>{' '}
                  at Singapore Management University.
                </p>
              </motion.div>

              {/* Key Points */}
              <div className="grid grid-cols-1 gap-4 mt-8">
                {[
                  {
                    icon: GraduationCap,
                    title: 'Education Focus',
                    description: 'Specialized in Machine Learning, Algorithm Design, and Statistical Data Science',
                    color: 'neon-teal',
                  },
                  {
                    icon: Target,
                    title: 'Professional Experience',
                    description: 'AI Intern at SSEV Software Solutions, working on enterprise automation systems',
                    color: 'neon-cyan',
                  },
                  {
                    icon: Lightbulb,
                    title: 'Innovation Driven',
                    description: 'Building real-time AI systems including Intelligent Traffic Management',
                    color: 'neon-gold',
                  },
                ].map((point, index) => {
                  const Icon = point.icon
                  const borderColor = point.color === 'neon-teal' ? 'rgba(0,245,255,0.5)' : point.color === 'neon-cyan' ? 'rgba(0,217,255,0.5)' : 'rgba(255,215,0,0.5)'
                  const bgColor = point.color === 'neon-teal' ? 'rgba(0,245,255,0.2)' : point.color === 'neon-cyan' ? 'rgba(0,217,255,0.2)' : 'rgba(255,215,0,0.2)'
                  const bgColorHover = point.color === 'neon-teal' ? 'rgba(0,245,255,0.3)' : point.color === 'neon-cyan' ? 'rgba(0,217,255,0.3)' : 'rgba(255,215,0,0.3)'
                  const iconColor = point.color === 'neon-teal' ? '#00f5ff' : point.color === 'neon-cyan' ? '#00d9ff' : '#ffd700'
                  
                  return (
                    <motion.div
                      key={point.title}
                      className="glass p-5 rounded-xl flex items-start gap-4 group cursor-pointer"
                      whileHover={{ 
                        scale: 1.02, 
                        x: 10,
                        borderColor: borderColor,
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={{ 
                        border: '1px solid transparent',
                        borderColor: 'transparent',
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <motion.div
                        className="p-3 rounded-lg"
                        style={{
                          backgroundColor: bgColor,
                        }}
                        whileHover={{ 
                          rotate: [0, -10, 10, 0],
                          backgroundColor: bgColorHover,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon
                          size={24}
                          style={{
                            color: iconColor,
                          }}
                        />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-white mb-2">{point.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{point.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
