import React from 'react'
import { MessageSquareText, MessageSquareQuote, PictureInPicture, Shield, Clock, Users } from 'lucide-react'
import { Badge } from '@/app/components/ui/badge'

export function Service() {
  const feature = [
    {
      icon: MessageSquareText,
      title: 'Caption Generator',
      description: 'Buat caption Instagram & Facebook yang menarik dan relevan untuk audiens.',
      bgColor: 'bg-[#EFEAFF]',   
      iconColor: 'text-[#6B4EFF]',
    },
    {
      icon: MessageSquareQuote,
      title: 'WA Copywriting',
      description: 'Tulis pesan broadcast WhatsApp yang personal, persuasif, dan siap kirim.',
      bgColor: 'bg-[#E7FBEA]',    
      iconColor: 'text-[#31B960]',
    },
    {
      icon: PictureInPicture,
      title: 'Poster Generator',
      description: 'Desain poster promosi otomatis dengan layout profesional dan rapi.',
      bgColor: 'bg-[#FFF4E2]',    
      iconColor: 'text-[#FA8A00]',
    }
  ]

  const why = [
    {
      icon: Shield,
      title: 'Akurasi Tinggi',
      description: 'Model yang dioptimalkan menghasilkan output yang konsisten dan relevan.',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Clock,
      title: 'Cepat & Efisien',
      description: 'Semua konten dapat dibuat hanya dalam hitungan detik tanpa rumit.',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Users,
      title: 'Kualitas Konsisten',
      description: 'Setiap hasil konten dan desain dibuat dengan standar profesional.',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600'
    }
  ]

  return (
    <section id='fitur' className="py-20 px-8 bg-[#fdfdfd] relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge className="mb-3 px-2 py-1 bg-[#4741F5]/10 text-[#4741F5] border-[#4741F5]/30 shadow-sm">
            ⭐ Solusi Cepat untuk UMKM
          </Badge>
          <h2 className="text-[25px] md:text-[30px] font-bold text-gray-900 mb-3">
            Fitur Unggulan Kami
          </h2>
          <p className="text-[15px] md:text-[17px] text-gray-600 max-w-3xl mx-auto">
            Tools otomatis untuk mempercepat pembuatan konten dan desain usaha Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 md:mb-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-5 w-80 h-80 bg-[#4741F5]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-50 -left-30 z-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
          </div>
          {feature.map((feat, index) => {
            const Icon = feat.icon
            return (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-all duration-300">
                  
                  <div className={`${feat.bgColor} w-10 md:w-14 h-10 md:h-14 rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
                    <Icon className={`w-6 md:w-8 h-6 md:h-8 ${feat.iconColor}`} />
                  </div>
                  <h3 className="text-[18px] md:text-xl font-semibold text-gray-900 mb-2">{feat.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-transparent md:bg-gradient-to-br relative overflow-hidden z-10 from-white to-gray-50 rounded-3xl shadow-none md:shadow-md border border-transparent md:border-gray-200 px-0 py-0 md:px-10 py-15">
          <div className="absolute -top-50 md:-top-30 right-5 md:-right-20 w-60 h-60 bg-[#4741F5]/10 rounded-full blur-3xl"></div>
          <div className="text-center mb-12">
            <Badge className="mb-3 px-2 py-1 bg-[#4741F5]/10 text-[#4741F5] border-[#4741F5]/30 shadow-sm">
              ⭐ Solusi Cepat untuk UMKM
            </Badge>
            <h3 className="text-[25px] md:text-[30px] font-bold text-gray-900 mb-3">Why Choose Us?</h3>
            <p className="text-[15px] md:text-[17px] text-gray-600">
              Dibuat khusus untuk membantu UMKM meningkatkan branding & penjualan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {why.map((wh, index) => {
              const Icon = wh.icon
              return (
                <div key={index} className="group flex items-center gap-5 md:block md:text-center p-4 md:p-0 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white bg-white md:bg-transparent shadow-sm md:shadow-none">
                  <div className={`${wh.bgColor} w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 mx-auto mb-3`}>
                    <Icon className={`w-6 h-6 md:w-8 md:h-8 ${wh.iconColor}`} />
                  </div>

                  <div className="text-left md:text-center">
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">
                      {wh.title}
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base">
                      {wh.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
