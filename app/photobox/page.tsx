'use client'

import { useRef, useState, useEffect } from 'react'
import { Camera, RefreshCw, SwitchCamera, ArrowRight, Check, Sparkles, SmilePlus, Smile, Maximize, Minimize, Sun, Heart, ChevronLeft, ChevronRight, X, CheckCircle2, Edit2, LayoutGrid, Lock } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { DecorativeBackground } from '@/components/decorative-background'
import { toast } from 'sonner'
import { PhotoboxStep1Dialog } from '@/components/dialog/photobox/step-1'

const photoboxDesigns = [
  { id: 1, file: 'example1-pb.png', name: 'Romantic Love' },
  { id: 2, file: 'example3-pb.png', name: 'Best Friends' },
  { id: 3, file: 'example4-pb.png', name: 'Blush Flowers' },
  { id: 4, file: 'example5-pb.png', name: 'Pink Dream' },
  { id: 5, file: 'example6-pb.png', name: 'Golden Love' },
  { id: 6, file: 'example7-pb.png', name: 'Floral Magic' },
  { id: 7, file: 'example8-pb.png', name: 'Cute Pastel' },
  { id: 8, file: 'example9-pb.png', name: 'Spring Garden' },
  { id: 9, file: 'example10-pb.png', name: 'Rose Romance' },
  { id: 10, file: 'example11-pb.png', name: 'Happy Moments' },
]

export default function PhotoboxPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<'Front' | 'Back'>('Front')
  const [activeEffect, setActiveEffect] = useState<'normal' | 'vintage' | 'bnw' | 'teal_orange'>('normal')
  const [showEffectsPanel, setShowEffectsPanel] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  const [numPhotos, setNumPhotos] = useState<3 | 4>(4)
  const [selectedDesignId, setSelectedDesignId] = useState(1)
  const [takenPhotos, setTakenPhotos] = useState<string[]>([])
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  const [isRecording, setIsRecording] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [timerDuration, setTimerDuration] = useState<3 | 5 | 10>(3)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // Start Camera
  const startCamera = async (mode: 'Front' | 'Back' = 'Front') => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      const constraintMode = mode === 'Front' ? 'user' : 'environment'
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: constraintMode },
        audio: false
      })
      setStream(mediaStream)
      streamRef.current = mediaStream
      setHasPermission(true)

      // Auto-detect actual facing mode from track settings if possible
      const tracks = mediaStream.getVideoTracks()
      if (tracks.length > 0) {
        const settings = tracks[0].getSettings()
        if (settings.facingMode) {
          setFacingMode(settings.facingMode === 'environment' ? 'Back' : 'Front')
        } else {
          setFacingMode(mode)
        }
      } else {
        setFacingMode(mode)
      }

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setHasPermission(false)
    }
  }

  // Toggle Camera
  const toggleCamera = async () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      streamRef.current = null
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    } else {
      await startCamera(facingMode)
    }
  }

  // Switch between front and back camera
  const switchCamera = async () => {
    const nextMode = facingMode === 'Front' ? 'Back' : 'Front'
    await startCamera(nextMode)
  }

  // List of camera effects
  const effectsList: ('normal' | 'vintage' | 'bnw' | 'teal_orange')[] = ['normal', 'vintage', 'bnw', 'teal_orange']

  // Switch to previous effect
  const prevEffect = () => {
    const currentIndex = effectsList.indexOf(activeEffect)
    const nextIndex = (currentIndex - 1 + effectsList.length) % effectsList.length
    setActiveEffect(effectsList[nextIndex])
  }

  // Switch to next effect
  const nextEffect = () => {
    const currentIndex = effectsList.indexOf(activeEffect)
    const nextIndex = (currentIndex + 1) % effectsList.length
    setActiveEffect(effectsList[nextIndex])
  }

  // Cycle Timer
  const cycleTimer = () => {
    if (isRecording) return
    setTimerDuration(prev => {
      if (prev === 3) return 5
      if (prev === 5) return 10
      return 3
    })
  }

  // Reset captured photos
  const resetPhotos = () => {
    setTakenPhotos([])
    setIsRecording(false)
    setCountdown(null)
  }

  // Take photo countdown trigger
  const takePhoto = () => {
    if (!stream || isRecording) return
    // Reset if we already took photos and want to take a new strip
    if (takenPhotos.length >= numPhotos) {
      setTakenPhotos([])
    }
    setIsRecording(true)
    setCountdown(timerDuration)
  }

  // Countdown timer and capture frame logic
  useEffect(() => {
    if (countdown === null) return

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }

    if (countdown === 0) {
      // Capture frame
      if (videoRef.current) {
        const video = videoRef.current
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth || 640
        canvas.height = video.videoHeight || 480
        const ctx = canvas.getContext('2d')
        if (ctx) {
          // Mirror image
          ctx.translate(canvas.width, 0)
          ctx.scale(-1, 1)

          // Apply filter to canvas before drawing
          if (activeEffect === 'vintage') {
            ctx.filter = 'sepia(0.4) contrast(1.1) brightness(0.95) saturate(1.2)'
          } else if (activeEffect === 'bnw') {
            ctx.filter = 'grayscale(1) contrast(1.2)'
          } else if (activeEffect === 'teal_orange') {
            ctx.filter = 'saturate(1.3) contrast(1.1) sepia(0.1) hue-rotate(-15deg)'
          } else {
            ctx.filter = 'none'
          }

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          const dataUrl = canvas.toDataURL('image/png')

          setTakenPhotos(prev => {
            const nextPhotos = [...prev, dataUrl]
            setIsRecording(false)
            setCountdown(null)
            return nextPhotos
          })
        }
      }
    }
  }, [countdown, timerDuration, numPhotos, stream, activeEffect])

  useEffect(() => {
    startCamera('Front')
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  // Create an array for the strip preview
  const previewSlots = Array.from({ length: numPhotos })

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-hf-bg via-[#fadde4] to-hf-secondary pt-[50px] lg:pt-[72px] flex flex-col transition-all duration-300">
      <DecorativeBackground />
      <Navbar />

      <div className={`w-full flex-grow flex flex-col justify-between relative transition-all duration-300 ${isFullscreen ? 'p-4' : 'px-4 pt-2 pb-4 sm:px-6 lg:px-8'}`}>
        <div>
          {/* Main Card */}
          <div className={`relative rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-sm overflow-hidden transition-all duration-300 ${isFullscreen ? 'p-4' : 'p-6'}`}>

            {/* Header */}
            {/* <div className="mb-4 relative">
            <h1 className="font-serif text-xl lg:text-2xl font-bold text-hf-rose flex items-center gap-2">
              Photobox Hanfleur
              <Heart className="h-6 w-6 text-pink-400 fill-pink-400" />
            </h1>
            <p className="text-sm text-hf-text/70 mt-1">
              Abadikan momen manismu dalam setiap senyuman.
            </p>
          </div> */}

            <div className={`grid grid-cols-1 ${isFullscreen ? 'lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_260px] gap-6' : 'lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-8'} items-start relative z-10 transition-all duration-300`}>

              {/* LEFT COLUMN: Camera & Controls */}
              <div className="flex flex-col gap-6">

                {/* Camera Viewport */}
                <div className="relative aspect-[4/3] sm:aspect-video bg-[#f0f0f0] rounded-2xl overflow-hidden border-[6px] border-[#ffb3c6]/40 shadow-inner">
                  {/* Real Camera Feed */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      filter: activeEffect === 'vintage'
                        ? 'sepia(0.4) contrast(1.1) brightness(0.95) saturate(1.2)'
                        : activeEffect === 'bnw'
                          ? 'grayscale(1) contrast(1.2)'
                          : activeEffect === 'teal_orange'
                            ? 'saturate(1.3) contrast(1.1) sepia(0.1) hue-rotate(-15deg)'
                            : 'none'
                    }}
                    className="w-full h-full object-cover -scale-x-100"
                  />

                  {/* Permission Overlay */}
                  {hasPermission === false && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white p-4 text-center">
                      <Camera className="h-12 w-12 mb-3 text-white/50" />
                      <p className="font-semibold">Akses Kamera Ditolak</p>
                      <p className="text-sm text-white/70 mt-1">Harap izinkan akses kamera di browser Anda untuk menggunakan photobox.</p>
                      <button onClick={() => startCamera()} className="mt-4 px-4 py-2 bg-hf-rose rounded-full text-sm font-semibold text-white hover:bg-[#e02e5b] transition">
                        Coba Lagi
                      </button>
                    </div>
                  )}

                  {/* Overlays (Only show when has permission) */}
                  {hasPermission && (
                    <>
                      {/* Top Left: Camera Toggle Button */}
                      <button
                        onClick={toggleCamera}
                        className="absolute top-3 left-3 bg-white/20 backdrop-blur hover:bg-white/30 text-xs font-medium text-hf-rose px-3 py-2 rounded-full flex items-center gap-2 shadow-sm transition-all active:scale-95 z-30"
                      >
                        <span className={`w-2 h-2 rounded-full ${stream ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                        {stream ? 'On' : 'Off'}
                      </button>

                      {/* Top Center: Lihat ke kamera */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur text-xs font-semibold text-white px-4 py-1.5 rounded-full shadow-sm">
                        {stream ? 'Senyum 💖' : 'Camera Off'}
                      </div>

                      {/* Top Right: Timer Selector */}
                      <button
                        onClick={cycleTimer}
                        disabled={isRecording}
                        className={`absolute top-3 right-3 bg-white/20 backdrop-blur hover:bg-white/30 text-xs font-bold text-hf-rose px-3 py-2 rounded-full flex items-center gap-1.5 shadow-sm transition-all active:scale-95 z-30 ${isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Durasi timer (3 sec, 5 sec, 10 sec)"
                      >
                        {timerDuration} detik
                      </button>

                      {/* Center Countdown Overlay */}
                      {countdown !== null && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                          <span className="text-9xl font-black text-white/20 drop-shadow-sm select-none">
                            {countdown}
                          </span>
                        </div>
                      )}

                      {/* Bottom Left: Progress */}
                      <div className="absolute bottom-3 left-3 font-bold text-white text-sm drop-shadow-md z-30 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        {takenPhotos.length >= numPhotos
                          ? `Selesai! (${numPhotos} Foto)`
                          : `${takenPhotos.length + 1} dari ${numPhotos}`}
                      </div>

                      {/* Bottom Center: Camera Shutter Button */}
                      <button
                        onClick={takePhoto}
                        disabled={isRecording || !stream}
                        className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-white hover:bg-hf-rose text-[#ff3a70] hover:text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white transition-all active:scale-90 z-30 ${isRecording || !stream ? 'opacity-50 cursor-not-allowed scale-95' : ''}`}
                      >
                        <Camera className="h-6 w-6" />
                      </button>

                      {/* Bottom Right: Fullscreen Toggle */}
                      <button
                        onClick={toggleFullscreen}
                        className="absolute bottom-3 right-3 bg-black/40 backdrop-blur hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 z-30 border border-white/10"
                        title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                      >
                        {isFullscreen ? (
                          <Minimize className="h-5 w-5" />
                        ) : (
                          <Maximize className="h-5 w-5" />
                        )}
                      </button>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                  <button
                    onClick={takePhoto}
                    disabled={isRecording || !stream}
                    className={`flex-1 min-w-[140px] py-3 px-4 bg-[#ff3a70] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#e02e5b] transition-colors shadow-sm ${isRecording || !stream ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Camera className="h-4 w-4" />
                    Ambil Foto
                  </button>
                  <div className="flex-1 min-w-[280px] sm:min-w-[360px] flex gap-2 sm:gap-3">
                    <button
                      onClick={resetPhotos}
                      className="flex-1 py-3 px-2 sm:px-4 bg-white text-hf-text border border-gray-200 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Ulangi
                    </button>
                    <div className="flex-1 relative flex">
                      {showEffectsPanel && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white/95 backdrop-blur-sm border border-pink-100 rounded-2xl shadow-xl px-2 py-1.5 flex items-center justify-between gap-2 min-w-[160px] z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
                          {/* Triangle tip on the bottom */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white/95 filter drop-shadow-[0_1px_0_rgba(244,114,182,0.1)]"></div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              prevEffect()
                            }}
                            className="p-1 hover:bg-hf-rose/10 text-hf-text hover:text-[#ff3a70] rounded-lg transition-colors"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>

                          <span className="text-[10px] sm:text-xs font-bold text-hf-text tracking-wide select-none">
                            {activeEffect === 'normal' && 'Normal'}
                            {activeEffect === 'vintage' && 'Vintage'}
                            {activeEffect === 'bnw' && 'B&W'}
                            {activeEffect === 'teal_orange' && 'Teal & Orange'}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              nextEffect()
                            }}
                            className="p-1 hover:bg-hf-rose/10 text-hf-text hover:text-[#ff3a70] rounded-lg transition-colors"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => setShowEffectsPanel(prev => !prev)}
                        className={`w-full py-3 px-2 sm:px-4 border rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-sm ${showEffectsPanel
                          ? 'bg-hf-rose/10 text-[#ff3a70] border-pink-300'
                          : 'bg-white text-hf-text border-gray-200 hover:bg-gray-50'
                          }`}
                      >
                        <SmilePlus className="h-4 w-4" />
                        Efek
                      </button>
                    </div>
                    <button
                      onClick={switchCamera}
                      className="flex-1 py-3 px-2 sm:px-4 bg-white text-hf-text border border-gray-200 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <SwitchCamera className="h-4 w-4" />
                      {facingMode}
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      if (takenPhotos.length < numPhotos) {
                        toast.error(`Selesaikan pengambilan ${numPhotos} foto terlebih dahulu!`);
                        return;
                      }
                      setShowPreviewModal(true);
                    }}
                    className={`flex-1 min-w-[140px] py-3 px-4 bg-[#ff3a70] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm hover:bg-[#e02e5b] ${takenPhotos.length < numPhotos ? 'cursor-not-allowed' : ''}`}
                  >
                    Lanjutkan
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Strip Design Selection */}
                <div className="mt-2 bg-white/40 p-4 rounded-2xl border border-white/50">
                  <h3 className="text-sm font-bold text-hf-text mb-3">Pilih Desain Strip Favoritmu</h3>
                  <div className="flex gap-3 overflow-x-auto pt-3 pb-3 px-3 -mx-3 scrollbar-none snap-x snap-mandatory">
                    {photoboxDesigns.map((design) => {
                      const isSelected = selectedDesignId === design.id;
                      return (
                        <div
                          key={design.id}
                          onClick={() => setSelectedDesignId(design.id)}
                          className="relative shrink-0 snap-start cursor-pointer group"
                        >
                          <div className={`w-20 h-full rounded-xl overflow-hidden bg-white shadow-md transition-all duration-300 border-2 ${isSelected ? 'border-[#ff3a70] scale-105 -translate-y-0.5 shadow-lg' : 'border-transparent group-hover:border-hf-rose/30'}`}>
                            <img
                              src={`/photobox/photobox-example/${design.file}`}
                              alt={design.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {isSelected && (
                            <div className="absolute -top-2.5 -right-2.5 bg-gradient-to-br from-[#ff5e8e] to-[#ff3a70] text-white rounded-full p-1 shadow-[0_4px_10px_rgba(255,58,112,0.45),inset_0_2px_3px_rgba(255,255,255,0.35)] border-2 border-white scale-110 z-10 transition-all duration-300 flex items-center justify-center animate-in zoom-in-50 duration-200">
                              <Check className="h-3 w-3 stroke-[4]" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <p className="text-xs text-hf-text/50 mt-1">Desain ini akan digunakan untuk strip fotomu.</p>
                </div>

              </div>

              {/* RIGHT COLUMN: Settings & Preview */}
              <div className="flex flex-col gap-6 lg:mt-0 lg:self-start">

                {/* Jumlah Foto Settings */}
                <div>
                  <div className={`flex gap-3 ${isFullscreen ? 'mx-auto w-[160px] lg:w-[180px]' : 'gap-4'}`}>
                    <button
                      onClick={() => setNumPhotos(3)}
                      className={`flex-1 transition-all border font-bold ${isFullscreen
                        ? 'py-1.5 px-2 rounded-lg text-xs'
                        : 'py-2 rounded-xl text-sm'
                        } ${numPhotos === 3
                          ? 'bg-[#ffeaef] text-[#ff3a70] border-[#ff3a70]'
                          : 'bg-white text-hf-text border-gray-200 hover:border-hf-rose/30'
                        }`}
                    >
                      3 Foto
                    </button>
                    <button
                      onClick={() => setNumPhotos(4)}
                      className={`flex-1 transition-all border font-bold ${isFullscreen
                        ? 'py-1.5 px-2 rounded-lg text-xs'
                        : 'py-2 rounded-xl text-sm'
                        } ${numPhotos === 4
                          ? 'bg-[#ffeaef] text-[#ff3a70] border-[#ff3a70]'
                          : 'bg-white text-hf-text border-gray-200 hover:border-hf-rose/30'
                        }`}
                    >
                      4 Foto
                    </button>
                  </div>
                </div>

                {/* Strip Preview Container */}
                <div className="flex-1 min-h-[400px]">

                  {/* Strip Component */}
                  <div className="mx-auto w-[160px] lg:w-[180px] bg-white p-2 rounded-md shadow-sm border-2 border-[#ff3a70]/20 flex flex-col gap-2 relative overflow-hidden">

                    {/* Decorative Background for Strip based on selection */}
                    <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
                      {selectedDesignId && (
                        <img
                          src={`/photobox/photobox-example/${photoboxDesigns.find(d => d.id === selectedDesignId)?.file}`}
                          alt="Strip Background"
                          className="w-full h-full object-cover blur-sm opacity-50"
                        />
                      )}
                    </div>

                    {/* Slots */}
                    <div className="flex flex-col gap-2 relative z-10">
                      {previewSlots.map((_, i) => {
                        const photo = takenPhotos[i];
                        return (
                          <div key={i} className="aspect-[5/3] bg-gray-100/80 backdrop-blur-sm rounded border border-gray-200 flex items-center justify-center shadow-inner overflow-hidden relative">
                            {photo ? (
                              <img src={photo} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xl font-bold text-gray-400">{i + 1}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer */}
                    <div className="mt-2 text-center relative z-10 bg-white/80 py-1 rounded backdrop-blur">
                      <p className="font-serif text-[#ff3a70] font-bold text-sm leading-none">Hanfleur</p>
                      <p className="font-serif text-[#ff3a70] font-bold text-sm leading-none mt-0.5">Florist</p>
                    </div>
                  </div>
                </div>

                {/* Tips Card */}
                <div className="bg-[#fff0f4] rounded-2xl p-5 border border-hf-rose/10">
                  <h4 className="text-sm font-bold text-hf-rose flex items-center gap-2 mb-3">
                    Tips Foto Cantik <Sparkles className="h-4 w-4 text-[#c9965b]" />
                  </h4>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-2 text-xs text-hf-text/70">
                      <Maximize className="h-3.5 w-3.5 text-hf-rose shrink-0 mt-0.5" />
                      <span>Lihat ke kamera</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-hf-text/70">
                      <Smile className="h-3.5 w-3.5 text-hf-rose shrink-0 mt-0.5" />
                      <span>Posisi wajah di tengah</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-hf-text/70">
                      <Sun className="h-3.5 w-3.5 text-hf-rose shrink-0 mt-0.5" />
                      <span>Gunakan pencahayaan yang baik</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-hf-text/70">
                      <Heart className="h-3.5 w-3.5 text-hf-rose shrink-0 mt-0.5" />
                      <span>Tersenyum dan nikmati momenmu!</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            <div className="mt-8 text-center border-t border-hf-rose/10 pt-4 relative z-10">
              <p className="text-xs text-hf-text/50 flex items-center justify-center gap-1.5">
                💡 Kamu bisa ganti desain kapan saja sebelum cetak.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <PhotoboxStep1Dialog 
        isOpen={showPreviewModal}
        onOpenChange={setShowPreviewModal}
        selectedDesignId={selectedDesignId}
        photoboxDesigns={photoboxDesigns}
        takenPhotos={takenPhotos}
        numPhotos={numPhotos}
        resetPhotos={resetPhotos}
      />
    </main>
  )
}
