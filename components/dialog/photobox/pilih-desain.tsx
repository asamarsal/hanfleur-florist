import { useRef } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react'

interface PhotoboxPilihDesainProps {
    photoboxDesigns: { id: number; file: string; name: string }[];
    selectedDesignId: number;
    setSelectedDesignId: (id: number) => void;
    tempDesignId: number;
    setTempDesignId: (id: number) => void;
    setShowDesignGrid: (show: boolean) => void;
}

export function PhotoboxPilihDesain({
    photoboxDesigns,
    selectedDesignId,
    setSelectedDesignId,
    tempDesignId,
    setTempDesignId,
    setShowDesignGrid,
}: PhotoboxPilihDesainProps) {
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

    return (
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
    );
}
