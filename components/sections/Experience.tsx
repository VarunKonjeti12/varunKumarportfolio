'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, Award, Calendar, MapPin } from 'lucide-react'

const experiences = [
  {
    type: 'experience',
    title: 'AI Intern',
    organization: 'SSEV Software Solutions Private Limited',
    location: 'Hyderabad, India',
    period: 'Jan 2025 – Jul 2025',
    icon: Briefcase,
    points: [
      'Contributed to the deployment of AI-integrated automation systems for enterprise and infrastructure solutions',
      'Assisted in data preprocessing, model training, and evaluation to improve AI model accuracy',
      'Supported development and integration of voice assistant features into larger software setups',
      'Built and deployed a real-time Intelligent Traffic Management System with modular detection capabilities',
      'Designed and integrated a web-based dashboard for violation logging and review',
    ],
  },
]

const education = [
  {
    type: 'education',
    title: 'Master of IT in Business (AI Track)',
    organization: 'Singapore Management University',
    location: 'Singapore',
    period: 'January 2026 – Present',
    icon: GraduationCap,
    details: [
      'Coursework: Machine Learning, Algorithm Design and Implementation',
      'Query Processing and Optimisation, Statistical Thinking for Data Science',
    ],
  },
  {
    type: 'education',
    title: 'B.Tech in Artificial Intelligence',
    organization: 'Mahindra University',
    location: 'India',
    period: 'August 2021 – August 2025',
    icon: GraduationCap,
    details: [
      'GPA: 8.38 (till 7th semester)',
      'Coursework: Machine Learning, Database Management System, Financial Accounting',
      'Design Thinking, Artificial Intelligence, Digital Image Processing',
      'Money, Banking & Finance, Lean Startup',
    ],
  },
  {
    type: 'education',
    title: '12th Grade',
    organization: 'Sree Vidyanikethan International School',
    location: 'India',
    period: 'June 2020 – June 2021',
    icon: GraduationCap,
    details: ['Percentage: 91.6', 'Coursework: Mathematics, Physics, Chemistry, English, Physical Education'],
  },
  {
    type: 'education',
    title: '10th Grade',
    organization: 'Ongole Oxford E M High School',
    location: 'India',
    period: 'May 2018 – April 2019',
    icon: GraduationCap,
    details: ['GPA: 10.0/10.0', 'Coursework: Mathematics, Telugu, Hindi, English, Social Studies, General Science'],
  },
]

const training = [
  {
    type: 'training',
    title: 'Global Academic Internship Program',
    organization: 'National University of Singapore',
    location: 'Singapore',
    period: 'Jul 2023 – Aug 2023',
    icon: Award,
    details: [
      'Attended sessions on Deep Learning with Data Analytics',
      'Worked on a mask detection project with a team of 5 and presented it to the NUS Faculty',
      'Completed with an A grade',
    ],
  },
  {
    type: 'training',
    title: 'Amazon Web Services',
    organization: 'National University of Singapore',
    location: 'Singapore',
    period: 'Jul 2023 – Aug 2023',
    icon: Award,
    details: [
      'Learned and explored various AWS tools',
      'Worked on a team project with 5 members and presented it to the AWS Faculty',
      'Obtained AWS certification',
    ],
  },
]

export default function Experience() {
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

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  return (
    <section id="experience" ref={ref} className="section-padding relative bg-dark-surface/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Experience & <span className="text-gradient">Education</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-teal to-neon-cyan mx-auto" />
          </motion.div>

          {/* Experience */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-neon-teal flex items-center gap-3">
              <Briefcase size={28} />
              Professional Experience
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-teal via-neon-cyan to-transparent" />

              {experiences.map((exp, index) => {
                const Icon = exp.icon
                return (
                  <motion.div
                    key={exp.title}
                    variants={itemVariants}
                    className="relative pl-20 pb-12"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-neon-teal glow-effect" />

                    <div className="glass p-6 rounded-xl hover:scale-[1.02] transition-transform">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-neon-teal/20">
                          <Icon className="text-neon-teal" size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-1">{exp.title}</h4>
                          <p className="text-neon-cyan font-medium mb-2">{exp.organization}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-16">
                        {exp.points?.map((point, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-neon-teal mt-1.5">▸</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Education */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-neon-cyan flex items-center gap-3">
              <GraduationCap size={28} />
              Education
            </h3>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-gold to-transparent" />

              {education.map((edu, index) => {
                const Icon = edu.icon
                return (
                  <motion.div
                    key={edu.title}
                    variants={itemVariants}
                    className="relative pl-20 pb-12"
                  >
                    <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-neon-cyan glow-effect" />

                    <div className="glass p-6 rounded-xl hover:scale-[1.02] transition-transform">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-neon-cyan/20">
                          <Icon className="text-neon-cyan" size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-1">{edu.title}</h4>
                          <p className="text-neon-teal font-medium mb-2">{edu.organization}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {edu.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {edu.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-16">
                        {edu.details?.map((detail, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-neon-cyan mt-1.5">▸</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Training Programs */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-neon-gold flex items-center gap-3">
              <Award size={28} />
              Training Programs & Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {training.map((train) => {
                const Icon = train.icon
                return (
                  <motion.div
                    key={train.title}
                    variants={itemVariants}
                    className="glass p-6 rounded-xl hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-neon-gold/20">
                        <Icon className="text-neon-gold" size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-1">{train.title}</h4>
                        <p className="text-neon-gold font-medium mb-2">{train.organization}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {train.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {train.location}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {train.details?.map((detail, i) => (
                            <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                              <span className="text-neon-gold mt-1.5">▸</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

