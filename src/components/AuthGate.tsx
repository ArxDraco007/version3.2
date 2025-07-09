import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Lock, Eye, EyeOff, Terminal, Zap, Crown, Star } from 'lucide-react'

interface AuthGateProps {
  children: React.ReactNode
  onAuthenticated: () => void
}

export const AuthGate: React.FC<AuthGateProps> = ({ children, onAuthenticated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [hackerText, setHackerText] = useState('')
  const [showMatrix, setShowMatrix] = useState(true)

  const correctPassword = 'VANGUARD2025'

  // Matrix rain effect
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("")
    const font_size = 10
    const columns = canvas.width / font_size

    const drops: number[] = []
    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    function draw() {
      if (!ctx || !canvas) return
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#FFD700'
      ctx.font = font_size + 'px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * font_size, drops[i] * font_size)

        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)
    return () => clearInterval(interval)
  }, [])

  // Hacker typing effect
  useEffect(() => {
    const messages = [
      'INITIALIZING SECURE CONNECTION...',
      'SCANNING NETWORK PROTOCOLS...',
      'ESTABLISHING ENCRYPTED TUNNEL...',
      'VANGUARD SECURITY SYSTEM ACTIVE',
      'AWAITING AUTHENTICATION...'
    ]

    let messageIndex = 0
    let charIndex = 0

    const typeMessage = () => {
      if (messageIndex < messages.length) {
        if (charIndex < messages[messageIndex].length) {
          setHackerText(messages[messageIndex].substring(0, charIndex + 1))
          charIndex++
          setTimeout(typeMessage, 50)
        } else {
          setTimeout(() => {
            messageIndex++
            charIndex = 0
            if (messageIndex < messages.length) {
              typeMessage()
            }
          }, 1000)
        }
      }
    }

    const timeout = setTimeout(typeMessage, 1000)
    return () => clearTimeout(timeout)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate authentication process
    await new Promise(resolve => setTimeout(resolve, 2000))

    if (password === correctPassword) {
      setIsAuthenticated(true)
      setShowMatrix(false)
      setTimeout(() => {
        onAuthenticated()
      }, 1500)
    } else {
      setError('ACCESS DENIED - INVALID CREDENTIALS')
      setPassword('')
    }
    setIsLoading(false)
  }

  if (isAuthenticated) {
    return (
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        onAnimationComplete={() => setShowMatrix(false)}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-32 h-32 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center mb-8 mx-auto shadow-2xl"
            animate={{ 
              rotate: 360,
              boxShadow: [
                "0 0 50px rgba(255, 215, 0, 0.8)",
                "0 0 100px rgba(255, 215, 0, 1)",
                "0 0 50px rgba(255, 215, 0, 0.8)"
              ]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 2, repeat: Infinity }
            }}
          >
            <Crown className="w-16 h-16 text-yellow-900" />
          </motion.div>
          <motion.h1 
            className="text-6xl font-bold text-yellow-900 mb-4"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(255, 215, 0, 0.8)",
                "0 0 40px rgba(255, 215, 0, 1)",
                "0 0 20px rgba(255, 215, 0, 0.8)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ACCESS GRANTED
          </motion.h1>
          <motion.p 
            className="text-2xl text-yellow-800 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            WELCOME TO VANGUARD
          </motion.p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Matrix Background */}
      <AnimatePresence>
        {showMatrix && (
          <motion.canvas
            id="matrix-canvas"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-yellow-900/20 to-black/80" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          className="max-w-md w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-yellow-300"
              animate={{ 
                rotate: [0, 360],
                boxShadow: [
                  "0 0 30px rgba(255, 215, 0, 0.6)",
                  "0 0 60px rgba(255, 215, 0, 0.9)",
                  "0 0 30px rgba(255, 215, 0, 0.6)"
                ]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 3, repeat: Infinity }
              }}
            >
              <Shield className="w-12 h-12 text-yellow-900" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-4"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              CLASSIFIED ACCESS
            </motion.h1>
            
            <motion.div 
              className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-mono">SYSTEM STATUS</span>
              </div>
              <motion.p 
                className="text-yellow-300 font-mono text-sm"
                key={hackerText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {hackerText}
                <motion.span
                  className="inline-block w-2 h-4 bg-yellow-400 ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Authentication Form */}
          <motion.div
            className="bg-gradient-to-br from-black/80 via-yellow-900/10 to-black/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-yellow-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <motion.div
                  className="flex items-center justify-center gap-2 mb-4"
                  animate={{ 
                    textShadow: [
                      "0 0 10px rgba(255, 215, 0, 0.5)",
                      "0 0 20px rgba(255, 215, 0, 0.8)",
                      "0 0 10px rgba(255, 215, 0, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lock className="w-6 h-6 text-yellow-400" />
                  <span className="text-yellow-300 font-bold text-lg">SECURE LOGIN</span>
                  <Zap className="w-6 h-6 text-yellow-400" />
                </motion.div>
                <p className="text-yellow-400/80 text-sm font-mono">
                  ENTER AUTHORIZATION CODE TO PROCEED
                </p>
              </div>

              <div className="relative">
                <label className="block text-yellow-300 text-sm font-bold mb-3 font-mono">
                  ACCESS CODE
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value.toUpperCase())}
                    className="w-full px-4 py-4 bg-black/60 border-2 border-yellow-500/50 rounded-xl text-yellow-300 font-mono text-lg focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-300 placeholder-yellow-600/50"
                    placeholder="ENTER PASSWORD"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    className="bg-red-900/50 border border-red-500/50 rounded-xl p-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-red-400" />
                      <span className="text-red-300 font-mono text-sm font-bold">{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isLoading || !password}
                className="w-full py-4 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 text-black font-bold text-lg rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-2 border-yellow-300"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)"
                }}
                whileTap={{ scale: 0.98 }}
                animate={isLoading ? {
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                } : {}}
                transition={isLoading ? { 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "linear"
                } : {}}
                style={{ backgroundSize: "200% 200%" }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <motion.div
                      className="w-6 h-6 border-3 border-black border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="font-mono">AUTHENTICATING...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Star className="w-6 h-6" />
                    <span className="font-mono">AUTHENTICATE</span>
                    <Star className="w-6 h-6" />
                  </div>
                )}
              </motion.button>
            </form>

            {/* Decorative Elements */}
            <div className="mt-8 pt-6 border-t border-yellow-500/20">
              <div className="flex items-center justify-center gap-4 text-yellow-600/60">
                <motion.div
                  className="w-2 h-2 bg-yellow-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-yellow-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="w-2 h-2 bg-yellow-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </div>
              <p className="text-center text-yellow-600/60 text-xs font-mono mt-4">
                VANGUARD SECURITY PROTOCOL v2.0
              </p>
            </div>
          </motion.div>

          {/* Bottom Warning */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-red-400" />
                <span className="text-red-300 font-bold text-sm font-mono">WARNING</span>
              </div>
              <p className="text-red-400/80 text-xs font-mono">
                UNAUTHORIZED ACCESS ATTEMPTS ARE MONITORED AND LOGGED
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </div>
  )
}