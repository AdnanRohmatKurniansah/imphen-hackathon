import { Metadata } from "next"
import { PlusCircle } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import ProductTable from "./product-table"
import { createServerSupabase } from "@/app/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Products Management | Contentify"
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
          <Button size="sm" className="mb-2 px-3">
            <Link className="flex items-center justify-center" href={'/dashboard/products/create'}>
              <span className="sm:whitespace-nowrap">Tambahkan produk baru</span>
              <PlusCircle className="pl-1 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <ProductTable userId={user?.id} />  
    </div>
  )
}

export default ProductPage
