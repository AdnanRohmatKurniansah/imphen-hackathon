import { Metadata } from "next"
import { SaveIcon } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { createServerSupabase } from "@/app/utils/supabase/server"
import { redirect } from "next/navigation"
import HistoryPoster from "./histori-poster"
import { getUmkmProfile } from "@/app/service/umkmProfileService"

export const metadata: Metadata = {
  title: "Histori Generate Poster | NexaAI"
}

const ProductPage = async () => {
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
            <SaveIcon className="h-3.5 w-3.5" />
            <span className="sm:whitespace-nowrap">
              Histori Poster
            </span>
          </Button>
        </div>
      </div>
      <HistoryPoster userId={user?.id} />  
    </div>
  )
}

export default ProductPage
