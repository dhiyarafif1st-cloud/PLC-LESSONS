'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../utils/supabase'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) {
        router.push('/login')
      } else {
        setUser(currentUser)
      }
    }
    checkUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-white text-blue-600 font-bold">
        Loading...
      </div>
    )
  }

  const modules = [
    {
      id: 1,
      title: "Dasar PLC",
      desc: "Hardware, I/O system, wiring, dan arsitektur kontrol industri.",
      color: "border-blue-500"
    },
    {
      id: 2,
      title: "Programming Language",
      desc: "Pemrograman sesuai standar industri (Ladder Diagram, dll).",
      color: "border-green-500"
    },
    {
      id: 3,
      title: "SCADA & HMI",
      desc: "Monitoring dan kontrol visual berbasis HMI & SCADA.",
      color: "border-purple-500"
    },
    {
      id: 4,
      title: "EcoStruxure Machine Expert",
      desc: "Simulasi tingkat lanjut dengan Factory I/O untuk realitas industri.",
      color: "border-yellow-500"
    },
  ]

  return (
    // PERBAIKAN: Hapus h-screen dan overflow-hidden agar bisa di-scroll di HP
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">

      {/* NAVBAR: Dibuat sticky agar selalu di atas saat scroll */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-3 flex justify-between items-center">
        <h1 className="text-base md:text-lg font-black tracking-tight text-blue-700 uppercase italic">
          PLC Academy ⚡
        </h1>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-[10px] md:text-xs font-semibold text-slate-500">
            {user.email}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition shadow-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

        {/* HERO SECTION: Text dibuat responsif */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 mb-3">
            Dashboard Pembelajaran
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl">
            Kelola dan lanjutkan perjalanan belajar sistem kontrol industri kamu di sini.
          </p>
        </div>

        {/* GRID MODULE: Menggunakan grid-cols-1 untuk HP agar tidak menyempit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {modules.map((m) => (
            <div
              key={m.id}
              onClick={() => router.push('/dashboard/' + m.id)}
              className={`
                group cursor-pointer bg-white rounded-2xl p-6 border-t-4 ${m.color}
                shadow-sm hover:shadow-2xl transition-all duration-300
                hover:-translate-y-2 flex flex-col justify-between min-h-[200px]
              `}
            >
              <div>
                <h4 className="text-lg md:text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition uppercase">
                  {m.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {m.desc}
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-blue-600 uppercase tracking-widest border-t pt-4">
                <span>Mulai Belajar</span>
                <svg
                  className="w-5 h-5 ml-auto transition-transform group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER SEDERHANA */}
      <footer className="py-6 text-center text-slate-400 text-[10px] uppercase tracking-widest">
        © 2026 PLC Academy - Industrial Automation Learning
      </footer>
    </div>
  )
}