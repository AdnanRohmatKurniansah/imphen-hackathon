import { Badge } from "@/app/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion"

const questions = [
  { 
    question: "Apa itu platform ini dan bagaimana cara kerjanya untuk membantu UMKM?", 
    answer: "Platform ini membantu UMKM membuat konten promosi otomatis dengan memasukkan deskripsi produk, lalu sistem menghasilkan berbagai ide konten secara instan." 
  },
  { 
    question: "Apakah layanan ini gratis dan apa perbedaan antara versi gratis dan premium?", 
    answer: "Versi gratis memungkinkan pembuatan beberapa konten per hari, sementara versi premium memberikan akses tanpa batas dan fitur tambahan untuk kebutuhan bisnis." 
  },
  { 
    question: "Konten apa saja yang dapat dihasilkan dan apakah konten tersebut siap digunakan di media sosial?", 
    answer: "Platform menghasilkan caption, copywriting, ide visual, dan rekomendasi posting yang siap digunakan langsung untuk promosi di media sosial." 
  },
  { 
    question: "Apakah data produk saya aman dan bagaimana platform menjaga kerahasiaannya?", 
    answer: "Semua data disimpan dengan standar enkripsi industri dan tidak dibagikan kepada pihak luar, sehingga privasi dan keamanan informasi tetap terjaga." 
  },
  { 
    question: "Apakah saya perlu memiliki kemampuan desain atau pemasaran untuk menggunakan platform ini?", 
    answer: "Tidak perlu. Sistem dirancang agar mudah digunakan bahkan oleh pemula, tanpa harus memiliki kemampuan desain atau pengalaman pemasaran." 
  }
]


export function Faq() {
  return (
    <section id="faq" className="py-20 px-8 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-12">
          <Badge className="mb-3 px-2 py-1 bg-[#4741F5]/10 text-[#4741F5] border-[#4741F5]/30 shadow-sm">
            ⭐ Solusi Cepat untuk UMKM
          </Badge>
          <h2 className="text-[25px] md:text-[30px] font-bold text-gray-900 mb-3">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-[15px] md:text-[17px] text-gray-600 max-w-3xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang layanan kami
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-40 -left-52 w-60 h-60 bg-[#4741F5]/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-50 -right-10 z-10 w-50 h-50 bg-purple-300/30 rounded-full blur-3xl"></div>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {questions.map((question, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-[15px] md:text-[17px] font-semibold hover:no-underline">
                  {question.question}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] md:text-[17px] text-muted-foreground">
                  {question.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
