export interface ScannedProduct {
  id: number;
  namaProdul: string;
  berat: number;
  status: "Oke" | "Reject";
}

export const PRODUCTS: ScannedProduct[] = [
  { id: 1, namaProdul: "Indomie Kari", berat: 100, status: "Oke" },
  { id: 2, namaProdul: "Indomie Soto", berat: 500, status: "Reject" },
  { id: 3, namaProdul: "Indomie Goreng", berat: 600, status: "Oke" },
  { id: 4, namaProdul: "Sarimi", berat: 400, status: "Reject" },
  { id: 5, namaProdul: "Supermi", berat: 200, status: "Oke" },
];