import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-6 md:p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Soal Project Development Indofood FID TAA</h1>
      <div className="flex justify-center items-center gap-4">
        <Link href="/soal1" className="p-4 border shadow">
          <h1 className="text-2xl font-bold">Soal 1</h1>
        </Link>
        <Link href="/soal2"  className="p-4 border shadow">
          <h1 className="text-2xl font-bold">Soal 2</h1>
        </Link>
      </div>
    </div>
  );
}
