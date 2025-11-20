"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductDetail from "./product-detail";
import ScannerOverlay from "./scanner-overlay";
import jsQR from "jsqr";
import { PRODUCTS, ScannedProduct } from "@/data/products";
import Link from "next/link";
export default function QRScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<ScannedProduct | null>(
    null
  );
  const [error, setError] = useState("");
  const [lastScannedCode, setLastScannedCode] = useState("");

  useEffect(() => {
    console.log("camera init");
    if (!isScanning) return;

    const initCamera = async () => {
      try {
        console.log("camera ready");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setError("");
      } catch (err) {
        setError(
          "Tidak dapat mengakses kamera. Pastikan Anda memberikan izin kamera."
        );
        setIsScanning(false);
      }
    };

    initCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isScanning]);

  useEffect(() => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scanInterval = setInterval(() => {
      if (
        videoRef.current &&
        videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
      ) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = decodeQRWithJsQR(imageData);
          if (code && code !== lastScannedCode) {
            console.log("[v0] QR code detected:", code);
            setLastScannedCode(code);
            handleQRCodeScanned(code);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }, 100);

    return () => clearInterval(scanInterval);
  }, [isScanning, lastScannedCode]);

  const decodeQRWithJsQR = (imageData: ImageData): string | null => {
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    return code ? code.data : null;
  };

  const handleQRCodeScanned = (code: string) => {
    console.log("[v0] Processing scanned code:", code);

    const productId = Number.parseInt(code, 10);

    if (!isNaN(productId)) {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (product) {
        console.log("[v0] Product found:", product);
        setScannedProduct(product);
        setError("");
        return;
      }
    }

    const regex = /^(\d+)([A-Z\s]+)(\d+)(Oke|Reject)$/;
    const match = code.match(regex);

    if (match) {
      const id = Number.parseInt(match[1]);
      const product = PRODUCTS.find((p) => p.id === id);
      if (product) {
        console.log("[v0] Product found:", product);
        setScannedProduct(product);
        setError("");
        return;
      }
    }

    setError("Produk tidak ditemukan. Coba scan QR code yang benar.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Link href={"/"}>
        <h1 className="border px-3 rounded w-fit mb-8">{"<"} Kembali</h1>
      </Link>
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            QR Code Scanner
          </h1>
          <p className="text-slate-600">
            Scan QR code produk untuk melihat detail
          </p>
        </div>
        {!scannedProduct ? (
          <Card className="mb-6 overflow-hidden bg-white shadow-lg">
            <div className="p-6">
              {isScanning ? (
                <div className="space-y-4">
                  <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden border-2 border-slate-300">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      playsInline
                      muted
                    />
                    <ScannerOverlay />
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}
                  <Button
                    onClick={() => setIsScanning(false)}
                    variant="destructive"
                    className="w-full"
                  >
                    Berhenti Scan
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-24 h-24 bg-linear-to-br from-blue-100 to-slate-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-600 text-center">
                    Tekan tombol di bawah untuk mulai scan
                  </p>
                  <Button
                    onClick={() => setIsScanning(true)}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Mulai Scan
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <>
            <ProductDetail product={scannedProduct} />

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setScannedProduct(null);
                  setIsScanning(false);
                }}
                variant="outline"
                className="flex-1"
              >
                Kembali
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
