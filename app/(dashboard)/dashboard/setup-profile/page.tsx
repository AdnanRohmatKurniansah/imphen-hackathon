import { Metadata } from "next"
import SetupForm from "./setup-form"
import { ChartArea } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import UploadLogo from "./upload-logo"
import { createServerSupabase } from "@/app/utils/supabase/server"

export const metadata: Metadata = {
  title: "Isi Profile UMKM | AmbaApp"
} 

const SetupProfilePage = async () => {
   const supabase = await createServerSupabase()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("umkm_profiles")
    .select("*")
    .eq("user_id", user?.id)
    .single()

  return (
    <div className='main-content'>
      <div className="flex items-center">
        <div className="flex items-center gap-2 mt-4">
          <Button size="sm" className="gap-1 mb-3">
            <ChartArea className="h-3.5 w-3.5" />
            <span className="sm:whitespace-nowrap">
              Profile UMKM Anda
            </span>
          </Button>
        </div>
      </div>
      <Card className='mb-8 md:mb-0'>
        <CardHeader>
          <CardTitle className='text-lg'>Lengkapi Profil UMKM Anda</CardTitle>
          <CardDescription>
            Masukkan informasi usaha Anda agar dapat memaksimalkan penggunaan dashboard dan layanan kami.
          </CardDescription>
        </CardHeader> 

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SetupForm />
            <UploadLogo 
              userId={user?.id}
              existingLogo={profile?.logo_url}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SetupProfilePage