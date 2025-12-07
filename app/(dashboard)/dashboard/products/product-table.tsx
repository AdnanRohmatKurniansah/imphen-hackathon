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
import { deleteProduct, getProducts } from "@/app/service/productService";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import Pagination from "@/app/components/shared/pagination";
import { UmkmProduct } from "@/app/types";
import DeleteConfirmationDialog from "@/app/components/shared/delete-modal";
import { Skeleton } from "@/app/components/ui/skeleton";

interface ProductTableProps { userId: string }

const ProductTable = ({ userId }: ProductTableProps) => {
  const [products, setProducts] = useState<UmkmProduct[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const limit = 10;

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data, total } = await getProducts(userId, page, limit);
      setProducts(data);
      setTotal(total);
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts() }, [page]);

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteProduct(selectedId);
      toast.success("Produk berhasil dihapus");
      setOpenDialog(false);
      loadProducts();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus produk");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produk UMKM</CardTitle>
        <CardDescription>Menampilkan daftar produk yang tersedia.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 md:hidden">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <Skeleton className="w-full h-36 mb-3 rounded" />
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-4 w-24 mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </div>
              </div>
            ))
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Tidak ada produk</p>
          ) : (
            products.map((p) => (
              <div key={p.id} className="border rounded-xl p-4 bg-gray-50">
                <Image src={p.image_url} alt={p.product_name} width={400} height={400}
                  className="w-full h-36 object-cover rounded-lg mb-4" />
                <p className="font-semibold text-lg">{p.product_name}</p>
                <p className="text-sm text-gray-600">
                  Harga: <span className="font-medium">{p.sale_price.toLocaleString()}</span>
                </p>
                <p className="text-sm text-gray-600">Stok: {p.stock_qty}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(p.created_at).toLocaleDateString()}
                </p>

                <div className="flex gap-2 mt-4">
                  <Link href={`/dashboard/products/edit/${p.id}`} className="flex-1">
                    <Button size="sm" className="w-full">Edit</Button>
                  </Link>
                  <Button size="sm" variant="destructive" className="flex-1"
                    onClick={() => { setSelectedId(p.id); setOpenDialog(true); }}>
                    Hapus
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gambar</TableHead>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="w-20 h-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><div className="flex gap-2">
                      <Skeleton className="h-8 w-14" />
                      <Skeleton className="h-8 w-14" />
                    </div></TableCell>
                  </TableRow>
                ))
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-5">
                    Tidak ada produk
                  </TableCell>
                </TableRow>
              ) : (
                products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <Image src={p.image_url} alt={p.product_name} width={80} height={80} className="rounded" />
                    </TableCell>
                    <TableCell>{p.product_name}</TableCell>
                    <TableCell>{p.sale_price.toLocaleString()}</TableCell>
                    <TableCell>{p.stock_qty}</TableCell>
                    <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/products/edit/${p.id}`}>
                          <Button size="sm">Edit</Button>
                        </Link>
                        <Button size="sm" variant="destructive"
                          onClick={() => { setSelectedId(p.id); setOpenDialog(true); }}>
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

export default ProductTable;
