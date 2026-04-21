'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, ArrowRight, Calendar, MapPin } from 'lucide-react'

const projects = [
  {
    title: 'Intelligent Traffic Management System',
    description:
      'Real-time AI system with modular detection of helmet violations, triple riding, stop-line breaches, and ANPR. Includes web-based dashboard for violation logging.',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'Flask', 'Computer Vision'],
    period: 'Jan 2025 – Jul 2025',
    location: 'SSEV Software Solutions, Hyderabad',
    type: 'Professional',
    gradient: 'from-neon-teal to-neon-cyan',
  },
  {
    title: 'Synthetic vs. Real Human Video Comparison',
    description:
      'Gradio-based interface using NVIDIA VLM for comparing synthetic and real human videos. Features action detection, real-time recognition analysis, and FID-VID/FVD metrics.',
    technologies: ['Python', 'Gradio', 'NVIDIA VLM', 'Deep Learning'],
    period: 'Sep 2024 – Dec 2024',
    location: 'Hyderabad, Telangana',
    type: 'Academic',
    gradient: 'from-neon-cyan to-neon-teal',
  },
  {
    title: 'Crop Recommendation Model',
    description:
      'MATLAB ML software project for efficient crop recommendation using hyperparameter tuning across multiple ML models for optimal performance.',
    technologies: ['MATLAB', 'Machine Learning', 'Hyperparameter Tuning'],
    period: 'Aug 2024 – Dec 2024',
    location: 'Hyderabad, Telangana',
    type: 'Academic',
    gradient: 'from-neon-gold to-neon-teal',
  },
  {
    title: 'EV Charging Station Occupancy Prediction',
    description:
      'LSTM model implementation for predicting EV charging station availability, based on research paper methodology.',
    technologies: ['Python', 'LSTM', 'TensorFlow-Keras', 'Time Series'],
    period: 'Jan 2024 – Jun 2024',
    location: 'Hyderabad, Telangana',
    type: 'Academic',
    gradient: 'from-neon-teal to-neon-gold',
  },
  {
    title: 'NLP-Based Review Analysis',
    description:
      'Text summarization and aspect-based sentiment analysis system for generating comprehensive reviews from input text.',
    technologies: ['Python', 'NLTK', 'Yake', 'Stanza', 'NLP'],
    period: 'Sept 2023 – Dec 2023',
    location: 'Hyderabad, Telangana',
    type: 'Academic',
    gradient: 'from-neon-cyan to-neon-gold',
  },
  {
    title: 'Mask Detection System',
    description:
      'Real-time mask detection for hospitals using MobileNetV2. Deployed on web with Flask and integrated Twilio API for SMS notifications.',
    technologies: ['Python', 'TensorFlow-Keras', 'Flask', 'Twilio', 'Haar Cascade'],
    period: 'Jul 2023',
    location: 'National University of Singapore',
    type: 'Academic',
    gradient: 'from-neon-gold to-neon-cyan',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-teal to-neon-cyan mx-auto mb-4" />
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Innovative solutions combining AI, Machine Learning, and cutting-edge technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                className="glass p-6 rounded-xl relative group cursor-pointer overflow-hidden border border-white/5 hover:border-white/20 transition-all"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Gradient Background on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  initial={false}
                  animate={{
                    opacity: hoveredIndex === index ? 0.1 : 0,
                  }}
                />

                {/* Animated Border */}
                <motion.div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${project.gradient} opacity-0`}
                  initial={false}
                  animate={{
                    opacity: hoveredIndex === index ? 0.3 : 0,
                  }}
                  style={{
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    padding: '1px',
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <motion.span
                      className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                        project.type === 'Professional'
                          ? 'bg-neon-teal/20 text-neon-teal border border-neon-teal/30'
                          : 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {project.type}
                    </motion.span>
                    <motion.div
                      whileHover={{ rotate: 45, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink
                        className="text-gray-400 group-hover:text-neon-teal transition-colors"
                        size={20}
                      />
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-teal transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-5 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Project Meta */}
                  <div className="flex flex-col gap-2 mb-5 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} />
                      <span>{project.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={12} />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <motion.span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-md bg-dark-card/70 text-gray-300 border border-white/5"
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,245,255,0.2)' }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2.5 py-1 rounded-md bg-dark-card/70 text-gray-400 border border-white/5">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <motion.div
                    className="flex items-center gap-2 text-neon-teal text-sm font-semibold group-hover:gap-3 transition-all"
                    initial={false}
                    animate={{
                      x: hoveredIndex === index ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>View Details</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
