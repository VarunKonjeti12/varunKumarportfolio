'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, Database, Cpu, Zap } from 'lucide-react'

const skillCategories = [
  {
    title: 'Languages',
    icon: Code,
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'C', level: 80 },
      { name: 'SQL', level: 85 },
    ],
    bgColor: 'rgba(0, 245, 255, 0.2)',
    textColor: '#00f5ff',
    glowColor: 'rgba(0, 245, 255, 0.1)',
  },
  {
    title: 'Libraries & Frameworks',
    icon: Zap,
    skills: [
      { name: 'TensorFlow-Keras', level: 88 },
      { name: 'PyTorch', level: 85 },
      { name: 'NumPy', level: 90 },
      { name: 'Pandas', level: 90 },
      { name: 'OpenCV', level: 85 },
    ],
    bgColor: 'rgba(0, 217, 255, 0.2)',
    textColor: '#00d9ff',
    glowColor: 'rgba(0, 217, 255, 0.1)',
  },
  {
    title: 'Tools & Software',
    icon: Cpu,
    skills: [
      { name: 'MATLAB', level: 85 },
      { name: 'AutoCAD', level: 75 },
      { name: 'Gephi', level: 80 },
      { name: 'Canva', level: 85 },
    ],
    bgColor: 'rgba(255, 215, 0, 0.2)',
    textColor: '#ffd700',
    glowColor: 'rgba(255, 215, 0, 0.1)',
  },
  {
    title: 'Soft Skills',
    icon: Database,
    skills: [
      { name: 'Problem Solving', level: 95 },
      { name: 'Teamwork', level: 90 },
      { name: 'Attention to Detail', level: 92 },
      { name: 'Documentation', level: 88 },
      { name: 'Positive Attitude', level: 95 },
    ],
    bgColor: 'rgba(0, 245, 255, 0.2)',
    textColor: '#00f5ff',
    glowColor: 'rgba(0, 245, 255, 0.1)',
  },
]

function SkillBar({ skill, color, isInView }: { skill: { name: string; level: number }, color: string, isInView: boolean }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
        <span className="text-gray-400 text-xs">{skill.level}%</span>
      </div>
      <div className="h-2 bg-dark-card/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
    <section id="skills" ref={ref} className="section-padding relative bg-dark-surface/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Skills & <span className="text-gradient">Technologies</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-teal to-neon-cyan mx-auto mb-4" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technical expertise and proficiency across various domains
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.title}
                  variants={cardVariants}
                  className="glass p-6 rounded-xl relative group cursor-pointer"
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Glow effect on hover */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                    style={{ backgroundColor: category.glowColor }}
                  />

                  <div className="relative z-10">
                    <div
                      className="inline-flex p-3 rounded-lg mb-4 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: category.bgColor }}
                    >
                      <Icon size={28} style={{ color: category.textColor }} />
                    </div>
                    <h3 className="text-xl font-bold mb-6 text-white">{category.title}</h3>
                    <div>
                      {category.skills.map((skill) => (
                        <SkillBar
                          key={skill.name}
                          skill={skill}
                          color={category.textColor}
                          isInView={isInView}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Core Competencies */}
          <motion.div
            variants={cardVariants}
            className="mt-12 glass p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold mb-8 text-center text-white">
              Core Competencies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Machine Learning',
                'Deep Learning',
                'Data Science',
                'Computer Vision',
                'NLP',
                'AI Integration',
                'Model Training',
                'System Deployment',
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  className="text-center p-5 rounded-lg bg-dark-card/50 border border-white/5 hover:border-neon-teal/50 transition-all group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <span className="text-gray-300 text-sm font-medium group-hover:text-neon-teal transition-colors">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
