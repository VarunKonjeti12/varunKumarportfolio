'use client'

import { useEffect } from 'react'

export default function CursorEffect() {
  useEffect(() => {
    const cursor = document.createElement('div')
    cursor.className = 'fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference'
    cursor.style.background = 'radial-gradient(circle, rgba(0,245,255,0.8) 0%, rgba(0,217,255,0.4) 100%)'
    cursor.style.transform = 'translate(-50%, -50%)'
    cursor.style.transition = 'width 0.3s, height 0.3s'
    document.body.appendChild(cursor)

    const cursorFollower = document.createElement('div')
    cursorFollower.className = 'fixed w-12 h-12 rounded-full pointer-events-none z-50'
    cursorFollower.style.border = '2px solid rgba(0,245,255,0.3)'
    cursorFollower.style.transform = 'translate(-50%, -50%)'
    cursorFollower.style.transition = 'all 0.1s ease-out'
    document.body.appendChild(cursorFollower)

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
      cursorFollower.style.left = `${e.clientX}px`
      cursorFollower.style.top = `${e.clientY}px`
    }

    const handleMouseEnter = () => {
      cursor.style.width = '32px'
      cursor.style.height = '32px'
    }

    const handleMouseLeave = () => {
      cursor.style.width = '24px'
      cursor.style.height = '24px'
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('button, a')
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        cursor.style.width = '40px'
        cursor.style.height = '40px'
      })
      button.addEventListener('mouseleave', () => {
        cursor.style.width = '24px'
        cursor.style.height = '24px'
      })
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cursor.remove()
      cursorFollower.remove()
    }
  }, [])

  return null
}

