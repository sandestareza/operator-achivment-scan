"use client";

import { CardChart } from "@/components/card-chard";
import { Button } from "@/components/ui/button";
import { operators } from "@/data/operators";
import Link from "next/link";
import { useState } from "react";

export default function PageSoalSatu() {
  const [status, setStatus] = useState("");
  const sortedOperators = operators
    .map((op) => ({
      ...op,
      percentage: Math.round((op.output / op.target) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  function getStatusColor(percentage: number): string {
    if (percentage >= 100) return "text-green-600 dark:text-green-400";
    if (percentage >= 75) return "text-blue-600 dark:text-blue-400";
    if (percentage >= 50) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  }

  function getProgressColor(percentage: number): string {
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 50) return "bg-amber-500";
    return "bg-red-500";
  }

  function formatNumber(num: number): string {
    return num.toLocaleString("id-ID");
  }

  const handleSendEmail = async (name: string) => {
    setStatus("Mengirim...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setStatus("Pesan berhasil dikirim!");
        alert("Pesan berhasil dikirim ke email rezadev2498@gmail.com");
      } else {
        const errorData = await response.json();
        console.error(errorData);
        setStatus(
          `Gagal mengirim pesan: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus("Terjadi kesalahan jaringan.");
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="mx-auto w-full">
        <Link href={"/"}>
          <h1 className="border px-3 rounded w-fit mb-8">{"<"} Kembali</h1>
        </Link>
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Pencapaian Operator</h1>
          <p className="text-slate-400 text-lg">
            Data kinerja operator diurutkan berdasarkan persentase pencapaian
            tertinggi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Total Operator</div>
            <div className="text-3xl font-bold text-white">
              {sortedOperators.length}
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">
              Mencapai Target (100%+)
            </div>
            <div className="text-3xl font-bold text-green-500">
              {sortedOperators.filter((op) => op.percentage >= 100).length}
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">
              Rata-rata Pencapaian
            </div>
            <div className="text-3xl font-bold text-blue-500">
              {Math.round(
                sortedOperators.reduce((sum, op) => sum + op.percentage, 0) /
                  sortedOperators.length
              )}
              %
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Tertinggi</div>
            <div className="text-3xl font-bold text-amber-500">
              {sortedOperators[0]?.percentage}%
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="max-w-5xl lg:w-4xl bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h1 className="text-xl font-bold mb-4 text-white">
              Grafik Pencapaian Operator
            </h1>
            <div className="overflow-x-auto">
              <CardChart />
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className=" border-b border-slate-600">
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Peringkat
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Nama Operator
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Output
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Target
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Progress
                    </th>
                    <th className="px-6 py-4 text-right text-white font-semibold">
                      Pencapaian
                    </th>
                    <th className="px-6 py-4 text-center text-white font-semibold">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOperators.map((operator, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          {index === 0 && <span className="text-2xl">🥇</span>}
                          {index === 1 && <span className="text-2xl">🥈</span>}
                          {index === 2 && <span className="text-2xl">🥉</span>}
                          <span className="text-white font-semibold text-lg">
                            #{index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">
                        {operator.name}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {formatNumber(operator.output)}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {formatNumber(operator.target)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-32 bg-slate-700 rounded-full h-3 overflow-hidden">
                          <div
                            className={`${getProgressColor(
                              operator.percentage
                            )} h-full transition-all duration-500`}
                            style={{
                              width: `${Math.min(operator.percentage, 150)}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`text-lg font-bold ${getStatusColor(
                            operator.percentage
                          )}`}
                        >
                          {operator.percentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {operator.percentage <= 50 ? (
                          <Button
                            size={"sm"}
                            variant={"outline"}
                            disabled={status === "Mengirim..."}
                            onClick={() => handleSendEmail(operator.name)}
                            className="mr-4"
                          >
                            {status === "Mengirim..."
                              ? "Sending..."
                              : "Send Email"}
                          </Button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
