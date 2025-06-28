import React from 'react';
import { X, Video, Lightbulb, Camera, Mic, Settings, CheckCircle } from 'lucide-react';

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToUseModal: React.FC<HowToUseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">How to Use - Panduan Lengkap</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Quick Start Guide */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Video className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Panduan Cepat</h3>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Langkah 1:</strong> Isi subjek utama dan karakteristiknya (contoh: "Pedagang pasar tradisional yang ramah")</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Langkah 2:</strong> Pilih aksi dan emosi yang sesuai dengan cerita Anda</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Langkah 3:</strong> Tentukan lokasi, waktu, dan cuaca untuk menciptakan atmosfer</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Langkah 4:</strong> Atur sinematografi (gaya, kamera, pencahayaan)</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700"><strong>Langkah 5:</strong> Tambahkan dialog dan audio sesuai kebutuhan</p>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Camera className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Best Practices untuk Prompt Berkualitas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✨ Kualitas Visual</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Gunakan istilah seperti "high quality lighting"</li>
                    <li>• Pilih "cinematic style" untuk hasil profesional</li>
                    <li>• Tambahkan "slow motion" untuk efek dramatis</li>
                    <li>• Spesifikasikan kualitas "4K ultra sharp"</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">🎬 Sinematografi</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Kombinasikan pencahayaan dan color grading</li>
                    <li>• Gunakan pergerakan kamera yang sesuai mood</li>
                    <li>• Pilih sudut kamera untuk efek yang diinginkan</li>
                    <li>• Sesuaikan focal length dengan jenis shot</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Example Use Cases */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Mic className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Contoh Penggunaan</h3>
              </div>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🎭 Video Cerita Berkelanjutan</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Untuk membuat beberapa scene dengan cerita yang berkesinambungan:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Susun deskripsi secara kronologis</li>
                    <li>• Jaga konsistensi karakter dan subjek</li>
                    <li>• Gunakan transisi waktu yang jelas (pagi → siang → sore)</li>
                    <li>• Pertahankan gaya visual yang sama</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🌅 Membangun Mood dengan Audio</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Gunakan kombinasi elemen audio untuk menciptakan suasana:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Pencahayaan + musik + efek suara = mood yang kuat</li>
                    <li>• Contoh: "Dramatis yang intens" + "Epic orchestral" + "Hujan yang menyejukkan"</li>
                    <li>• Sesuaikan volume mixing untuk keseimbangan audio</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🗣️ Dialog dengan Dialek Regional</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Saat menggunakan dialek daerah:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Pastikan dialog sesuai dengan konteks budaya lokal</li>
                    <li>• Gunakan karakter yang relevan dengan setting</li>
                    <li>• Contoh: Pedagang pasar + Bahasa Jawa + "Sugeng enjang, pripun kabare?"</li>
                    <li>• Sesuaikan emosi dengan budaya setempat</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Advanced Tips */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Settings className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Tips Lanjutan</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">🎯 Menggunakan AI Suggestions</h4>
                  <p className="text-sm text-gray-600">Klik tombol lampu (💡) di setiap field untuk mendapatkan saran AI yang relevan dengan konteks Indonesia.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">➕ Custom Options</h4>
                  <p className="text-sm text-gray-600">Gunakan tombol "+" untuk menambahkan opsi custom yang tidak tersedia di daftar default.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">🔧 Audio Mixing</h4>
                  <p className="text-sm text-gray-600">Aktifkan pengaturan audio mixing untuk kontrol volume yang lebih detail dan profesional.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">🌍 Output Bilingual</h4>
                  <p className="text-sm text-gray-600">Prompt akan dihasilkan dalam Bahasa Indonesia dan otomatis diterjemahkan ke Bahasa Inggris untuk kompatibilitas dengan AI tools internasional.</p>
                </div>
              </div>
            </section>

            {/* Compatible Tools */}
            <section>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">🚀 Kompatibel dengan AI Tools</h4>
                <p className="text-sm text-gray-600 mb-2">Prompt yang dihasilkan dapat digunakan dengan:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Runway ML</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Pika Labs</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Luma AI</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Stable Video</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Gen-2</span>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                💡 Tip: Eksperimen dengan kombinasi berbeda untuk hasil yang unik!
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Mulai Membuat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUseModal;