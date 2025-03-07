"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const stars: Star[] = []
    const starCount = 200

    class Star {
      x: number
      y: number
      size: number
      color: string
      speed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`
        this.speed = Math.random() * 0.2
      }

      update() {
        this.y += this.speed
        if (this.y > canvas.height) {
          this.y = 0
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const createStars = () => {
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star())
      }
    }

    const drawStars = () => {
      for (let i = 0; i < stars.length; i++) {
        stars[i].update()
        stars[i].draw()
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawStars()
      animationFrameId = requestAnimationFrame(animate)
    }

    createStars()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full bg-[#0a0b1e]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

export default InteractiveBackground

