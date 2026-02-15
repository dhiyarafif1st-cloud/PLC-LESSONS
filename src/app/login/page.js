'use client' // Wajib untuk fitur interaktif seperti tombol
import Link from 'next/link';
import { useState } from 'react'
import { createClient } from '../utils/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Gagal login: " + error.message)
    } else {
      alert("Login berhasil! Selamat datang di Portal PLC.")
      window.location.href = '/dashboard' // Pindah ke halaman depan
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login Portal PLC</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {loading ? 'Mohon Tunggu...' : 'Masuk'}
          </button>
          
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
Belum punya akun? <Link href="/register" className="text-blue-600 font-bold hover:underline">Daftar di sini</Link>
</p>
      </div>
    </div>
  )
}