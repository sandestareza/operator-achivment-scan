import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

interface Product {
  id: number;
  namaProdul: string;
  berat: number;
  status: "Oke" | "Reject";
}

export default function ProductDetail({ product }: { product: Product }) {
  const isOke = product.status === "Oke";

  return (
    <Card className="mb-6 overflow-hidden bg-white shadow-lg border-0">
      <div className="bg-linear-to-r from-blue-600 to-blue-700 p-6 text-white">
        <h2 className="text-2xl font-bold">Detail Produk Terscanned</h2>
      </div>

      <div className="p-8">
        {/* Status Badge */}
        <div className="mb-6 flex items-center justify-center">
          {isOke ? (
            <div className="flex items-center gap-3 px-6 py-3 bg-green-50 rounded-full border-2 border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="text-lg font-bold text-green-700">
                Produk Aman
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-6 py-3 bg-red-50 rounded-full border-2 border-red-200">
              <XCircle className="w-6 h-6 text-red-600" />
              <span className="text-lg font-bold text-red-700">
                Produk Ditolak
              </span>
            </div>
          )}
        </div>

        {/* Product Information Grid */}
        <div className="space-y-4">
          {/* NO */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-700">NO</span>
            <span className="text-lg font-bold text-slate-900">
              {product.id}
            </span>
          </div>

          {/* Nama Produk */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-700">Nama Produk</span>
            <span className="text-lg font-bold text-slate-900">
              {product.namaProdul}
            </span>
          </div>

          {/* Berat */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-700">Berat (kg)</span>
            <span className="text-lg font-bold text-slate-900">
              {product.berat}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-700">Status</span>
            <span
              className={`text-lg font-bold px-4 py-2 rounded-lg ${
                isOke
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.status}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
