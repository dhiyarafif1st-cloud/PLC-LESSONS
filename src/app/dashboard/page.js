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
      title: "programming language",
      desc: "Pemrograman sesuai standar industri.",
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
      title: "EcoStruxure Machine Expert Basic X factory I/O",
      desc: "Simulasi seperti real di industri.",
      color: "border-yellow-500"
    },
  ]

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">

      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">
        <h1 className="text-lg font-black tracking-tight text-blue-700 uppercase italic">
          PLC Academy ⚡
        </h1>

        <div className="flex items-center gap-4">
          <span className="hidden md:block text-xs font-semibold text-slate-500">
            {user.email}
          </span>
          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col justify-center px-8 max-w-7xl mx-auto w-full">

        {/* HERO */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
            Dashboard Pembelajaran
          </h2>
          <p className="text-slate-500 text-sm">
            Kelola dan lanjutkan perjalanan belajar sistem kontrol industri.
          </p>
        </div>

        {/* GRID MODULE */}
        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((m) => (
            <div
              key={m.id}
              onClick={() => router.push('/dashboard/' + m.id)}
              className={`
                group cursor-pointer bg-white rounded-2xl p-6 border-t-4 ${m.color}
                shadow-md hover:shadow-xl transition-all duration-300
                hover:-translate-y-1 flex flex-col justify-between
              `}
            >
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition">
                  {m.title}
                </h4>
                <p className="text-slate-500 text-sm mb-6">
                  {m.desc}
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-blue-600 uppercase tracking-wider">
                <span>Pelajari</span>
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

      </div>
    </div>
  )
}
