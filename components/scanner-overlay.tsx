export default function ScannerOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-64 h-64">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400" />

        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-b from-green-400 to-transparent animate-pulse" />
      </div>

      <div className="absolute bottom-8 text-center">
        <p className="text-white text-sm font-semibold bg-black/50 px-4 py-2 rounded">
          Arahkan ke QR Code
        </p>
      </div>
    </div>
  );
}
