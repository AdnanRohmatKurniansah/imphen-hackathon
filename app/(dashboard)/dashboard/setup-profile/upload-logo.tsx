"use client"

import { useState, useEffect, useRef } from "react"
import { createClientSupabase } from "@/app/utils/supabase/client"
import { toast } from "sonner"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"

const UploadLogo = ({ userId }: { userId: string }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const supabase = createClientSupabase()

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await supabase
        .from("umkm_profile")
        .select("logo_url")
        .eq("user_id", userId)
        .single()

      if (data?.logo_url) setPreview(data.logo_url)
    }

    getProfile()
  }, [userId, supabase])

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

      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}.${fileExt}`
      const filePath = `umkm_logos/${fileName}`

      const { data: profile } = await supabase
        .from("umkm_profile")
        .select("logo_url")
        .eq("user_id", userId)
        .single()

      if (profile?.logo_url) {
        const url = profile.logo_url
        const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL
        const oldPath = url.replace(baseUrl, "")
        if (oldPath) {
          await supabase.storage.from("umkm_storage").remove([oldPath])
        }
      }

      const { error: uploadError } = await supabase.storage
        .from("umkm_storage")
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        toast.error("Gagal mengupload file")
        console.log(uploadError)
        return
      }

      const { data: urlData } = supabase.storage
        .from("umkm_storage")
        .getPublicUrl(filePath)

      if (!urlData?.publicUrl) {
        toast.error("Gagal mengambil URL public")
        return
      }

      const { error: updateError } = await supabase
        .from("umkm_profile")
        .update({ logo_url: urlData.publicUrl })
        .eq("user_id", userId)

      if (updateError) {
        toast.error("Gagal menyimpan URL logo ke database")
        console.log(updateError)
        return
      }

      setPreview(urlData.publicUrl)
      toast.success("Logo berhasil diupload & disimpan!")

    } catch (err) {
      console.log(err)
      toast.error("Upload gagal!")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm w-full">
      <h3 className="font-semibold mb-7 text-sm">Logo UMKM</h3>

      <div className="flex flex-col items-center gap-3 text-center">
        <div className="cursor-pointer" onClick={() => inputRef.current?.click()}>
          {preview ? (
            <Image
              src={preview}
              alt="Logo UMKM"
              width={200}
              height={200}
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
  )
}

export default UploadLogo
