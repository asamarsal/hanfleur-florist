import React, { useRef, useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Stage, Layer, Image as KonvaImage, Text, Rect } from 'react-konva';
import useImage from 'use-image';

export interface ElementData {
    id: string;
    text: string;
    x: number;
    y: number;
    fontSize: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
}

// Background image component for MiniCanvas
const BackgroundImage = ({ src, width, height }: { src: string, width: number, height: number }) => {
    const [image] = useImage(src, 'anonymous');
    return image ? <KonvaImage image={image} width={width} height={height} name="bg" /> : <Rect width={width} height={height} fill="#f3f4f6" name="bg" />;
};

// Mini Canvas for real-time thumbnail preview
export const MiniCanvas = ({ photoSrc, elements }: { photoSrc: string, elements: ElementData[] }) => {
    const VIRTUAL_WIDTH = 1200;
    const VIRTUAL_HEIGHT = 900;
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full absolute inset-0 pointer-events-none">
            {dimensions.width > 0 && (
                <Stage
                    width={dimensions.width}
                    height={dimensions.height}
                    scaleX={Math.min(dimensions.width / VIRTUAL_WIDTH, dimensions.height / VIRTUAL_HEIGHT)}
                    scaleY={Math.min(dimensions.width / VIRTUAL_WIDTH, dimensions.height / VIRTUAL_HEIGHT)}
                >
                    <Layer>
                        <BackgroundImage src={photoSrc} width={VIRTUAL_WIDTH} height={VIRTUAL_HEIGHT} />
                        {elements && elements.map((el) => (
                            <Text key={el.id} {...el} />
                        ))}
                    </Layer>
                </Stage>
            )}
        </div>
    );
};

export interface StripPreviewProps {
    takenPhotos: string[];
    photoElements?: Record<number, ElementData[]>;
    selectedDesignId: number;
    photoboxDesigns: { id: number; file: string; name: string }[];
    currentPhotoIdx?: number;
    onPhotoClick?: (index: number) => void;
    slotsCount?: number;
    showDecorations?: boolean;
    className?: string;
}

export function StripPreview({
    takenPhotos,
    photoElements = {},
    selectedDesignId,
    photoboxDesigns,
    currentPhotoIdx,
    onPhotoClick,
    slotsCount,
    showDecorations = true,
    className = ""
}: StripPreviewProps) {
    const totalSlots = slotsCount || takenPhotos.length;
    const previewSlots = Array.from({ length: totalSlots });

    return (
        <div className={`relative flex items-start justify-center ${className}`}>
            {/* Decorative hearts floating */}
            {showDecorations && (
                <>
                    <Heart className="absolute -left-4 top-1/4 h-5 w-5 text-pink-400 fill-pink-400 opacity-70 -rotate-12 drop-shadow-sm pointer-events-none" />
                    <Heart className="absolute -left-6 top-1/2 h-4 w-4 text-pink-300 fill-pink-300 opacity-60 rotate-12 drop-shadow-sm pointer-events-none" />
                </>
            )}

            <div className="w-[160px] sm:w-[180px] bg-white p-2 sm:p-2.5 rounded-xl shadow-xl border-4 border-white flex flex-col gap-2 relative overflow-hidden">
                {/* Decorative Background for Strip */}
                <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
                    {selectedDesignId && photoboxDesigns.find(d => d.id === selectedDesignId)?.file && (
                        <img
                            src={`/photobox/photobox-example/${photoboxDesigns.find(d => d.id === selectedDesignId)?.file}`}
                            alt="Strip Background"
                            className="w-full h-full object-cover blur-sm opacity-50"
                        />
                    )}
                </div>

                {/* Photos */}
                <div className="flex flex-col gap-2 relative z-10">
                    {previewSlots.map((_, i) => {
                        const photo = takenPhotos[i];
                        const isActive = currentPhotoIdx === i;
                        const elements = photoElements[i] || [];

                        return (
                            <div
                                key={i}
                                onClick={() => onPhotoClick && onPhotoClick(i)}
                                className={`aspect-[4/3] bg-gray-100 rounded-md overflow-hidden relative shadow-sm flex items-center justify-center border-2 transition-all ${
                                    isActive ? 'border-[#ff3a70]' : 'border-gray-200'
                                } ${onPhotoClick ? 'cursor-pointer hover:border-pink-300' : ''}`}
                            >
                                {photo ? (
                                    <MiniCanvas photoSrc={photo} elements={elements} />
                                ) : (
                                    <span className="text-xl font-bold text-gray-400">{i + 1}</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Strip Footer */}
                <div className="mt-2 text-center relative z-10 py-1 bg-white/80 rounded backdrop-blur-sm">
                    <p className="font-serif text-[#ff3a70] font-bold text-[14px] leading-none">Hanfleur</p>
                    <p className="font-serif text-[#ff3a70] font-bold text-[14px] leading-none mt-0.5">Florist</p>
                </div>
            </div>
        </div>
    );
}
