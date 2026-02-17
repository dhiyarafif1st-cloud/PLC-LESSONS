'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
// ... (import supabase di bagian atas file)
 import { createClient } from '../../utils/supabase'

export default function DetailMateriPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  // Inisialisasi client Supabase di dalam komponen
  const supabase = createClient() 

  const [komentar, setKomentar] = useState([]);
  const [nama, setNama] = useState("");
  const [inputKomentar, setInputKomentar] = useState("");

// Fungsi untuk ambil data
async function fetchKomentar() {
  const { data } = await supabase
    .from('komentar')
    .select('*')
    .eq('materi_id', id)
    .order('created_at', { ascending: false });
  setKomentar(data || []);
}

// Fungsi untuk kirim data
async function kirimKomentar() {
  await supabase.from('komentar').insert([
    { materi_id: id, nama: nama, isi_komentar: inputKomentar }
  ]);
  setInputKomentar(""); // reset input
  fetchKomentar(); // refresh daftar
}


  const kontenMateri = {
    "1": {
      judul: "Dasar-Dasar PLC & Hardware",
      videoUrl: "https://drive.google.com/file/d/1clSYmvUiIs4kmondwKyMbfwdaZmmUz7x/preview",
      deskripsi:
        "PLC (Programmable Logic Controller) adalah komputer elektronik yang dirancang khusus untuk bekerja di lingkungan industri. Pada modul ini, kita mempelajari PLC, pengenalan Softwere, serta modul Input dan Output.",
      poin: [
        "Pengenalan PLC",
        "Cara Kerja PLC",
        "Input/Output",
        "Pengenalan PLC Softwere"
      ]
    },
    // "2": {
    //   judul: "Pemrograman Ladder Diagram",
    //   videoUrl: "https://www.youtube.com/embed/7z0VYpRjTgE",
    //   deskripsi:
    //     "Ladder Diagram (LD) adalah bahasa pemrograman PLC yang menyerupai rangkaian listrik berbasis relay. Modul ini membahas konsep dasar hingga implementasi logika kontrol sederhana.",
    //   poin: [
    //     "Kontak Normally Open (NO)",
    //     "Kontak Normally Closed (NC)",
    //     "Output Coil dan Latching"
    //   ]
      
    // },
    // "3": {
    //   judul: "Sistem SCADA & HMI",
    //   videoUrl: "", // Ganti dengan URL video kamu
    //   deskripsi:
    //     "SCADA dan HMI digunakan untuk memonitor dan mengontrol proses industri secara visual. Modul ini menjelaskan cara menghubungkan interface grafis dengan kontroler PLC.",
    //   poin: [
    //     "Pengenalan Human Machine Interface",
    //     "Komunikasi Data PLC ke SCADA",
    //     "Desain Dashboard Monitoring"
    //   ]
    // },
    
  }

  const materi =
    kontenMateri[id] || {
      judul: "Materi Belum Tersedia",
      deskripsi: "Konten untuk materi ini sedang dalam tahap penyusunan.",
      poin: []
    }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-lg">

        {/* Back Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="mb-10 text-blue-600 font-semibold hover:text-blue-800 transition flex items-center gap-2"
        >
          ← Kembali ke Dashboard
        </button>

        {/* Judul */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 leading-tight">
          {materi.judul}
        </h1>

        {/* Deskripsi */}
        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
          {materi.deskripsi}
        </p>

        {/* Poin Materi */}
        {materi.poin.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Poin Pembahasan:
            </h2>
            <ul className="space-y-3">
              {materi.poin.map((item, index) => (
                <li
                  key={index}
                  className="bg-blue-50 border border-blue-100 px-4 py-3 rounded-lg text-gray-700"
                >
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Video Section */}
        {materi.videoUrl && (
          <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
            <iframe
              src={materi.videoUrl}
              title="Video Pembelajaran"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}
        <hr className="my-10" />

        {/* --- Tampilan Komentar --- */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Diskusi Materi</h2>
          
          <form onSubmit={kirimKomentar} className="space-y-4 mb-10">
            <input 
              type="text" placeholder="Nama Anda" value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea 
              placeholder="Tulis diskusi..." value={inputKomentar}
              onChange={(e) => setInputKomentar(e.target.value)}
              className="w-full p-3 border rounded-xl h-24 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">Kirim</button>
          </form>

          <div className="space-y-4">
            {komentar.map((k) => (
              <div key={k.id} className="bg-gray-50 p-4 rounded-xl border">
                <p className="font-bold text-blue-600">{k.nama}</p>
                <p className="text-gray-700">{k.isi_komentar}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      </div>
    
    
  )
}
