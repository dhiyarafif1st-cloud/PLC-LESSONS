export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Tentang Saya</h1>
      <div className="max-w-2xl text-center bg-white p-6 rounded-2xl shadow-md">
        <p className="text-lg text-gray-700 leading-relaxed">
          Halo! Saya adalah pengembang di balik PLC Academy. 
          Visi saya adalah memudahkan rekan-rekan untuk belajar otomatisasi industri dengan cara yang lebih modern.
        </p>
      </div>
    </div>
  )
}