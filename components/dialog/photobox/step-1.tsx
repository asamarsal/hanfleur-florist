import { useState, useEffect } from 'react'
import { X, CheckCircle2, Edit2, LayoutGrid, RefreshCw, ArrowRight, Lock, Heart, ChevronLeft, ChevronRight } from 'lucide-react'

interface PhotoboxStep1DialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    selectedDesignId: number;
    photoboxDesigns: { id: number; file: string; name: string }[];
    takenPhotos: string[];
    numPhotos: number;
    resetPhotos: () => void;
}

export function PhotoboxStep1Dialog({
    isOpen,
    onOpenChange,
    selectedDesignId,
    photoboxDesigns,
    takenPhotos,
    numPhotos,
    resetPhotos,
}: PhotoboxStep1DialogProps) {
    const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

    useEffect(() => {
        if (isOpen) setCurrentPhotoIdx(0);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
            <div className="bg-[#fff1f4] rounded-[2rem] w-full max-w-[850px] relative shadow-2xl flex flex-col p-4 sm:p-6 animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh] border-4 border-white/50">

                {/* Close Button */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md hover:bg-gray-50 transition-colors z-20 border border-pink-100"
                >
                    <X className="h-4 w-4 text-gray-600" />
                </button>

                {/* Progress Stepper */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
                    <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-pink-200">
                        <div className="w-5 h-5 rounded-full bg-[#ff3a70] text-white flex items-center justify-center text-[10px] font-bold shadow-sm">1</div>
                        <span className="text-[#ff3a70] font-bold text-xs sm:text-sm">Preview</span>
                    </div>
                    <div className="h-[1px] w-6 sm:w-16 border-t-2 border-dashed border-pink-200"></div>
                    <div className="flex items-center gap-1.5 opacity-60">
                        <div className="w-5 h-5 rounded-full bg-transparent border-2 border-gray-300 text-gray-400 flex items-center justify-center text-[10px] font-bold">2</div>
                        <span className="text-gray-500 font-bold text-xs sm:text-sm">Edit Foto</span>
                    </div>
                    <div className="h-[1px] w-6 sm:w-16 border-t-2 border-dashed border-pink-200"></div>
                    <div className="flex items-center gap-1.5 opacity-60">
                        <div className="w-5 h-5 rounded-full bg-transparent border-2 border-gray-300 text-gray-400 flex items-center justify-center text-[10px] font-bold">3</div>
                        <span className="text-gray-500 font-bold text-xs sm:text-sm">Desain</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-stretch relative z-10">

                    {/* Left Column - Strip Preview */}
                    <div className="shrink-0 relative flex items-center justify-center pt-2">
                        {/* Decorative hearts floating */}
                        <Heart className="absolute -left-4 top-1/4 h-5 w-5 text-pink-400 fill-pink-400 opacity-70 -rotate-12 drop-shadow-sm" />
                        <Heart className="absolute -left-6 top-1/2 h-4 w-4 text-pink-300 fill-pink-300 opacity-60 rotate-12 drop-shadow-sm" />

                        <div className="w-[160px] sm:w-[180px] bg-white p-2 sm:p-2.5 rounded-xl shadow-xl border-4 border-white flex flex-col gap-2 relative overflow-hidden">
                            {/* Decorative Background for Strip */}
                            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
                                {selectedDesignId && (
                                    <img
                                        src={`/photobox/photobox-example/${photoboxDesigns.find(d => d.id === selectedDesignId)?.file}`}
                                        alt="Strip Background"
                                        className="w-full h-full object-cover blur-sm opacity-50"
                                    />
                                )}
                            </div>

                            {/* Photos */}
                            <div className="flex flex-col gap-2 relative z-10">
                                {takenPhotos.map((photo, i) => (
                                    <div key={i} className="aspect-[5/3] bg-gray-100 rounded-md border border-gray-200 overflow-hidden relative shadow-sm">
                                        <img src={photo} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>

                            {/* Strip Footer */}
                            <div className="mt-2 text-center relative z-10 py-1">
                                <p className="font-serif text-[#ff3a70] font-bold text-[14px] leading-none">Hanfleur</p>
                                <p className="font-serif text-[#ff3a70] font-bold text-[14px] leading-none mt-0.5">Florist</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Actions & Status */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full bg-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">

                        {/* Heading */}
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#ff3a70] text-center mb-3">
                            Hasil fotomu sudah siap 💖
                        </h2>

                        {/* Divider */}
                        <div className="flex items-center justify-center w-full gap-2 mb-2 relative">
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-200 to-transparent absolute"></div>
                            <Heart className="h-4 w-4 text-pink-300 fill-pink-300 relative bg-white px-1 z-10" />
                        </div>

                        {/* Preview Thumbnail Grid */}
                        {/* Preview Thumbnail Slider */}
                        <div className="relative w-full mb-6 flex items-center justify-center px-10 sm:px-14">
                            {/* Navigation Prev */}
                            <button
                                onClick={() => setCurrentPhotoIdx(prev => (prev === 0 ? takenPhotos.length - 1 : prev - 1))}
                                className="absolute left-0 sm:left-2 z-10 bg-white hover:bg-pink-50 text-[#ff3a70] p-1.5 sm:p-2 rounded-full shadow-md border border-pink-200 transition-all"
                            >
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-[10px] overflow-hidden border border-pink-200 shadow-md bg-gray-50 group">
                                <img src={takenPhotos[currentPhotoIdx]} alt={`Foto ${currentPhotoIdx + 1}`} className="w-full h-full object-cover transition-all duration-300" />

                                {/* Photo Number Badge */}
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#ff3a70] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 shadow-sm border border-pink-100">
                                    {currentPhotoIdx + 1}
                                </div>

                                {/* Pagination Dots */}
                                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                                    {takenPhotos.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentPhotoIdx(idx)}
                                            className={`w-2 h-2 rounded-full transition-all shadow-sm ${idx === currentPhotoIdx ? 'bg-[#ff3a70] scale-125' : 'bg-white/70 hover:bg-white'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Next */}
                            <button
                                onClick={() => setCurrentPhotoIdx(prev => (prev === takenPhotos.length - 1 ? 0 : prev + 1))}
                                className="absolute right-0 sm:right-2 z-10 bg-white hover:bg-pink-50 text-[#ff3a70] p-1.5 sm:p-2 rounded-full shadow-md border border-pink-200 transition-all"
                            >
                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="w-full flex flex-col gap-2.5">
                            <div className="flex w-full gap-2 sm:gap-2.5">
                                <button onClick={() => onOpenChange(false)} className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 hover:border-[#ff3a70] hover:bg-pink-50 transition-all shadow-sm text-center leading-tight">
                                    <Edit2 className="h-3.5 w-3.5 shrink-0" />
                                    <span>Edit<br className="sm:hidden" /> Foto</span>
                                </button>
                                <button onClick={() => onOpenChange(false)} className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 hover:border-[#ff3a70] hover:bg-pink-50 transition-all shadow-sm text-center leading-tight">
                                    <LayoutGrid className="h-3.5 w-3.5 shrink-0" />
                                    <span>Pilih<br className="sm:hidden" /> Desain</span>
                                </button>
                                <button onClick={() => {
                                    onOpenChange(false)
                                }} className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 hover:border-[#ff3a70] hover:bg-pink-50 transition-all shadow-sm text-center leading-tight">
                                    <RefreshCw className="h-3.5 w-3.5 shrink-0" />
                                    <span>Ulang<br className="sm:hidden" /> Foto</span>
                                </button>
                            </div>
                            <button className="w-full py-3 px-4 bg-[#ff3a70] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#e02e5b] transition-all shadow-md mt-0.5">
                                Lanjutkan
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
