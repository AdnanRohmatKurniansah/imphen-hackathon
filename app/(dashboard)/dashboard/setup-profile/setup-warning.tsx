"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/app/components/ui/dialog"

import { Button } from "@/app/components/ui/button"
import { useRouter } from "next/navigation"

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
}

const SetupWarningModal = ({ open, onOpenChange }: Props) => {
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-red-600">Profil UMKM Belum Dibuat</DialogTitle>
          <DialogDescription>
            Kamu harus melengkapi profil UMKM sebelum melanjutkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Buat Profil Sekarang
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SetupWarningModal
