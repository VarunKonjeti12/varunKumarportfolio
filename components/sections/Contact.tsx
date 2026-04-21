'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Torus } from '@react-three/drei'

function AnimatedTorus() {
  return (
    <Torus args={[0.8, 0.3, 16, 100]}>
      <meshStandardMaterial
        color="#00f5ff"
        metalness={0.8}
        roughness={0.2}
        emissive="#00f5ff"
        emissiveIntensity={0.3}
      />
    </Torus>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! I will get back to you soon.',
      })
      setFormData({ name: '', email: '', message: '' })
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="contact" ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-teal to-neon-cyan mx-auto mb-4" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              Let's collaborate and bring innovative AI solutions to life
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                <div className="space-y-6">
                  <motion.a
                    href="mailto:varunkonjeti77@gmail.com"
                    className="flex items-center gap-4 glass p-4 rounded-lg group hover:scale-[1.02] transition-transform"
                    whileHover={{ x: 10 }}
                  >
                    <div className="p-3 rounded-lg bg-neon-teal/20 group-hover:bg-neon-teal/30 transition-colors">
                      <Mail className="text-neon-teal" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium">varunkonjeti77@gmail.com</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:+917780744275"
                    className="flex items-center gap-4 glass p-4 rounded-lg group hover:scale-[1.02] transition-transform"
                    whileHover={{ x: 10 }}
                  >
                    <div className="p-3 rounded-lg bg-neon-cyan/20 group-hover:bg-neon-cyan/30 transition-colors">
                      <Phone className="text-neon-cyan" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone (India)</p>
                      <p className="text-white font-medium">+91 7780744275</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:+6588574617"
                    className="flex items-center gap-4 glass p-4 rounded-lg group hover:scale-[1.02] transition-transform"
                    whileHover={{ x: 10 }}
                  >
                    <div className="p-3 rounded-lg bg-neon-gold/20 group-hover:bg-neon-gold/30 transition-colors">
                      <Phone className="text-neon-gold" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone (Singapore)</p>
                      <p className="text-white font-medium">+65 8857 4617</p>
                    </div>
                  </motion.a>

                  <div className="flex items-center gap-4 glass p-4 rounded-lg">
                    <div className="p-3 rounded-lg bg-neon-gold/20">
                      <MapPin className="text-neon-gold" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-medium">Singapore</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Connect With Me</h3>
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com/VarunKonjeti12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 glass rounded-lg hover:bg-neon-teal/10 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="text-neon-teal" size={24} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/varunkumarkonjeti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 glass rounded-lg hover:bg-neon-cyan/10 transition-colors"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="text-neon-cyan" size={24} />
                  </motion.a>
                  <motion.a
                    href="https://varun-konjeti.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 glass rounded-lg hover:bg-neon-gold/10 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Globe className="text-neon-gold" size={24} />
                  </motion.a>
                </div>
              </div>

              {/* 3D Element */}
              <div className="h-64 glass rounded-lg overflow-hidden">
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <AnimatedTorus />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                </Canvas>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="glass p-8 rounded-xl space-y-6">
                {/* Status Message */}
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      submitStatus.type === 'success'
                        ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                        : 'bg-red-500/20 border border-red-500/50 text-red-400'
                    }`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-dark-card/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-teal transition-colors"
                    placeholder="Your Name"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-dark-card/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-teal transition-colors"
                    placeholder="your.email@example.com"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-dark-card/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-teal transition-colors resize-none"
                    placeholder="Your message here..."
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-neon-teal to-neon-cyan text-dark-bg font-semibold rounded-lg glow-effect hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

