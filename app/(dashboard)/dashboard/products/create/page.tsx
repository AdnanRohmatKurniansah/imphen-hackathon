import { Button } from '@/app/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import CreateProductForm from './create-form'

export const metadata: Metadata = {
  title: "Create Product | Contentify"
}

const CreateProductPage = () => {
  return (
    <div className='main'>
      <div className="flex items-center">
        <div className="flex items-center gap-2 mt-4">
          <Link href={'/dashboard/products'}>
            <Button size="sm" className="gap-1 mb-2">
              <ArrowLeftCircle className="h-3.5 w-3.5" />
              <span className="sm:whitespace-nowrap">Kembali ke list produk</span>
            </Button>
          </Link>
        </div>
      </div>
      <CreateProductForm />
    </div>
  )
}

export default CreateProductPage