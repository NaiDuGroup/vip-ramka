"use client"

import Image from "next/image"

interface FramePreviewProps {
  logoSize: number
  logoPosition: { x: number; y: number }
  showLogo: boolean
  frameColor: string
  customText?: string
  textPosition: { x: number; y: number }
  textSize: number
  textColor: string
  frameStyle: string
}

export function FramePreview({
  logoSize,
  logoPosition,
  showLogo,
  frameColor,
  customText,
  textPosition,
  textSize,
  textColor,
  frameStyle,
}: FramePreviewProps) {
  const getFrameStyles = () => {
    const baseStyles = "absolute inset-0 rounded-lg"
    switch (frameStyle) {
      case "premium":
        return `${baseStyles} bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl`
      case "sport":
        return `${baseStyles} bg-gradient-to-r from-red-600 to-red-800 shadow-xl`
      case "elegant":
        return `${baseStyles} bg-gradient-to-r from-blue-800 to-blue-900 shadow-xl`
      default:
        return baseStyles
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Preview Container */}
      <div className="relative aspect-[5/2] bg-card rounded-xl p-6 shadow-2xl">
        {/* Frame Container */}
        <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden shadow-inner">
          {/* License Plate Frame */}
          <div
            className={getFrameStyles()}
            style={{
              backgroundColor: frameColor,
              filter: frameStyle !== "classic" ? "none" : undefined,
            }}
          >
            <Image src="/images/plate-frame.png" alt="License Plate Frame" fill className="object-contain opacity-90" />
          </div>

          {/* Sample License Plate */}
          <div className="absolute inset-6 bg-white rounded border-2 border-gray-400 flex items-center justify-center shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 tracking-wider font-mono">ABC 123</div>
              <div className="text-sm text-gray-700 mt-1 font-semibold">MOLDOVA</div>
            </div>
          </div>

          {/* Logo Overlay */}
          {showLogo && (
            <div
              className="absolute pointer-events-none z-10"
              style={{
                left: `${logoPosition.x}%`,
                top: `${logoPosition.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Image
                src="/images/vip-logo.png"
                alt="VIP Logo"
                width={logoSize}
                height={logoSize}
                className="object-contain drop-shadow-lg"
              />
            </div>
          )}

          {/* Custom Text Overlay */}
          {customText && (
            <div
              className="absolute pointer-events-none z-10 font-bold"
              style={{
                left: `${textPosition.x}%`,
                top: `${textPosition.y}%`,
                transform: "translate(-50%, -50%)",
                fontSize: `${textSize}px`,
                color: textColor,
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              {customText}
            </div>
          )}
        </div>
      </div>

      {/* Preview Info */}
      <div className="mt-6 text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">VIP.RAMKA.MD - Персонализированная рамка</h3>
        <p className="text-sm text-muted-foreground">Предварительный просмотр вашего дизайна</p>
        <div className="flex justify-center gap-4 text-xs text-muted-foreground">
          <span>Стиль: {frameStyle}</span>
          <span>•</span>
          <span>Цвет: {frameColor}</span>
          {customText && (
            <>
              <span>•</span>
              <span>Текст: "{customText}"</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
