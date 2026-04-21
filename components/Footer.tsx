'use client'

import { motion } from 'framer-motion'
import { Heart, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/10 py-8 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            className="text-gray-400 text-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            © {new Date().getFullYear()} Varun Kumar Konjeti. All rights reserved.
          </motion.p>
          <motion.div className="flex items-center gap-6">
            <motion.p
              className="text-gray-400 text-sm flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              Made with{' '}
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Heart className="text-red-500" size={16} fill="currentColor" />
              </motion.span>{' '}
              in Singapore
            </motion.p>
            <motion.button
              onClick={scrollToTop}
              className="p-2 glass rounded-lg border border-white/10 hover:border-neon-teal/50 transition-all"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, rotate: -180 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ArrowUp className="text-neon-teal" size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
