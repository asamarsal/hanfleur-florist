'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import { X, Download, ZoomIn, ZoomOut } from 'lucide-react'

// Set worker url
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

export function PdfModal({
  file,
  children,
}: {
  file: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>()
  const [containerHeight, setContainerHeight] = useState<number>()
  const [pageDimensions, setPageDimensions] = useState<{ width: number; height: number }>()

  useEffect(() => {
    if (!open || !containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        // Subtract padding (32px total for p-4) to prevent overflow
        setContainerWidth(entries[0].contentRect.width - 32)
        setContainerHeight(entries[0].contentRect.height - 32)
      }
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [open])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function onPageLoadSuccess(page: any): void {
    setPageDimensions({
      width: page.originalWidth || page.width,
      height: page.originalHeight || page.height,
    })
  }

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3.0))
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.4))

  // Touch handlers for swipe navigation on mobile
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const touchEndY = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchStartY.current = e.targetTouches[0].clientY
    touchEndX.current = e.targetTouches[0].clientX
    touchEndY.current = e.targetTouches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
    touchEndY.current = e.targetTouches[0].clientY
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || !touchStartY.current || !touchEndY.current) return
    if (scale > 1.0) return // Allow user to pan left/right freely when zoomed in

    const distanceX = touchStartX.current - touchEndX.current
    const distanceY = touchStartY.current - touchEndY.current

    // Ignore if vertical swipe distance is larger than horizontal swipe distance (it's a scroll)
    if (Math.abs(distanceY) > Math.abs(distanceX)) return

    const isLeftSwipe = distanceX > 50
    const isRightSwipe = distanceX < -50

    if (isLeftSwipe && numPages && pageNumber < numPages) {
      setPageNumber((prev) => prev + 1)
    } else if (isRightSwipe && pageNumber > 1) {
      setPageNumber((prev) => prev - 1)
    }
  }

  // Calculate dynamic scale to fit the page width completely in the container
  let finalScale = scale
  if (containerWidth && pageDimensions) {
    // Fit to 100% of container width (which already excludes padding)
    const fitScale = containerWidth / pageDimensions.width
    finalScale = fitScale * scale
  } else {
    // Fallback scale before dimensions are loaded to prevent massive initial render
    finalScale = scale * 0.65
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="flex max-h-[90vh] sm:max-h-[95vh] h-[90vh] sm:h-[95vh] w-full flex-col overflow-hidden p-0 bg-[#fcf8f9] gap-0 border-none shadow-xl [&>button]:hidden !bottom-0 !top-auto !translate-y-0 !rounded-b-none !rounded-t-[32px] !max-w-full sm:!max-w-[800px] sm:!bottom-auto sm:!top-[50%] sm:!-translate-y-1/2 sm:!rounded-[32px]"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">Katalog PDF</DialogTitle>

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-hf-border bg-white px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-hf-cream text-hf-text transition-colors hover:bg-hf-accent/10 hover:text-hf-rose"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="font-bold text-hf-text hidden sm:block">Katalog Hanfleur Florist</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={zoomOut} className="p-2 rounded-full hover:bg-hf-cream text-hf-text" aria-label="Zoom Out">
              <ZoomOut className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium w-12 text-center">{Math.round(scale * 100)}%</span>
            <button onClick={zoomIn} className="p-2 rounded-full hover:bg-hf-cream text-hf-text" aria-label="Zoom In">
              <ZoomIn className="h-5 w-5" />
            </button>
            <div className="w-px h-6 bg-hf-border mx-1"></div>
            <a href={file} download className="p-2 rounded-full hover:bg-hf-cream text-hf-text" aria-label="Download PDF">
              <Download className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div
          ref={containerRef}
          className="flex-1 overflow-auto bg-[#f4f0f1] p-4 relative flex justify-center items-start"
          id="pdf-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex h-32 w-full items-center justify-center text-sm text-hf-text font-medium animate-pulse">
                Memuat Katalog...
              </div>
            }
            className="flex flex-col items-center justify-center my-auto"
          >
            <Page
              pageNumber={pageNumber}
              scale={finalScale}
              onLoadSuccess={onPageLoadSuccess}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-md rounded-sm overflow-hidden bg-white max-w-none"
            />
          </Document>
        </div>

        {/* Footer Navigation */}
        <div className="flex shrink-0 items-center justify-between border-t border-hf-border bg-white px-4 py-3 sm:px-6">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(prev => prev - 1)}
            className="flex items-center gap-2 rounded-xl bg-[#ff3a70] px-4 py-2 text-sm font-bold text-white hover:bg-[#cf4067] disabled:opacity-50 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m15 18-6-6 6-6" /></svg>
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>
          <span className="text-sm font-medium text-hf-text">
            Halaman {pageNumber} dari {numPages || '-'}
          </span>
          <button
            disabled={!numPages || pageNumber >= numPages}
            onClick={() => setPageNumber(prev => prev + 1)}
            className="flex items-center gap-2 rounded-xl bg-[#ff3a70] px-4 py-2 text-sm font-bold text-white hover:bg-[#cf4067] disabled:opacity-50 transition-all"
          >
            <span className="hidden sm:inline">Selanjutnya</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
