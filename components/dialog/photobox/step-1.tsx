import { useState, useEffect, useRef } from 'react'
import { X, CheckCircle2, Edit2, LayoutGrid, RefreshCw, ArrowRight, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { PhotoboxStepper } from './stepper'

interface PhotoboxStep1DialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    selectedDesignId: number;
    setSelectedDesignId: (id: number) => void;
    photoboxDesigns: { id: number; file: string; name: string }[];
    takenPhotos: string[];
    numPhotos: number;
    resetPhotos: () => void;
    onContinue?: () => void;
}

export function PhotoboxStep1Dialog({
    isOpen,
    onOpenChange,
    selectedDesignId,
    setSelectedDesignId,
    photoboxDesigns,
    takenPhotos,
    numPhotos,
    resetPhotos,
    onContinue,
}: PhotoboxStep1DialogProps) {
    const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
    const [showDesignGrid, setShowDesignGrid] = useState(false);
    const [tempDesignId, setTempDesignId] = useState(selectedDesignId);
    const premiumScrollRef = useRef<HTMLDivElement>(null);

    const scrollPremium = (direction: 'left' | 'right') => {
        if (premiumScrollRef.current) {
            const scrollAmount = 200;
            premiumScrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (isOpen) {
            setCurrentPhotoIdx(0);
            setShowDesignGrid(false);
            setTempDesignId(selectedDesignId);
        }
    }, [isOpen, selectedDesignId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">
            <div className="bg-[#fff1f4] rounded-[2rem] w-full max-w-[1200px] h-[95vh] max-h-[95vh] relative shadow-2xl flex flex-col p-4 sm:p-6 overflow-y-auto border-4 border-white/50">

                {/* Close Button */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md hover:bg-gray-50 transition-colors z-20 border border-pink-100"
                >
                    <X className="h-4 w-4 text-gray-600" />
                </button>

                {/* Progress Stepper */}
                <PhotoboxStepper
                    currentStep={1}
                    onStepClick={(step) => {
                        if (step === 2 && onContinue) onContinue();
                    }}
                />

                <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-stretch relative z-10">

                    {/* Left Column - Strip Preview */}
                    <div className="shrink-0 relative flex items-center justify-center pt-2">
                        {/* Decorative hearts floating */}
                        <Heart className="absolute -left-4 top-1/4 h-5 w-5 text-pink-400 fill-pink-400 opacity-70 -rotate-12 drop-shadow-sm" />
                        <Heart className="absolute -left-6 top-1/2 h-4 w-4 text-pink-300 fill-pink-300 opacity-60 rotate-12 drop-shadow-sm" />

                        <div className="w-[160px] sm:w-[180px] bg-white p-2 sm:p-2.5 rounded-xl shadow-xl border-4 border-white flex flex-col gap-2 relative overflow-hidden">
                            {/* Decorative Background for Strip */}
                            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
                                {(showDesignGrid ? tempDesignId : selectedDesignId) && (
                                    <img
                                        src={`/photobox/photobox-example/${photoboxDesigns.find(d => d.id === (showDesignGrid ? tempDesignId : selectedDesignId))?.file}`}
                                        alt="Strip Background"
                                        className="w-full h-full object-cover blur-sm opacity-50"
                                    />
                                )}
                            </div>

                            {/* Photos */}
                            <div className="flex flex-col gap-2 relative z-10">
                                {takenPhotos.map((photo, i) => (
                                    <div key={i} className="aspect-[4/3] bg-gray-100 rounded-md border border-gray-200 overflow-hidden relative shadow-sm flex items-center justify-center">
                                        {photo ? (
                                            <img src={photo} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-xl font-bold text-gray-400">{i + 1}</span>
                                        )}
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

                    {/* Right Column - Actions & Status or Design Grid */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full bg-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
                        {!showDesignGrid ? (
                            <>
                                {/* Heading */}
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#ff3a70] text-center mb-3">
                                    Hasil fotomu sudah siap 💖
                                </h2>

                                {/* Divider */}
                                <div className="flex items-center justify-center w-full gap-2 mb-2 relative">
                                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-200 to-transparent absolute"></div>
                                    <Heart className="h-4 w-4 text-pink-300 fill-pink-300 relative bg-white px-1 z-10" />
                                </div>

                                {/* Preview Thumbnail Slider */}
                                <div className="relative w-full max-w-[550px] mb-6 flex items-center justify-center px-10 sm:px-14 mt-2 sm:mt-4">
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
                                <div className="w-full flex flex-col gap-2.5 mt-auto">
                                    <div className="flex w-full gap-2 sm:gap-2.5">
                                        <button onClick={() => {
                                            if (onContinue) onContinue();
                                            else onOpenChange(false);
                                        }} className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 hover:border-[#ff3a70] hover:bg-pink-50 transition-all shadow-sm text-center leading-tight">
                                            <Edit2 className="h-3.5 w-3.5 shrink-0" />
                                            <span>Edit<br className="sm:hidden" /> Foto</span>
                                        </button>
                                        <button onClick={() => setShowDesignGrid(true)} className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 hover:border-[#ff3a70] hover:bg-pink-50 transition-all shadow-sm text-center leading-tight">
                                            <LayoutGrid className="h-3.5 w-3.5 shrink-0" />
                                            <span>Pilih<br className="sm:hidden" /> Desain</span>
                                        </button>
                                        <button onClick={() => {
                                            onOpenChange(false);
                                        }} className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 hover:border-[#ff3a70] hover:bg-pink-50 transition-all shadow-sm text-center leading-tight">
                                            <RefreshCw className="h-3.5 w-3.5 shrink-0" />
                                            <span>Ulang<br className="sm:hidden" /> Foto</span>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (onContinue) {
                                                onContinue();
                                            } else {
                                                onOpenChange(false);
                                            }
                                        }}
                                        className="w-full py-3 px-4 bg-[#ff3a70] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#e02e5b] transition-all shadow-md mt-0.5"
                                    >
                                        Lanjutkan
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col w-full h-full min-h-0">
                                <style dangerouslySetInnerHTML={{__html: `
                                    .no-scrollbar::-webkit-scrollbar {
                                        display: none !important;
                                    }
                                    .no-scrollbar {
                                        -ms-overflow-style: none !important;
                                        scrollbar-width: none !important;
                                    }
                                `}} />
                                {/* Design Grids */}
                                <div className="flex-1 flex flex-col overflow-y-auto pr-2 mb-4 no-scrollbar">

                                    {/* Premium Section */}
                                    <div className="pt-0">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="font-bold text-yellow-600 text-sm flex items-center gap-2 mb-1">
                                                    <span>👑</span> Desain Premium
                                                </h3>
                                                <p className="text-xs text-gray-500">Lebih eksklusif untuk kenangan tak terlupakan</p>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
                                                <button onClick={() => scrollPremium('left')} className="p-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-pink-50 text-gray-600 hover:text-[#ff3a70] transition-colors">
                                                    <ChevronLeft className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => scrollPremium('right')} className="p-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-pink-50 text-gray-600 hover:text-[#ff3a70] transition-colors">
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div
                                            ref={premiumScrollRef}
                                            className="flex gap-3 sm:gap-4 pt-2 px-2 pb-4 overflow-x-auto snap-x no-scrollbar"
                                        >
                                            {photoboxDesigns.slice(4).map((design, idx) => {
                                                const badgeColors = ['bg-pink-500', 'bg-orange-500', 'bg-yellow-600', 'bg-purple-500', 'bg-blue-500'];
                                                const badges = ['Best Seller', 'Premium', 'Premium', 'Unlock', 'Unlock'];
                                                return (
                                                    <div
                                                        key={design.id}
                                                        onClick={() => setTempDesignId(design.id)}
                                                        className={`shrink-0 w-[110px] sm:w-[120px] relative rounded-xl cursor-pointer border-2 transition-all duration-300 group shadow-sm bg-white aspect-[1/3] flex flex-col snap-start ${tempDesignId === design.id ? 'border-[#ff3a70] ring-2 ring-pink-200 shadow-md scale-100' : 'border-gray-100 hover:border-pink-300 hover:shadow-md scale-95 opacity-80 hover:opacity-100'}`}
                                                    >
                                                        {tempDesignId === design.id && (
                                                            <div className="absolute -top-2 -right-2 z-20 bg-[#ff3a70] text-white rounded-full p-1 shadow-md border-2 border-white scale-110">
                                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                            </div>
                                                        )}
                                                        <div className="w-full h-full rounded-[10px] overflow-hidden flex flex-col relative">
                                                            <div className={`absolute top-0 left-0 right-0 ${badgeColors[idx % badgeColors.length]} text-white text-[9px] font-bold text-center py-0.5 z-10`}>
                                                                {badges[idx % badges.length]}
                                                            </div>
                                                            <div className="flex-1 relative mt-3">
                                                                <img src={`/photobox/photobox-example/${design.file}`} className="w-full h-full object-cover" alt={design.name} />
                                                            </div>
                                                            <div className="bg-white text-center py-1 border-t border-gray-100">
                                                                <span className="text-[9px] font-bold text-gray-800">Rp15.000</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons (Same layout as original) */}
                                <div className="w-full flex flex-col gap-2.5 mt-auto shrink-0">
                                    <div className="flex w-full gap-2 sm:gap-2.5">
                                        <button onClick={() => {
                                            setTempDesignId(selectedDesignId); // Revert
                                            setShowDesignGrid(false);
                                        }} className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 hover:border-[#ff3a70] hover:bg-pink-50 transition-all shadow-sm text-center leading-tight">
                                            <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                                            <span>Kembali</span>
                                        </button>
                                        <button onClick={() => setTempDesignId(1)} className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 hover:border-[#ff3a70] hover:bg-pink-50 transition-all shadow-sm text-center leading-tight">
                                            <RefreshCw className="h-3.5 w-3.5 shrink-0" />
                                            <span>Default</span>
                                        </button>
                                        <div className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 shadow-sm text-center leading-tight cursor-default opacity-90">
                                            {tempDesignId <= 4 ? (
                                                <>✨ <span className="hidden lg:inline">Desain </span>Gratis</>
                                            ) : (
                                                <>👑 <span className="hidden lg:inline">Pilih </span>Premium</>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedDesignId(tempDesignId);
                                            setShowDesignGrid(false);
                                        }}
                                        className="w-full py-3 px-4 bg-[#ff3a70] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#e02e5b] transition-all shadow-md mt-0.5"
                                    >
                                        Gunakan Desain Ini
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
