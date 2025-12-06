import { Metadata } from "next"
import { ChartArea } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { redirect } from "next/navigation"
import { createServerSupabase } from "@/app/utils/supabase/server"
import GeneratePoster from "./generate-poster"

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
            <span className="sm:whitespace-nowrap">Buat Poster Menarik dalam Hitungan Detik</span>
          </Button>
        </div>
      </div>

      <Card className="mb-8 md:mb-0">
        <CardHeader>
          <CardTitle className="text-lg">Poster Siap Pakai untuk UMKM</CardTitle>
          <CardDescription>
            Desain poster otomatis dengan bantuan AI untuk promosi, branding, dan kebutuhan visual UMKM Anda.
          </CardDescription>
        </CardHeader>

        <CardContent>
            <GeneratePoster userId={user.id} />
        </CardContent>
      </Card>
    </div>
  )
}

export default KontenAIPage
