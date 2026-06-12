import React, { useState, useEffect, useRef } from 'react'
import { Maximize, Minimize, X, RefreshCw, Heart, Smile, ChevronLeft, CheckCircle2, ArrowRight, Trash2 } from 'lucide-react'
import { PhotoboxStepper } from './stepper'
import { Stage, Layer, Image as KonvaImage, Text, Transformer, Rect } from 'react-konva';
import useImage from 'use-image';
import { StripPreview, ElementData } from './strip-preview'

interface PhotoboxStep2DialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    takenPhotos: string[];
    selectedDesignId: number;
    photoboxDesigns: { id: number; file: string; name: string }[];
    photoElements: Record<number, ElementData[]>;
    setPhotoElements: React.Dispatch<React.SetStateAction<Record<number, ElementData[]>>>;
    onBack?: () => void;
    onContinue?: () => void;
}

// Removed duplicate ElementData interface

// Sticker component with transform capabilities
const Sticker = ({ shapeProps, isSelected, onSelect, onChange }: any) => {
    const shapeRef = useRef<any>(null);
    const trRef = useRef<any>(null);

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Text
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragMove={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransform={(e) => {
                    const node = shapeRef.current;
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        scaleX: node.scaleX(),
                        scaleY: node.scaleY(),
                    });
                }}
                onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        scaleX: node.scaleX(),
                        scaleY: node.scaleY(),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    padding={5}
                    anchorSize={12}
                    anchorCornerRadius={6}
                    borderDash={[5, 5]}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};

// Background image component
const BackgroundImage = ({ src, width, height }: { src: string, width: number, height: number }) => {
    const [image] = useImage(src, 'anonymous');
    return image ? <KonvaImage image={image} width={width} height={height} name="bg" /> : <Rect width={width} height={height} fill="#f3f4f6" name="bg" />;
};

export function PhotoboxStep2Dialog({
    isOpen,
    onOpenChange,
    takenPhotos,
    selectedDesignId,
    photoboxDesigns,
    photoElements,
    setPhotoElements,
    onBack,
    onContinue
}: PhotoboxStep2DialogProps) {
    const [activeTab, setActiveTab] = useState('Aksesoris')
    const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Editor States
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const stageRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const VIRTUAL_WIDTH = 1200;
    const VIRTUAL_HEIGHT = 900;

    // Helper to get/set elements for current photo
    const elements = photoElements[currentPhotoIdx] || [];
    const setElements = (newEls: ElementData[] | ((prev: ElementData[]) => ElementData[])) => {
        setPhotoElements(prev => {
            const currentEls = prev[currentPhotoIdx] || [];
            const updated = typeof newEls === 'function' ? newEls(currentEls) : newEls;
            return { ...prev, [currentPhotoIdx]: updated };
        });
    };

    // Fullscreen handling
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

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Resize observer for responsive canvas
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height
                });
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [isFullscreen, isOpen]);

    // Keyboard delete event
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                if (selectedId) {
                    setElements(elements.filter(el => el.id !== selectedId));
                    setSelectedId(null);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedId, elements]);

    useEffect(() => {
        if (isOpen) {
            setCurrentPhotoIdx(0);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const checkDeselect = (e: any) => {
        const clickedOnEmpty = e.target === e.target.getStage() || e.target.hasName('bg');
        if (clickedOnEmpty) {
            setSelectedId(null);
        }
    };

    const addElementToCenter = (icon: string) => {
        setElements(prev => [...prev, {
            id: Date.now().toString(),
            text: icon,
            x: VIRTUAL_WIDTH / 2 - 40,
            y: VIRTUAL_HEIGHT / 2 - 40,
            fontSize: 80,
            rotation: 0,
            scaleX: 1,
            scaleY: 1
        }]);
    };

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
                <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch relative z-10 min-h-0">

                    {/* Left Column - Strip Preview */}
                    <div className="shrink-0 relative hidden md:flex items-start justify-center pt-0">
                        <StripPreview
                            takenPhotos={takenPhotos}
                            photoElements={photoElements}
                            selectedDesignId={selectedDesignId}
                            photoboxDesigns={photoboxDesigns}
                            currentPhotoIdx={currentPhotoIdx}
                            onPhotoClick={(idx) => {
                                setCurrentPhotoIdx(idx);
                                setSelectedId(null);
                            }}
                        />
                    </div>

                    {/* Middle Column - Canvas */}
                    <div className="flex-1 flex flex-col items-center justify-between w-full max-w-[500px] lg:max-w-none pt-2 lg:pt-0">
                        <div 
                            ref={containerRef}
                            className="w-full aspect-[4/3] bg-gray-100 rounded-[1.5rem] overflow-hidden border-4 border-white shadow-xl relative group"
                            onDrop={(e) => {
                                e.preventDefault();
                                if (!stageRef.current) return;
                                stageRef.current.setPointersPositions(e);
                                const pos = stageRef.current.getPointerPosition();
                                
                                const scale = Math.min(
                                    dimensions.width / VIRTUAL_WIDTH,
                                    dimensions.height / VIRTUAL_HEIGHT
                                );

                                if (pos && draggedItem) {
                                    setElements(prev => [...prev, {
                                        id: Date.now().toString(),
                                        text: draggedItem,
                                        x: (pos.x / scale) - 40,
                                        y: (pos.y / scale) - 40,
                                        fontSize: 80,
                                        rotation: 0,
                                        scaleX: 1,
                                        scaleY: 1
                                    }]);
                                    setDraggedItem(null);
                                }
                            }}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {dimensions.width > 0 && (
                                <Stage
                                    width={dimensions.width}
                                    height={dimensions.height}
                                    scaleX={Math.min(dimensions.width / VIRTUAL_WIDTH, dimensions.height / VIRTUAL_HEIGHT)}
                                    scaleY={Math.min(dimensions.width / VIRTUAL_WIDTH, dimensions.height / VIRTUAL_HEIGHT)}
                                    onMouseDown={checkDeselect}
                                    onTouchStart={checkDeselect}
                                    ref={stageRef}
                                >
                                    <Layer>
                                        <BackgroundImage src={takenPhotos[currentPhotoIdx] || '/placeholder.jpg'} width={VIRTUAL_WIDTH} height={VIRTUAL_HEIGHT} />
                                        {elements.map((el, i) => (
                                            <Sticker
                                                key={el.id}
                                                shapeProps={el}
                                                isSelected={el.id === selectedId}
                                                onSelect={() => setSelectedId(el.id)}
                                                onChange={(newAttrs: ElementData) => {
                                                    const rects = elements.slice();
                                                    rects[i] = newAttrs;
                                                    setElements(rects);
                                                }}
                                            />
                                        ))}
                                    </Layer>
                                </Stage>
                            )}

                            {/* Delete Selected Item Button Overlay */}
                            {selectedId && (
                                <button
                                    onClick={() => {
                                        setElements(elements.filter(el => el.id !== selectedId));
                                        setSelectedId(null);
                                    }}
                                    className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-500 text-white px-3 py-2 rounded-xl transition-colors z-20 shadow-md backdrop-blur-md flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span className="text-xs font-bold hidden sm:inline">Hapus</span>
                                </button>
                            )}

                            {/* Fullscreen Button */}
                            <button
                                onClick={toggleFullscreen}
                                className="absolute bottom-3 right-3 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2 rounded-xl transition-colors z-20 shadow-md opacity-70 hover:opacity-100"
                                title="Toggle Fullscreen"
                            >
                                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                            </button>
                        </div>
                        
                        {!isFullscreen && (
                            <p className="mt-4 text-center text-sm text-gray-500 flex flex-col items-center gap-1">
                                <span className="flex items-center gap-1.5"><Smile className="w-4 h-4 text-[#ff3a70]" /> Drag & drop aksesoris ke foto, atau klik untuk menambahkannya.</span>
                            </p>
                        )}

                        {/* Action Buttons */}
                        <div className="w-full flex flex-col gap-2.5 mt-auto pt-6 shrink-0">
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
                                <button 
                                    onClick={() => {
                                        setElements([]);
                                        setSelectedId(null);
                                    }}
                                    className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 hover:border-[#ff3a70] hover:bg-pink-50 transition-all shadow-sm text-center leading-tight"
                                >
                                    <RefreshCw className="h-3.5 w-3.5 shrink-0" />
                                    <span>Reset</span>
                                </button>
                                <button className="flex-1 py-2 px-1 sm:px-2 bg-white text-[#ff3a70] rounded-xl font-bold text-[10px] sm:text-xs flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-1.5 border border-pink-200 hover:border-[#ff3a70] hover:bg-pink-50 transition-all shadow-sm text-center leading-tight">
                                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                                    <span>Simpan<br className="sm:hidden" /> Edit</span>
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    if (onContinue) onContinue();
                                    else onOpenChange(false);
                                }}
                                className="w-full py-3 px-4 bg-[#ff3a70] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#e02e5b] transition-all shadow-md mt-0.5"
                            >
                                Lanjutkan ke Download
                                <ArrowRight className="h-4 w-4 shrink-0" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Tools panel */}
                    <div className={`w-full lg:w-[400px] bg-white rounded-3xl p-5 shadow-sm border border-pink-100 flex flex-col ${isFullscreen ? '' : 'h-full lg:h-auto'}`}>
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
                                            <div 
                                                key={acc.name} 
                                                draggable
                                                onDragStart={(e) => {
                                                    setDraggedItem(acc.icon);
                                                }}
                                                onClick={() => addElementToCenter(acc.icon)}
                                                className={`aspect-square bg-gray-50 rounded-[14px] border flex flex-col items-center justify-center p-2 cursor-pointer transition-all group ${idx === 0 ? 'border-[#ff3a70] bg-pink-50/30 shadow-sm' : 'border-gray-100 hover:border-pink-300 hover:shadow-sm'}`}>
                                                <div className="text-2xl group-hover:scale-110 transition-transform drop-shadow-sm pointer-events-none">{acc.icon}</div>
                                                <span className="text-[8px] text-center mt-1.5 text-gray-500 font-medium leading-tight px-0.5 pointer-events-none">{acc.name}</span>
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
                                            <div 
                                                key={stk.name} 
                                                draggable
                                                onDragStart={(e) => {
                                                    setDraggedItem(stk.icon);
                                                }}
                                                onClick={() => addElementToCenter(stk.icon)}
                                                className="aspect-square bg-gray-50 rounded-[14px] border border-gray-100 flex flex-col items-center justify-center p-2 hover:border-pink-300 hover:shadow-sm cursor-pointer transition-all group">
                                                <div className="text-2xl group-hover:scale-110 transition-transform drop-shadow-sm pointer-events-none">{stk.icon}</div>
                                                <span className="text-[8px] text-center mt-1.5 text-gray-500 font-medium leading-tight px-0.5 pointer-events-none">{stk.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tips Bottom */}
                        <div className="mt-4 pt-3 shrink-0 flex items-start gap-2 text-xs text-yellow-600 bg-yellow-50/80 border border-yellow-100 p-2.5 rounded-xl">
                            <span className="shrink-0 text-yellow-500 text-sm leading-none">💡</span>
                            <p className="leading-tight">Tips: Gunakan 1-3 elemen agar hasil tetap cantik. Tekan 'Delete' untuk menghapus stiker.</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
