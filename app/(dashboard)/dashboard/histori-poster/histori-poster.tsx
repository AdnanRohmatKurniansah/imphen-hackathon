"use client";

import { useEffect, useState } from "react";
import {
  Card, CardContent, CardHeader, CardTitle,
  CardFooter, CardDescription
} from "@/app/components/ui/card";
import {
  Table, TableHeader, TableBody, TableRow,
  TableCell, TableHead
} from "@/app/components/ui/table";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import Pagination from "@/app/components/shared/pagination";
import DeleteConfirmationDialog from "@/app/components/shared/delete-modal";
import { Skeleton } from "@/app/components/ui/skeleton";
import { getPosters, deletePoster } from "@/app/service/posterService";
import { getUmkmProfile } from "@/app/service/umkmProfileService";

interface Poster {
  id: string;
  headline: string;
  image_url: string;
  created_at: string;
}

interface Props {
  userId: string;
}

const HistoryPoster = ({ userId }: Props) => {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const limit = 10;

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await getUmkmProfile(userId);
      if (error || !data) {
        toast.error("Profil UMKM tidak ditemukan");
        return;
      }
      setProfileId(data.id);
    };

    fetchProfile();
  }, [userId]);

  useEffect(() => {
    if (!profileId) return;

    const loadPosters = async () => {
      try {
        setLoading(true);
        const { data, total } = await getPosters(profileId, page, limit);
        setPosters(data);
        setTotal(total);
      } catch (err) {
        toast.error("Gagal mengambil data poster");
      } finally {
        setLoading(false);
      }
    };

    loadPosters();
  }, [profileId, page]);

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      await deletePoster(selectedId);
      toast.success("Poster berhasil dihapus");
      setOpenDialog(false);

      if (profileId) {
        const { data, total } = await getPosters(profileId, page, limit);
        setPosters(data);
        setTotal(total);
      }

    } catch (err) {
      toast.error("Gagal menghapus poster");
    }
  };

  const getImageSrc = (data: string) => {
    if (!data) return "/placeholder.png";

    if (data.startsWith("data:image")) return data;

    return `data:image/png;base64,${data}`;
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Histori Poster</CardTitle>
        <CardDescription>Riwayat poster yang pernah Anda generate.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 md:hidden">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <Skeleton className="w-full h-36 mb-3 rounded" />
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-4 w-24 mb-2" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </div>
              </div>
            ))
          ) : posters.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Belum ada poster</p>
          ) : (
            posters.map((p) => (
              <div key={p.id} className="border rounded-xl p-4 bg-gray-50">
                <Image
                  src={getImageSrc(p.image_url)}
                  alt={p.headline}
                  width={400}
                  height={400}
                  className="w-full h-36 object-cover rounded-lg mb-4"
                />

                <p className="font-semibold">{p.headline}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(p.created_at).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-4">
                  <Link href={`/dashboard/poster/edit/${p.id}`} className="flex-1">
                    <Button size="sm" className="w-full">Edit</Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      setSelectedId(p.id);
                      setOpenDialog(true);
                    }}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Headline</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="w-20 h-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-14" />
                        <Skeleton className="h-8 w-14" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : posters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-5">
                    Belum ada poster
                  </TableCell>
                </TableRow>
              ) : (
                posters.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <Image
                        src={getImageSrc(p.image_url)}
                        alt={p.headline}
                        width={70}
                        height={70}
                        className="rounded"
                      />
                    </TableCell>
                    <TableCell>{p.headline}</TableCell>
                    <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/histori-poster/detail/${p.id}`}>
                            <Button size="sm">Detail</Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setSelectedId(p.id);
                            setOpenDialog(true);
                          }}>
                          Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter>
        <Pagination page={page} total={total} limit={limit} onPageChange={setPage} />
      </CardFooter>

      <DeleteConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        isLoading={false}
      />
    </Card>
  );
};

export default HistoryPoster;
