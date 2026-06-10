import { useState, useEffect } from 'react'
import { X, Heart, Crown, QrCode as QrCodeIcon, Wallet, Landmark, Check, ImageIcon, CheckCircle2, Printer, Download, Mail, RefreshCcw, Lock } from 'lucide-react'
import QRCode from 'react-qr-code'
import { PhotoboxStepper } from './stepper'

interface PhotoboxStep3DialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    selectedDesignId: number;
    photoboxDesigns: { id: number; file: string; name: string }[];
    takenPhotos: string[];
    onBack?: () => void;
}

export function PhotoboxStep3Dialog({
    isOpen,
    onOpenChange,
    selectedDesignId,
    photoboxDesigns,
    takenPhotos,
    onBack,
}: PhotoboxStep3DialogProps) {
    // 14 minutes and 53 seconds = 893 seconds
    const [timeLeft, setTimeLeft] = useState(893);

    useEffect(() => {
        if (!isOpen) return;
        
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        
        return () => clearInterval(timer);
    }, [isOpen]);

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');

    if (!isOpen) return null;

    const design = photoboxDesigns.find(d => d.id === selectedDesignId);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">
            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none !important;
                }
                .no-scrollbar {
                    -ms-overflow-style: none !important;
                    scrollbar-width: none !important;
                }
            `}} />
            <div className="bg-[#fff1f4] rounded-[2rem] border-4 border-white/50 relative shadow-2xl flex flex-col overflow-y-auto no-scrollbar w-full max-w-[1200px] h-[95vh] max-h-[95vh] p-4 sm:p-6">

                {/* Close Button */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md hover:bg-gray-50 transition-colors z-20 border border-pink-100"
                >
                    <X className="h-4 w-4 text-gray-600" />
                </button>

                {/* Progress Stepper */}
                <PhotoboxStepper
                    currentStep={3}
                    onStepClick={(step) => {
                        if (step === 2 && onBack) onBack();
                    }}
                />

                <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch relative z-10 min-h-0">

                    {/* Left Column - Strip Preview */}
                    <div className="shrink-0 relative hidden md:flex items-start justify-center pt-0">
                        {/* Decorative hearts floating */}
                        <Heart className="absolute -left-4 top-1/4 h-5 w-5 text-pink-400 fill-pink-400 opacity-70 -rotate-12 drop-shadow-sm" />
                        <Heart className="absolute -left-6 top-1/2 h-4 w-4 text-pink-300 fill-pink-300 opacity-60 rotate-12 drop-shadow-sm" />

                        <div className="w-[160px] sm:w-[180px] bg-white p-2 sm:p-2.5 rounded-xl shadow-xl border-4 border-white flex flex-col gap-2 relative overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
                                {selectedDesignId && design && (
                                    <img
                                        src={`/photobox/photobox-example/${design.file}`}
                                        alt="Strip Background"
                                        className="w-full h-full object-cover blur-sm opacity-50"
                                    />
                                )}
                            </div>

                            <div className="flex flex-col gap-2 relative z-10">
                                {takenPhotos.map((photo, i) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <div key={photo || `empty-photo-${i}`} className="aspect-[4/3] bg-gray-100 rounded-md border border-gray-200 overflow-hidden relative shadow-sm flex items-center justify-center">
                                        {photo ? (
                                            <img src={photo} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-xl font-bold text-gray-400">{i + 1}</span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-2 text-center relative z-10 py-1">
                                <p className="font-serif text-[#ff3a70] font-bold text-[14px] leading-none">Hanfleur</p>
                                <p className="font-serif text-[#ff3a70] font-bold text-[14px] leading-none mt-0.5">Florist</p>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column - Pembayaran */}
                    <div className="flex-1 flex flex-col w-full max-w-[500px] lg:max-w-none">
                        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-pink-100 flex flex-col h-full overflow-y-auto no-scrollbar">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                                <h2 className="font-bold text-gray-800 text-lg">Pembayaran</h2>
                                <div className="bg-orange-50 text-orange-500 border border-orange-200 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shrink-0">
                                    <Crown className="w-3.5 h-3.5" />
                                    Menunggu Pembayaran
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mb-4">Scan QRIS untuk menyelesaikan pembayaran</p>

                            {/* QR & Timer */}
                            <div className="flex flex-col xl:flex-row gap-4">
                                <div className="w-full xl:w-[140px] shrink-0 border border-pink-100 rounded-xl p-3 bg-white flex flex-col items-center justify-center shadow-sm">
                                    <QRCode value="https://hanfleur.com/pay" size={120} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                                </div>
                                <div className="flex-1 bg-pink-50 rounded-xl border border-pink-100 p-4 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs text-gray-500 font-medium mb-1">Sisa Waktu Pembayaran</p>
                                    <div className="flex items-center justify-center gap-2 font-bold text-3xl text-[#ff3a70] my-2">
                                        <div className="flex flex-col items-center">
                                            <span suppressHydrationWarning>{minutes}</span>
                                            <span className="text-[10px] text-gray-500 font-normal mt-[-4px]">menit</span>
                                        </div>
                                        <span className="mb-4">:</span>
                                        <div className="flex flex-col items-center">
                                            <span suppressHydrationWarning>{seconds}</span>
                                            <span className="text-[10px] text-gray-500 font-normal mt-[-4px]">detik</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-400">Batas waktu hingga<br />18 Mei 2025, 14:32 WIB</p>
                                </div>
                            </div>

                            {/* Ringkasan Pesanan */}
                            <div className="mt-6">
                                <h3 className="font-bold text-gray-800 text-sm mb-3">Ringkasan Pesanan</h3>
                                <div className="space-y-2.5 text-xs">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Template</span>
                                        <span className="font-semibold text-gray-800 flex items-center gap-1">
                                            {design?.name || 'Blush Romance'} <Crown className="w-3 h-3 text-yellow-500" />
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Jumlah Foto</span>
                                        <span className="font-semibold text-gray-800">{takenPhotos.length} Foto</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Harga Desain</span>
                                        <span className="font-semibold text-gray-800">Rp 25.000</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Diskon Voucher</span>
                                        <span className="font-semibold text-green-600">- Rp 5.000</span>
                                    </div>
                                </div>
                                <div className="border-t border-dashed border-gray-200 my-3"></div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-800 text-sm">Total Bayar</span>
                                    <span className="font-bold text-[#ff3a70] text-lg">Rp 20.000</span>
                                </div>
                            </div>

                            {/* Kode Voucher */}
                            <div className="mt-5">
                                <h3 className="font-bold text-gray-800 text-sm mb-2">Kode Voucher / Promo</h3>
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Masukkan kode voucher" className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#ff3a70] transition-colors" />
                                    <button className="bg-[#ff3a70] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#e02e5b] transition-colors shadow-sm">Gunakan</button>
                                </div>
                            </div>

                            {/* Metode Pembayaran */}
                            <div className="mt-6 mb-2">
                                <h3 className="font-bold text-gray-800 text-sm mb-3">Pilih Metode Pembayaran</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="border-2 border-[#ff3a70] bg-pink-50 rounded-xl p-2 relative flex flex-col items-center justify-center cursor-pointer min-h-[70px] shadow-sm">
                                        <div className="absolute top-1.5 right-1.5 bg-[#ff3a70] rounded-full p-0.5">
                                            <Check className="w-2.5 h-2.5 text-white" />
                                        </div>
                                        <QrCodeIcon className="w-6 h-6 mb-1 text-[#ff3a70]" />
                                        <span className="font-bold text-[11px] sm:text-xs">QRIS</span>
                                    </div>
                                    <div className="border border-gray-200 bg-white hover:border-pink-300 rounded-xl p-2 relative flex flex-col items-center justify-center cursor-pointer min-h-[70px] transition-colors">
                                        <div className="absolute top-2 right-2 border border-gray-300 rounded-full w-3 h-3"></div>
                                        <Wallet className="w-6 h-6 mb-1 text-gray-500" />
                                        <span className="font-bold text-[11px] sm:text-xs text-gray-600">E-Wallet</span>
                                    </div>
                                    <div className="border border-gray-200 bg-white hover:border-pink-300 rounded-xl p-2 relative flex flex-col items-center justify-center cursor-pointer min-h-[70px] transition-colors">
                                        <div className="absolute top-2 right-2 border border-gray-300 rounded-full w-3 h-3"></div>
                                        <Landmark className="w-6 h-6 mb-1 text-gray-500" />
                                        <span className="font-bold text-[10px] sm:text-[11px] text-gray-600 text-center leading-tight">Virtual Account</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Text Below Content */}
                        <div className="mt-3 flex items-center justify-center gap-1.5 text-gray-500 opacity-80 shrink-0">
                            <Lock className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">Transaksi aman & terenkripsi</span>
                        </div>
                    </div>

                    {/* Right Column - Download Actions */}
                    <div className="w-full lg:w-[320px] xl:w-[380px] flex flex-col">
                        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-pink-100 flex flex-col h-full relative overflow-y-auto no-scrollbar">
                            <Heart className="absolute top-4 right-4 w-6 h-6 text-pink-100 fill-pink-100 rotate-12" />
                            <Heart className="absolute bottom-4 left-4 w-8 h-8 text-pink-100 fill-pink-100 -rotate-12" />

                            <h2 className="font-bold text-[#ff3a70] text-sm sm:text-base mb-4 pr-6 relative z-10">Setelah Pembayaran Kamu Dapatkan</h2>

                            <div className="space-y-4 mb-2 relative z-10">
                                {[
                                    { icon: ImageIcon, text: 'File foto HD & tanpa watermark' },
                                    { icon: Printer, text: 'File siap cetak (300 DPI)' },
                                    { icon: Download, text: 'Download otomatis setelah pembayaran' },
                                    { icon: Mail, text: 'Bisa kirim ke email & pesan cetak' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="bg-pink-100 p-1.5 rounded-lg text-[#ff3a70] shrink-0 mt-0.5">
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-[13px] text-gray-600 font-medium leading-snug pt-0.5">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-center w-full gap-2 mt6 mb-0 relative">
                                <div className="h-[1px] w-full border-t border-dashed border-pink-200 absolute"></div>
                                <Heart className="h-3.5 w-3.5 text-pink-200 fill-pink-200 relative bg-white px-1 z-10" />
                            </div>

                            <div className="flex flex-col gap-3 mt-auto relative z-10">
                                <button className="w-full py-3 px-4 bg-[#ff3a70] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#e02e5b] transition-all shadow-md">
                                    <Download className="w-4 h-4" />
                                    Download Tanpa Watermark
                                </button>
                                <button className="w-full py-3 px-4 bg-white border border-pink-200 text-[#ff3a70] rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-pink-50 transition-all shadow-sm">
                                    <Download className="w-4 h-4" />
                                    Download dengan Watermark
                                </button>
                                <button className="w-full py-3 px-4 bg-white border border-pink-200 text-[#ff3a70] rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-pink-50 transition-all shadow-sm">
                                    <Mail className="w-4 h-4" />
                                    Kirim ke Email
                                </button>
                                <button className="w-full py-3 px-4 bg-white border border-pink-200 text-[#ff3a70] rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-pink-50 transition-all shadow-sm">
                                    <Printer className="w-4 h-4" />
                                    Pesan Cetak
                                </button>
                                <button className="w-full mt-1 py-3 px-4 bg-gray-50 text-gray-400 border border-gray-100 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all cursor-not-allowed">
                                    <RefreshCcw className="w-4 h-4" />
                                    Cek Status Pembayaran
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
