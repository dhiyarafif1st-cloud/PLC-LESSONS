'use client'
import Link from 'next/link';
import { useState } from 'react'
import { createClient } from '../utils/supabase'

export default function RegisterPage() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Registrasi berhasil! Silakan cek email untuk verifikasi, tidakusah verivikasi lagi dimatikan.')
      setEmail('')
      setPassword('')
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-black">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Daftar Akun PLC
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Daftar'}
          </button>

          <Link href="/login">
          <div className="flex justify-center mt-2">
            <button
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50" 
            >Back To Login
            </button>
            </div>
          </Link>



        </form>




        {message && (
          <p className="mt-4 text-center text-sm text-red-500">
            {message}

          </p>
        )}
      </div>
    </div>
  )
}
