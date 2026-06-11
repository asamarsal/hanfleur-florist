import { useState, useEffect } from 'react'
import { X, Edit2, LayoutGrid, RefreshCw, ArrowRight, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { PhotoboxStepper } from './stepper'
import { PhotoboxPilihDesain } from './pilih-desain'
import { StripPreview, ElementData } from './strip-preview'

interface PhotoboxStep1DialogProps {
    readonly isOpen: boolean;
    readonly onOpenChange: (open: boolean) => void;
    readonly selectedDesignId: number;
    readonly setSelectedDesignId: (id: number) => void;
    readonly photoboxDesigns: { id: number; file: string; name: string }[];
    readonly takenPhotos: string[];
    readonly photoElements: Record<number, ElementData[]>;
    readonly numPhotos: number;
    readonly resetPhotos: () => void;
    readonly onContinue?: () => void;
}

export function PhotoboxStep1Dialog({
    isOpen,
    onOpenChange,
    selectedDesignId,
    setSelectedDesignId,
    photoboxDesigns,
    takenPhotos,
    photoElements,
    numPhotos,
    resetPhotos,
    onContinue,
}: PhotoboxStep1DialogProps) {
    const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
    const [showDesignGrid, setShowDesignGrid] = useState(false);
    const [tempDesignId, setTempDesignId] = useState(selectedDesignId);

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
                    currentStep={1}
                    onStepClick={(step) => {
                        if (step === 2 && onContinue) onContinue();
                    }}
                />

                <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-stretch relative z-10 min-h-0">

                    {/* Left Column - Strip Preview */}
                    <div className="shrink-0 relative hidden md:flex items-start justify-center pt-0">
                        <StripPreview
                            takenPhotos={takenPhotos}
                            photoElements={photoElements}
                            selectedDesignId={showDesignGrid ? tempDesignId : selectedDesignId}
                            photoboxDesigns={photoboxDesigns}
                            slotsCount={numPhotos}
                        />
                    </div>

                    {/* Right Column - Actions & Status or Design Grid */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full bg-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
                        {showDesignGrid ? (
                            <PhotoboxPilihDesain
                                photoboxDesigns={photoboxDesigns}
                                selectedDesignId={selectedDesignId}
                                setSelectedDesignId={setSelectedDesignId}
                                tempDesignId={tempDesignId}
                                setTempDesignId={setTempDesignId}
                                setShowDesignGrid={setShowDesignGrid}
                            />
                        ) : (
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
                                                    // eslint-disable-next-line react/no-array-index-key
                                                    key={`dot-${idx}`}
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
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
