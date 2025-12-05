import { Metadata } from "next"
import { ChartArea } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import GenerateForm from "./generate-form"
import { redirect } from "next/navigation"
import { createServerSupabase } from "@/app/utils/supabase/server"

export const metadata: Metadata = {
  title: "Buat Konten UMKM Anda dengan Mudah | NexaAI"
}

const KontenAIPage = async () => {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="main-content">
      <div className="flex items-center">
        <div className="flex items-center gap-2 mt-4">
          <Button size="sm" className="gap-1 mb-3">
            <ChartArea className="h-3.5 w-3.5" />
            <span className="sm:whitespace-nowrap">Konten Otomatis, Hasil Maksimal</span>
          </Button>
        </div>
      </div>

      <Card className="mb-8 md:mb-0">
        <CardHeader>
          <CardTitle className="text-lg">Konten Siap Pakai untuk UMKM</CardTitle>
          <CardDescription>
            Hasilkan caption, deskripsi produk, dan materi promosi secara instan menggunakan kecerdasan buatan.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <GenerateForm userId={user.id} />
        </CardContent>
      </Card>
    </div>
  )
}

export default KontenAIPage
