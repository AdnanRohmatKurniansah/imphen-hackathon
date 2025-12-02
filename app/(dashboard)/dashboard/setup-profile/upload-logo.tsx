"use client"

import { useState, useEffect, useRef } from "react"
import { createClientSupabase } from "@/app/utils/supabase/client"
import { toast } from "sonner"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"

interface Props {
  userId: string | undefined
  existingLogo?: string | null
}

const UploadLogo = ({ userId, existingLogo }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(existingLogo || null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (existingLogo) setPreview(existingLogo)
  }, [existingLogo])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const uploadLogo = async () => {
    if (!file) {
      toast.error("Pilih file gambar terlebih dahulu")
      return
    }

    try {
      setUploading(true)

      const supabase = createClientSupabase()

      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}.${fileExt}`
      const filePath = `umkm_logos/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from("umkm_storage")
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        toast.error("Gagal upload file")
        console.log(uploadError)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from("umkm_storage")
        .getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from("umkm_profile")
        .update({ logo_url: publicUrl })
        .eq("user_id", userId)

      if (updateError) {
        toast.error("Gagal menyimpan URL logo ke database")
        return
      }

      toast.success("Logo berhasil diupload & disimpan!")

    } catch (err) {
      console.log(err)
      toast.error("Upload gagal!")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
        <div className="border rounded-xl p-4 bg-white shadow-sm w-full">
        <h3 className="font-semibold mb-7 text-sm">Logo UMKM</h3>

        <div className="flex flex-col items-center gap-3 text-center">
            <div className="cursor-pointer" onClick={() => inputRef.current?.click()}>
            {preview ? (
                <Image
                    src={preview}
                    alt="Preview"
                    width={200}
                    height={250}
                    className="rounded-lg border object-cover transition hover:opacity-80"
                />
            ) : (
                <div className="w-28 h-28 border rounded-lg flex items-center justify-center text-xs text-gray-500 hover:opacity-80 cursor-pointer">
                    Belum ada logo
                </div>
            )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            <Button onClick={uploadLogo} disabled={uploading || !file} className="mt-5 w-full">
            {uploading ? "Uploading..." : "Upload Logo"}
            </Button>
        </div>
        </div>
    </div>
  )
}

export default UploadLogo
