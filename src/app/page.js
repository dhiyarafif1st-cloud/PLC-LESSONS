import Link from 'next/link';
export default function HomePage() {
  return (
    
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-20 px-6 text-center overflow-hidden">
        
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Belajar PLC Automation
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10">
            Kuasai Ladder Logic, HMI, dan konsep Industri 4.0 dari dasar hingga mahir.
          </p>
          <Link href="/login">
          <button className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition duration-300 shadow-lg hover:shadow-xl">
             Mulai Belajar
          </button>
          </Link>
          
        </div>
        <div className="absolute top-4 left-4">
  <Link href="/about">
    <button className="bg-white/80 backdrop-blur-sm border border-gray-200 text-blue-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white transition duration-300 shadow-sm">
      About Me
    </button>
  </Link>
</div>
      </header>

      {/* Section Title */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Materi Pembelajaran
          </h2>
          <p className="text-gray-500">
            Kurikulum dirancang sesuai kebutuhan industri otomasi modern.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-blue-600">
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Dasar PLC
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Memahami hardware PLC, sistem input-output, wiring diagram,
              dan arsitektur kontrol industri.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-green-600">
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Ladder Logic
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Mempelajari pemrograman diagram tangga sesuai standar industri
              untuk sistem kontrol otomatis.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              SCADA & HMI
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Mendesain sistem monitoring dan kontrol visual berbasis HMI
              dan SCADA untuk industri.
            </p>
          </div>

        </div>
      </section>
    </div>
    
  )
}
