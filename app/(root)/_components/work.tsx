import { Badge } from "@/app/components/ui/badge"
import { FileText, Sparkles, Share2 } from "lucide-react"

export function Work() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Masukkan Detail Produk",
      description: "Tuliskan deskripsi singkat tentang produk atau layanan yang ingin Anda promosikan.",
      iconBg: "bg-[#EFEAFF]",
      hoverBg: "hover:bg-[#E5DDFF]",
      iconColor: "text-[#6B4EFF]",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "AI Buat Konten Otomatis",
      description: "AI menghasilkan beberapa pilihan caption, copywriting, hingga ide visual dalam hitungan detik.",
      iconBg: "bg-[#E7FBEA]",
      hoverBg: "hover:bg-[#D9F8DF]",
      iconColor: "text-[#31B960]",
    },
    {
      number: "03",
      icon: Share2,
      title: "Download & Posting",
      description: "Pilih konten terbaik, download, setelah itu langsung posting ke media sosial Anda.",
      iconBg: "bg-[#FFF4E2]",
      hoverBg: "hover:bg-[#FFEACC]",
      iconColor: "text-[#FA8A00]",
    },
  ]

  return (
    <section id="cara-kerja" className="py-20 px-8 bg-[#f6f8fa] relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-12">
          <Badge className="mb-3 px-2 py-1 bg-[#4741F5]/10 text-[#4741F5] border-[#4741F5]/30 shadow-sm">
            ⭐ Solusi Cepat untuk UMKM
          </Badge>
          <h2 className="text-[25px] md:text-[30px] font-bold text-gray-900 mb-3">
            Cara Kerja yang Mudah
          </h2>
          <p className="text-[15px] md:text-[17px] text-gray-600 max-w-3xl mx-auto">
            Tiga langkah sederhana untuk membuat konten promosi berkualitas tinggi
          </p>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
            <div className="hidden md:block absolute top-[30px] left-1/2 -translate-x-1/2 w-full pointer-events-none">
                <div className="mx-auto w-[calc(100%-350px)] h-[3px] bg-gray-200"></div>
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-30 -left-15 w-60 h-60 bg-[#4741F5]/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-50 -right-10 z-10 w-50 h-50 bg-purple-300/30 rounded-full blur-3xl"></div>
            </div>
            {steps.map((step, index) => {
                const Icon = step.icon
                return (
                <div key={index} className="relative flex flex-col items-center text-center group transition-all">
                    <div className={`${step.iconBg} ${step.hoverBg} w-12 h-12 md:w-16 md:h-16 rounded-full hidden md:flex items-center justify-center shadow-md relative z-10 transition-all duration-300 group-hover:scale-110`}>
                        <Icon className={`w-8 h-8 ${step.iconColor}`} />
                    </div>
                    <span className="mt-4 hidden md:flex text-sm font-bold text-[#4741F5] tracking-wider">
                        STEP 0{index + 1}
                    </span>
                    <div className="mt-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-7 w-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                        <div className={`${step.iconBg} ${step.hoverBg} w-10 h-10 rounded-full flex md:hidden mx-auto items-center justify-center shadow-md relative z-10 transition-all duration-300 group-hover:scale-110`}>
                            <Icon className={`w-6 h-6 ${step.iconColor}`} />
                        </div>
                        <span className="mt-4 mb-1 flex justify-center md:hidden text-sm font-bold text-[#4741F5] tracking-wider">
                            STEP 0{index + 1}
                        </span>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
                    </div>
                </div>
                )
            })}
        </div>
      </div>
    </section>
  )
}
