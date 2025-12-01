import React from 'react'
import { MessageSquareText, MessageSquareQuote, PictureInPicture, Shield, Clock, Users } from 'lucide-react'
import { Badge } from '@/app/components/ui/badge'

export function Service() {

  const steps = [
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

  const features = [
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
    <section className="py-20 px-8 bg-[#fdfdfd] relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge className="mb-3 px-2 py-1 bg-[#4741F5]/10 text-[#4741F5] border-[#4741F5]/30 shadow-sm">
            ⭐ Solusi Cepat untuk UMKM
          </Badge>
          <h2 className="text-[30px] md:text-[35px] font-bold text-gray-900 mb-3">
            Fitur Unggulan Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tools otomatis untuk mempercepat pembuatan konten dan desain usaha Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 md:mb-40">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-5 w-80 h-80 bg-[#4741F5]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-50 -left-30 z-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
          </div>
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                  
                  <div className={`${step.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
                    <Icon className={`w-7 h-7 ${step.iconColor}`} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-br relative z-50 from-white to-gray-50 rounded-3xl shadow-xl border border-gray-200 p-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Why Choose Us?</h3>
            <p className="text-lg text-gray-600">
              Dibuat khusus untuk membantu UMKM meningkatkan branding & penjualan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className={`${feature.bgColor} w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-md`}>
                    <Icon className={`w-10 h-10 ${feature.iconColor}`} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
