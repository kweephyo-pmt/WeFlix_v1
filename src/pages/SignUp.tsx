import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, Check, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react'

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const { signUp, user } = useAuth()

  if (user) {
    return <Navigate to="/home" replace />
  }

  const validatePassword = (pwd: string) => {
    return pwd.length >= 6
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      const { error } = await signUp(email, password, firstName, lastName)
      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900/50 border border-gray-800 backdrop-blur-xl p-8 md:p-12 rounded-2xl text-center max-w-lg mx-4">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-green-600 to-green-700 w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Check className="h-10 w-10 text-white" />
            </div>
            <Sparkles className="h-8 w-8 text-yellow-400 mx-auto" />
          </div>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Check Your Email!
          </h2>
          <p className="text-gray-400 text-base mb-6 leading-relaxed">
            We've sent you a confirmation email. Please check your inbox and click the confirmation link to activate your account before signing in.
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 text-sm">
              <strong>Important:</strong> You must confirm your email before you can sign in to your account.
            </p>
          </div>
          <Link
            to="/login"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Go to Sign In</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-1 flex items-center justify-center relative">
        {/* Simple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
        
        {/* Logo */}
        <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-10">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.svg" 
              alt="WeFlix" 
              className="h-12 lg:h-14 w-auto"
            />
          </Link>
        </div>

        <div className="relative z-10 bg-gray-900/50 border border-gray-800 backdrop-blur-xl p-8 lg:p-10 rounded-2xl w-full max-w-lg mx-4">
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl lg:text-4xl font-bold mb-2">
              Join WeFlix
            </h1>
            <p className="text-gray-400 text-sm lg:text-base">Start your entertainment journey today</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-gray-300 text-sm font-medium">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all duration-300 text-sm lg:text-base"
                    placeholder="John"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-gray-300 text-sm font-medium">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all duration-300 text-sm lg:text-base"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all duration-300 text-sm lg:text-base"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-300 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all duration-300 text-sm lg:text-base"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all duration-300 text-sm lg:text-base"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <p className="text-sm text-gray-300 mb-3 font-medium">Password requirements:</p>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full transition-colors ${password.length >= 6 ? 'bg-green-500' : 'bg-gray-600'}`} />
                <span className={`text-sm transition-colors ${password.length >= 6 ? 'text-green-400' : 'text-gray-400'}`}>At least 6 characters</span>
                {password.length >= 6 && <Check className="h-4 w-4 text-green-500" />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3.5 rounded-lg font-semibold text-base lg:text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              {!loading && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900/50 text-gray-400">Already have an account?</span>
              </div>
            </div>
            <Link 
              to="/login" 
              className="block w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-all duration-300 text-sm lg:text-base"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp