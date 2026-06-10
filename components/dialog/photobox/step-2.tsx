import { useState, useEffect } from 'react'
import { Maximize, Minimize, X, RefreshCw, Heart, Smile, ChevronLeft, CheckCircle2, ArrowRight, Lock } from 'lucide-react'
import { PhotoboxStepper } from './stepper'

interface PhotoboxStep2DialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    takenPhotos: string[];
    selectedDesignId: number;
    photoboxDesigns: { id: number; file: string; name: string }[];
    onBack?: () => void;
}

export function PhotoboxStep2Dialog({
    isOpen,
    onOpenChange,
    takenPhotos,
    selectedDesignId,
    photoboxDesigns,
    onBack
}: PhotoboxStep2DialogProps) {
    const [activeTab, setActiveTab] = useState('Aksesoris')
    const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    }

    // Listen for fullscreen changes (e.g. user pressing ESC)
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    useEffect(() => {
        if (isOpen) setCurrentPhotoIdx(0);
    }, [isOpen]);

    if (!isOpen) return null;

    const accessories = [
        { name: 'Topi Lucu', icon: '👒' },
        { name: 'Flower Crown', icon: '🌸' },
        { name: 'Pita', icon: '🎀' },
        { name: 'Kacamata Lucu', icon: '🕶️' },
        { name: 'Kalung Mutiara', icon: '📿' },
        { name: 'Bando Kelinci', icon: '🐰' },
        { name: 'Telinga Kelinci', icon: '🐇' },
        { name: 'Mahkota', icon: '👑' },
    ]

    const stickers = [
        { name: 'Hati', icon: '💕' },
        { name: 'Kupu-kupu', icon: '🦋' },
        { name: 'Sparkle', icon: '✨' },
        { name: 'Blush', icon: '😳' },
        { name: 'Bunga', icon: '🌺' },
        { name: 'Daun', icon: '🌿' },
        { name: 'Bintang', icon: '⭐' },
        { name: 'Polaroid Tape', icon: '🏷️' },
    ]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">
            <div className={`bg-[#fff1f4] rounded-[2rem] border-4 border-white/50 relative shadow-2xl flex flex-col overflow-y-auto custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-all duration-300 ${isFullscreen
                ? 'w-full h-full max-w-none max-h-none p-4 sm:p-6 lg:p-10'
                : 'w-full max-w-[1200px] h-[95vh] max-h-[95vh] p-4 sm:p-6'
                }`}>

                {/* Close Button */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md hover:bg-gray-50 transition-colors z-20 border border-pink-100"
                >
                    <X className="h-4 w-4 text-gray-600" />
                </button>

                {/* Progress Stepper */}
                <PhotoboxStepper
                    currentStep={2}
                    onStepClick={(step) => {
                        if (step === 1 && onBack) onBack()
                    }}
                />

                {/* Main Content Area */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-stretch relative z-10">

                    {/* Left Column - Strip Preview */}
                    <div className="shrink-0 relative hidden md:flex items-center justify-center pt-2">
                        <Heart className="absolute -left-4 top-1/4 h-5 w-5 text-pink-400 fill-pink-400 opacity-70 -rotate-12 drop-shadow-sm" />
                        <Heart className="absolute -left-6 top-1/2 h-4 w-4 text-pink-300 fill-pink-300 opacity-60 rotate-12 drop-shadow-sm" />

                        <div className="w-[160px] bg-white p-2.5 rounded-xl shadow-xl border-4 border-white flex flex-col gap-2 relative overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
                                {selectedDesignId && photoboxDesigns.find(d => d.id === selectedDesignId)?.file && (
                                    <img
                                        src={`/photobox/photobox-example/${photoboxDesigns.find(d => d.id === selectedDesignId)?.file}`}
                                        alt="Strip Background"
                                        className="w-full h-full object-cover blur-sm opacity-50"
                                    />
                                )}
                            </div>

                            <div className="flex flex-col gap-2 relative z-10">
                                {takenPhotos.map((photo, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setCurrentPhotoIdx(i)}
                                        className={`aspect-[4/3] rounded-md overflow-hidden relative shadow-sm cursor-pointer transition-all border-2 ${currentPhotoIdx === i ? 'border-[#ff3a70]' : 'border-gray-200'}`}
                                    >
                                        <img src={photo || '/placeholder.jpg'} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-2 text-center relative z-10 py-1">
                                <p className="font-serif text-[#ff3a70] font-bold text-[14px] leading-none">Hanfleur</p>
                                <p className="font-serif text-[#ff3a70] font-bold text-[14px] leading-none mt-0.5">Florist</p>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column - Canvas */}
                    <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[500px] lg:max-w-none pt-2 lg:pt-0">
                        <div className="w-full aspect-[4/3] bg-gray-100 rounded-[1.5rem] overflow-hidden border-4 border-white shadow-xl relative group">
                            <img src={takenPhotos[currentPhotoIdx] || '/placeholder.jpg'} className="w-full h-full object-cover" alt="Active Photo" />

                            {/* Fullscreen Button */}
                            <button
                                onClick={toggleFullscreen}
                                className="absolute bottom-3 right-3 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2 rounded-xl transition-colors z-20 shadow-md opacity-70 hover:opacity-100"
                                title="Toggle Fullscreen"
                            >
                                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                            </button>

                            {/* Example active sticker bounding box as seen in the mockup */}
                            <div className="absolute top-[15%] right-[20%] w-[120px] h-[120px] border-2 border-dashed border-white bg-white/10 flex items-center justify-center rotate-12 cursor-move hover:border-pink-300 transition-colors group-hover:opacity-100 opacity-80">
                                <div className="text-[70px] drop-shadow-md">👒</div>
                                <div className="absolute -top-3 -right-3 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-red-500 border border-gray-200 transition-colors">
                                    <X className="w-3 h-3" />
                                </div>
                                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-gray-100 border border-gray-200 transition-colors">
                                    <RefreshCw className="w-3 h-3" />
                                </div>
                            </div>

                            {/* Decorative Floating Hearts over Canvas */}
                            <Heart className="absolute top-[30%] left-[10%] h-8 w-8 text-pink-300 fill-pink-300 opacity-80 -rotate-12 drop-shadow-md" />
                            <Heart className="absolute bottom-[20%] right-[10%] h-6 w-6 text-pink-400 fill-pink-400 opacity-70 rotate-12 drop-shadow-md" />
                        </div>
                        {!isFullscreen && (
                            <p className="mt-4 text-center text-sm text-gray-500 flex flex-col items-center gap-1">
                                <span className="flex items-center gap-1.5"><Smile className="w-4 h-4 text-[#ff3a70]" /> Drag & drop aksesoris atau stiker ke foto</span>
                            </p>
                        )}

                        {/* Action Buttons Moved Under Canvas */}
                        <div className="mt-6 w-full flex flex-col gap-2.5">
                            <div className="flex w-full gap-2 sm:gap-2.5">
                                <button
                                    onClick={() => {
                                        if (onBack) onBack();
                                        else onOpenChange(false);
                                    }}
                                    className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 hover:border-[#ff3a70] hover:bg-pink-50 transition-all shadow-sm text-center leading-tight"
                                >
                                    <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                                    <span>Kembali</span>
                                </button>
                                <button className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 hover:border-[#ff3a70] hover:bg-pink-50 transition-all shadow-sm text-center leading-tight">
                                    <RefreshCw className="h-3.5 w-3.5 shrink-0" />
                                    <span>Reset</span>
                                </button>
                                <button className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 hover:border-[#ff3a70] hover:bg-pink-50 transition-all shadow-sm text-center leading-tight">
                                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                                    <span>Simpan<br className="sm:hidden" /> Edit</span>
                                </button>
                            </div>
                            <button className="w-full py-3 px-4 bg-[#ff3a70] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#e02e5b] transition-all shadow-md mt-0.5">
                                Lanjutkan ke Desain
                                <ArrowRight className="h-4 w-4 shrink-0" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Tools panel */}
                    <div className={`w-full lg:w-[400px] bg-white rounded-3xl p-5 shadow-sm border border-pink-100 flex flex-col ${isFullscreen ? '' : 'max-h-[550px]'}`}>
                        {/* Tabs */}
                        <div className="flex gap-1 border-b border-pink-100 pb-2 mb-4 shrink-0 overflow-x-auto custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {['Aksesoris', 'Stiker', 'Teks', 'Frame'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 text-center py-2 px-3 text-xs font-bold rounded-full transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-pink-50 text-[#ff3a70] border border-pink-200 shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Content Scrollable */}
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-bold text-[13px] text-gray-700">Aksesoris Lucu</h3>
                                        <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">Drag & drop ke foto</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {accessories.map((acc, idx) => (
                                            <div key={acc.name} className={`aspect-square bg-gray-50 rounded-[14px] border flex flex-col items-center justify-center p-2 cursor-pointer transition-all group ${idx === 0 ? 'border-[#ff3a70] bg-pink-50/30 shadow-sm' : 'border-gray-100 hover:border-pink-300 hover:shadow-sm'}`}>
                                                <div className="text-2xl group-hover:scale-110 transition-transform drop-shadow-sm">{acc.icon}</div>
                                                <span className="text-[8px] text-center mt-1.5 text-gray-500 font-medium leading-tight px-0.5">{acc.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-[1px] w-full bg-gray-100"></div>

                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-bold text-[13px] text-gray-700">Stiker & Dekorasi</h3>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {stickers.map(stk => (
                                            <div key={stk.name} className="aspect-square bg-gray-50 rounded-[14px] border border-gray-100 flex flex-col items-center justify-center p-2 hover:border-pink-300 hover:shadow-sm cursor-pointer transition-all group">
                                                <div className="text-2xl group-hover:scale-110 transition-transform drop-shadow-sm">{stk.icon}</div>
                                                <span className="text-[8px] text-center mt-1.5 text-gray-500 font-medium leading-tight px-0.5">{stk.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tips Bottom */}
                        <div className="mt-4 pt-3 shrink-0 flex items-start gap-2 text-xs text-yellow-600 bg-yellow-50/80 border border-yellow-100 p-2.5 rounded-xl">
                            <span className="shrink-0 text-yellow-500 text-sm leading-none">💡</span>
                            <p className="leading-tight">Tips: Gunakan 1-3 elemen agar hasil tetap cantik</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
