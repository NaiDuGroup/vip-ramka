"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { OrderForm } from "./order-form"
import { useLanguage } from "@/hooks/use-language"
import { 
  Type, Download, Save, RotateCcw, ArrowRight, Upload, Move, 
  Layers, Eye, EyeOff, Trash2, Copy, AlignCenter, AlignLeft, 
  AlignRight, Bold, Italic, Underline, Palette, ZoomIn, ZoomOut,
  Grid, Ruler, MousePointer, Hand
} from "lucide-react"

// Types for layers
interface Layer {
  id: string
  type: 'text' | 'image'
  visible: boolean
  locked: boolean
  name: string
  zIndex: number
  // Text specific
  text?: string
  fontSize?: number
  fontFamily?: string
  fontWeight?: string
  fontStyle?: string
  textAlign?: 'left' | 'center' | 'right'
  textColor?: string
  // Image specific
  src?: string
  // Common properties
  x: number
  y: number
  width: number
  height: number
  rotation?: number
  opacity?: number
}

export function FrameConstructor() {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameImageRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map())
  
  // Editor state
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [selectedTool, setSelectedTool] = useState<'select' | 'text' | 'image' | 'hand'>('select')
  const [zoom, setZoom] = useState(1)
  const [showGrid, setShowGrid] = useState(false)
  const [showRulers, setShowRulers] = useState(false)
  
  // Layers system
  const [layers, setLayers] = useState<Layer[]>([])
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null)
  const [nextLayerId, setNextLayerId] = useState(1)
  
  // Interaction state
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeHandle, setResizeHandle] = useState<string | null>(null)
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 })
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 })

  const customConfiguration = {
    layers,
    zoom,
    canvasWidth: 600,
    canvasHeight: 300,
  }

  // Get selected layer
  const selectedLayer = layers.find(layer => layer.id === selectedLayerId)

  // Get resize handles for a layer
  const getResizeHandles = (layer: Layer) => {
    const handleSize = 8
    const handles = [
      { id: 'nw', x: layer.x - handleSize/2, y: layer.y - handleSize/2, cursor: 'nw-resize' },
      { id: 'ne', x: layer.x + layer.width - handleSize/2, y: layer.y - handleSize/2, cursor: 'ne-resize' },
      { id: 'sw', x: layer.x - handleSize/2, y: layer.y + layer.height - handleSize/2, cursor: 'sw-resize' },
      { id: 'se', x: layer.x + layer.width - handleSize/2, y: layer.y + layer.height - handleSize/2, cursor: 'se-resize' },
      { id: 'n', x: layer.x + layer.width/2 - handleSize/2, y: layer.y - handleSize/2, cursor: 'n-resize' },
      { id: 's', x: layer.x + layer.width/2 - handleSize/2, y: layer.y + layer.height - handleSize/2, cursor: 's-resize' },
      { id: 'w', x: layer.x - handleSize/2, y: layer.y + layer.height/2 - handleSize/2, cursor: 'w-resize' },
      { id: 'e', x: layer.x + layer.width - handleSize/2, y: layer.y + layer.height/2 - handleSize/2, cursor: 'e-resize' }
    ]
    return handles.map(handle => ({ ...handle, size: handleSize }))
  }

  // Check if point is in resize handle
  const getResizeHandleAt = (x: number, y: number, layer: Layer) => {
    const handles = getResizeHandles(layer)
    for (const handle of handles) {
      if (x >= handle.x && x <= handle.x + handle.size &&
          y >= handle.y && y <= handle.y + handle.size) {
        return handle
      }
    }
    return null
  }

  // Layer management functions
  const addTextLayer = () => {
    const newLayer: Layer = {
      id: `layer-${nextLayerId}`,
      type: 'text',
      visible: true,
      locked: false,
      name: `Text ${nextLayerId}`,
      zIndex: layers.length,
      text: 'Edit Text',
      fontSize: 24,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fontStyle: 'normal',
      textAlign: 'center',
      textColor: '#FFFFFF',
      x: 300,
      y: 150,
      width: 200,
      height: 50,
      rotation: 0,
      opacity: 1
    }
    setLayers([...layers, newLayer])
    setSelectedLayerId(newLayer.id)
    setNextLayerId(nextLayerId + 1)
  }

  const addImageLayer = (src: string) => {
    // Pre-load the image to get its natural dimensions
    const img = new Image()
    img.onload = () => {
      // Calculate appropriate size while maintaining aspect ratio
      const maxSize = 150
      let width = img.naturalWidth
      let height = img.naturalHeight
      
      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width
          width = maxSize
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height
          height = maxSize
        }
      }
      
      const newLayer: Layer = {
        id: `layer-${nextLayerId}`,
        type: 'image',
        visible: true,
        locked: false,
        name: `Image ${nextLayerId}`,
        zIndex: layers.length,
        src,
        x: 225, // Center horizontally (600/2 - width/2)
        y: 75,  // Center vertically (300/2 - height/2)
        width: Math.round(width),
        height: Math.round(height),
        rotation: 0,
        opacity: 1
      }
      
      // Cache the image for faster rendering
      imageCache.current.set(src, img)
      
      setLayers(prev => [...prev, newLayer])
      setSelectedLayerId(newLayer.id)
      setNextLayerId(prev => prev + 1)
    }
    img.src = src
  }

  const updateLayer = (layerId: string, updates: Partial<Layer>) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, ...updates } : layer
    ))
  }

  const deleteLayer = (layerId: string) => {
    setLayers(layers.filter(layer => layer.id !== layerId))
    if (selectedLayerId === layerId) {
      setSelectedLayerId(null)
    }
  }

  const duplicateLayer = (layerId: string) => {
    const layer = layers.find(l => l.id === layerId)
    if (!layer) return
    
    const newLayer: Layer = {
      ...layer,
      id: `layer-${nextLayerId}`,
      name: `${layer.name} Copy`,
      x: layer.x + 20,
      y: layer.y + 20,
      zIndex: layers.length
    }
    setLayers([...layers, newLayer])
    setNextLayerId(nextLayerId + 1)
  }

  // Canvas drawing function with high-DPI support
  const drawCanvas = () => {
    const canvas = canvasRef.current
    let frameImage = frameImageRef.current
    
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Get device pixel ratio for high-DPI displays
    const devicePixelRatio = window.devicePixelRatio || 1
    const canvasWidth = 600
    const canvasHeight = 300
    
    // Set canvas internal size (high resolution)
    canvas.width = canvasWidth * devicePixelRatio
    canvas.height = canvasHeight * devicePixelRatio
    
    // Set canvas display size (CSS)
    canvas.style.width = canvasWidth + 'px'
    canvas.style.height = canvasHeight + 'px'
    
    // Scale the drawing context to match device pixel ratio
    ctx.scale(devicePixelRatio, devicePixelRatio)
    
    // Enable high-quality rendering
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.textRenderingOptimization = 'optimizeQuality'
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    
    // Draw grid if enabled
    if (showGrid) {
      ctx.strokeStyle = '#e0e0e0'
      ctx.lineWidth = 1
      const gridSize = 20
      
      for (let x = 0; x <= canvasWidth; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvasHeight)
        ctx.stroke()
      }
      
      for (let y = 0; y <= canvasHeight; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvasWidth, y)
        ctx.stroke()
      }
    }
    
    // Fill the canvas background first
    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    
    // Draw frame background with proper aspect ratio
    if (frameImage && frameImage.complete && frameImage.naturalWidth > 0) {
      ctx.globalAlpha = 1
      
      // Calculate aspect ratios
      const canvasAspect = canvasWidth / canvasHeight
      const imageAspect = frameImage.naturalWidth / frameImage.naturalHeight
      
      let drawWidth, drawHeight, offsetX, offsetY
      
      if (imageAspect > canvasAspect) {
        // Image is wider than canvas
        drawWidth = canvasWidth
        drawHeight = canvasWidth / imageAspect
        offsetX = 0
        offsetY = (canvasHeight - drawHeight) / 2
      } else {
        // Image is taller than canvas
        drawHeight = canvasHeight
        drawWidth = canvasHeight * imageAspect
        offsetX = (canvasWidth - drawWidth) / 2
        offsetY = 0
      }
      
      // Draw the frame image with proper aspect ratio and high quality
      ctx.drawImage(frameImage, offsetX, offsetY, drawWidth, drawHeight)
    } else {
      // Fallback: try to load frame image directly if ref isn't working
      if (!frameImage || !frameImage.complete) {
        frameImage = new Image()
        frameImage.onload = () => {
          drawCanvas()
        }
        frameImage.src = '/images/plate-frame.png'
        
        // Store in cache for next time
        imageCache.current.set('/images/plate-frame.png', frameImage)
      }
    }
    
    // Draw layers in z-index order
    const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex)
    
    sortedLayers.forEach(layer => {
      if (!layer.visible) return
      
      ctx.save()
      ctx.globalAlpha = layer.opacity || 1
      
      // Apply transformations
      ctx.translate(layer.x + layer.width / 2, layer.y + layer.height / 2)
      if (layer.rotation) {
        ctx.rotate((layer.rotation * Math.PI) / 180)
      }
      ctx.translate(-layer.width / 2, -layer.height / 2)
      
      if (layer.type === 'text' && layer.text) {
        // Draw text
        const fontSize = layer.fontSize || 24
        const fontFamily = layer.fontFamily || 'Arial'
        const fontWeight = layer.fontWeight || 'normal'
        const fontStyle = layer.fontStyle || 'normal'
        
        ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
        ctx.fillStyle = layer.textColor || '#FFFFFF'
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 1
        ctx.textAlign = layer.textAlign || 'center'
        ctx.textBaseline = 'middle'
        
        const textX = layer.textAlign === 'center' ? layer.width / 2 : 
                     layer.textAlign === 'right' ? layer.width : 0
        const textY = layer.height / 2
        
        ctx.strokeText(layer.text, textX, textY)
        ctx.fillText(layer.text, textX, textY)
      } else if (layer.type === 'image' && layer.src) {
        // Draw image from cache or create new one
        let img = imageCache.current.get(layer.src)
        
        if (!img) {
          img = new Image()
          img.onload = () => {
            // Redraw canvas when image loads
            drawCanvas()
          }
          img.src = layer.src
          imageCache.current.set(layer.src, img)
        }
        
        if (img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, 0, 0, layer.width, layer.height)
        }
      }
      
      // Draw selection outline and resize handles
      if (layer.id === selectedLayerId) {
        ctx.strokeStyle = '#007bff'
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.strokeRect(-2, -2, layer.width + 4, layer.height + 4)
        ctx.setLineDash([])
        
        // Draw resize handles for images
        if (layer.type === 'image') {
          ctx.restore() // Restore to reset transformations
          
          const handles = getResizeHandles(layer)
          ctx.fillStyle = '#007bff'
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 1
          
          handles.forEach(handle => {
            ctx.fillRect(handle.x, handle.y, handle.size, handle.size)
            ctx.strokeRect(handle.x, handle.y, handle.size, handle.size)
          })
          
          // Re-save for next layer
          ctx.save()
        }
      }
      
      ctx.restore()
    })
  }

  // Effect to redraw canvas when state changes
  useEffect(() => {
    drawCanvas()
  }, [layers, selectedLayerId, showGrid, zoom])

  // Initialize canvas on mount
  useEffect(() => {
    const canvas = canvasRef.current
    const frameImage = frameImageRef.current
    
    if (canvas) {
      // Set initial canvas size
      const devicePixelRatio = window.devicePixelRatio || 1
      canvas.width = 600 * devicePixelRatio
      canvas.height = 300 * devicePixelRatio
      canvas.style.width = '600px'
      canvas.style.height = '300px'
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(devicePixelRatio, devicePixelRatio)
      }
    }
    
    // Ensure frame image loads
    if (frameImage && !frameImage.complete) {
      frameImage.onload = () => {
        console.log('Frame image loaded on init')
        drawCanvas()
      }
    } else if (frameImage && frameImage.complete) {
      // Image already loaded, draw immediately
      drawCanvas()
    }
  }, [])

  // Handle file upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        addImageLayer(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle canvas mouse events
  const handleCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    // Account for zoom and canvas scaling
    const scaleX = 600 / rect.width
    const scaleY = 300 / rect.height
    const x = (event.clientX - rect.left) * scaleX
    const y = (event.clientY - rect.top) * scaleY
    
    // Check if clicking on selected layer's resize handle first
    if (selectedLayer && selectedLayer.type === 'image') {
      const handle = getResizeHandleAt(x, y, selectedLayer)
      if (handle) {
        setIsResizing(true)
        setResizeHandle(handle.id)
        setResizeStartSize({ width: selectedLayer.width, height: selectedLayer.height })
        setResizeStartPos({ x, y })
        return
      }
    }
    
    // Find clicked layer (top to bottom)
    const sortedLayers = [...layers].sort((a, b) => b.zIndex - a.zIndex)
    
    for (const layer of sortedLayers) {
      if (!layer.visible || layer.locked) continue
      
      if (
        x >= layer.x &&
        x <= layer.x + layer.width &&
        y >= layer.y &&
        y <= layer.y + layer.height
      ) {
        setSelectedLayerId(layer.id)
        setIsDragging(true)
        setDragOffset({ x: x - layer.x, y: y - layer.y })
        return
      }
    }
    
    // If no layer clicked, deselect
    setSelectedLayerId(null)
  }

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    // Account for zoom and canvas scaling
    const scaleX = 600 / rect.width
    const scaleY = 300 / rect.height
    const x = (event.clientX - rect.left) * scaleX
    const y = (event.clientY - rect.top) * scaleY
    
    // Update cursor based on hover state
    if (!isDragging && !isResizing && selectedLayer && selectedLayer.type === 'image') {
      const handle = getResizeHandleAt(x, y, selectedLayer)
      if (handle) {
        canvas.style.cursor = handle.cursor
      } else if (x >= selectedLayer.x && x <= selectedLayer.x + selectedLayer.width &&
                 y >= selectedLayer.y && y <= selectedLayer.y + selectedLayer.height) {
        canvas.style.cursor = 'move'
      } else {
        canvas.style.cursor = 'crosshair'
      }
    }
    
    if (isResizing && selectedLayerId && resizeHandle) {
      const layer = selectedLayer!
      const deltaX = x - resizeStartPos.x
      const deltaY = y - resizeStartPos.y
      
      let newWidth = resizeStartSize.width
      let newHeight = resizeStartSize.height
      let newX = layer.x
      let newY = layer.y
      
      // Handle different resize directions
      switch (resizeHandle) {
        case 'se': // Southeast
          newWidth = Math.max(20, resizeStartSize.width + deltaX)
          newHeight = Math.max(20, resizeStartSize.height + deltaY)
          break
        case 'sw': // Southwest
          newWidth = Math.max(20, resizeStartSize.width - deltaX)
          newHeight = Math.max(20, resizeStartSize.height + deltaY)
          newX = layer.x + (resizeStartSize.width - newWidth)
          break
        case 'ne': // Northeast
          newWidth = Math.max(20, resizeStartSize.width + deltaX)
          newHeight = Math.max(20, resizeStartSize.height - deltaY)
          newY = layer.y + (resizeStartSize.height - newHeight)
          break
        case 'nw': // Northwest
          newWidth = Math.max(20, resizeStartSize.width - deltaX)
          newHeight = Math.max(20, resizeStartSize.height - deltaY)
          newX = layer.x + (resizeStartSize.width - newWidth)
          newY = layer.y + (resizeStartSize.height - newHeight)
          break
        case 'e': // East
          newWidth = Math.max(20, resizeStartSize.width + deltaX)
          break
        case 'w': // West
          newWidth = Math.max(20, resizeStartSize.width - deltaX)
          newX = layer.x + (resizeStartSize.width - newWidth)
          break
        case 's': // South
          newHeight = Math.max(20, resizeStartSize.height + deltaY)
          break
        case 'n': // North
          newHeight = Math.max(20, resizeStartSize.height - deltaY)
          newY = layer.y + (resizeStartSize.height - newHeight)
          break
      }
      
      // Keep within canvas bounds
      newX = Math.max(0, Math.min(600 - newWidth, newX))
      newY = Math.max(0, Math.min(300 - newHeight, newY))
      
      updateLayer(selectedLayerId, { 
        x: newX, 
        y: newY, 
        width: newWidth, 
        height: newHeight 
      })
    } else if (isDragging && selectedLayerId) {
      const newX = Math.max(0, Math.min(600 - selectedLayer!.width, x - dragOffset.x))
      const newY = Math.max(0, Math.min(300 - selectedLayer!.height, y - dragOffset.y))
      
      updateLayer(selectedLayerId, { x: newX, y: newY })
    }
  }

  const handleCanvasMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
    setResizeHandle(null)
    setDragOffset({ x: 0, y: 0 })
    setResizeStartSize({ width: 0, height: 0 })
    setResizeStartPos({ x: 0, y: 0 })
    
    // Reset cursor
    const canvas = canvasRef.current
    if (canvas) {
      canvas.style.cursor = 'crosshair'
    }
  }

  // Utility functions
  const resetSettings = () => {
    setLayers([])
    setSelectedLayerId(null)
    setZoom(1)
    setShowGrid(false)
    setShowRulers(false)
  }

  const downloadPreview = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const link = document.createElement('a')
    link.download = 'license-plate-frame-preview.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  const getDesignConfiguration = () => {
    return {
      layers: layers.map(layer => ({
        type: layer.type,
        name: layer.name,
        ...(layer.type === 'text' ? {
          text: layer.text,
          fontSize: layer.fontSize,
          fontFamily: layer.fontFamily,
          textColor: layer.textColor,
          fontWeight: layer.fontWeight,
          fontStyle: layer.fontStyle,
          textAlign: layer.textAlign
        } : {}),
        ...(layer.type === 'image' ? {
          width: Math.round(layer.width),
          height: Math.round(layer.height)
        } : {}),
        x: Math.round(layer.x),
        y: Math.round(layer.y),
        opacity: layer.opacity
      })),
      totalLayers: layers.length,
      hasText: layers.some(l => l.type === 'text'),
      hasImages: layers.some(l => l.type === 'image'),
      canvasPreview: canvasRef.current?.toDataURL() || null
    }
  }

  const proceedToOrder = () => {
    const config = getDesignConfiguration()
    // Store configuration in sessionStorage to pass to order page
    sessionStorage.setItem('frameConfiguration', JSON.stringify(config))
    // Navigate to order page
    window.location.href = '/order'
  }

  if (showOrderForm) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <Button variant="ghost" onClick={() => setShowOrderForm(false)} className="mb-4">
              ← Вернуться к конструктору
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-2">Оформление заказа</h1>
            <p className="text-lg text-muted-foreground">Ваша персонализированная рамка готова к заказу</p>
          </div>
          <OrderForm
            selectedProduct={{ id: "custom", name: "Персонализированная рамка", price: "от 600 лей" }}
            customConfiguration={customConfiguration}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{t("constructor.title")}</h1>
          <p className="text-lg text-muted-foreground">Создайте уникальную рамку с помощью профессионального редактора</p>
        </div>

        {/* Toolbar Card */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Tool Selection */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={selectedTool === 'select' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedTool('select')}
                  >
                    <MousePointer className="h-4 w-4 mr-2" />
                    Выбор
                  </Button>
                  <Button
                    variant={selectedTool === 'text' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedTool('text')}
                  >
                    <Type className="h-4 w-4 mr-2" />
                    Текст
                  </Button>
                  <Button
                    variant={selectedTool === 'hand' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedTool('hand')}
                  >
                    <Hand className="h-4 w-4 mr-2" />
                    Рука
                  </Button>
                </div>
                
                <Separator orientation="vertical" className="h-6" />
                
                {/* View Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={showGrid ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setShowGrid(!showGrid)}
                  >
                    <Grid className="h-4 w-4 mr-2" />
                    Сетка
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium w-12 text-center">{Math.round(zoom * 100)}%</span>
                    <Button variant="ghost" size="sm" onClick={() => setZoom(Math.min(2, zoom + 0.25))}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={downloadPreview} className="hover:bg-primary/10 hover:text-primary hover:border-primary/50">
                  <Download className="h-4 w-4 mr-2" />
                  Экспорт
                </Button>
                <Button onClick={proceedToOrder}>
                  <Save className="h-4 w-4 mr-2" />
                  Заказать
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {/* Left Sidebar - Elements & Layers */}
          <div className="xl:col-span-1 space-y-6">
            {/* Elements Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Элементы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-primary/10 hover:text-primary hover:border-primary/50" 
                  onClick={addTextLayer}
                >
                  <Type className="h-4 w-4 mr-2" />
                  Добавить текст
                </Button>
                
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Добавить фото
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Layers Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Слои
                  </div>
                  <Badge variant="secondary">{layers.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {layers.map((layer) => (
                      <div
                        key={layer.id}
                        className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                          selectedLayerId === layer.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedLayerId(layer.id)}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateLayer(layer.id, { visible: !layer.visible })
                          }}
                          className="h-6 w-6 p-0"
                        >
                          {layer.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        </Button>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {layer.type === 'text' ? <Type className="h-3 w-3" /> : <Upload className="h-3 w-3" />}
                            <span className="text-sm font-medium truncate">{layer.name}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              duplicateLayer(layer.id)
                            }}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteLayer(layer.id)
                            }}
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {layers.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Layers className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Нет слоев</p>
                        <p className="text-xs">Добавьте текст или загрузите изображение</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Canvas Area */}
          <div className="xl:col-span-3">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Move className="h-5 w-5" />
                  Интерактивный редактор
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Перетаскивайте элементы для изменения их позиции
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      className="border border-border rounded-lg cursor-crosshair bg-background shadow-sm"
                      style={{ transform: `scale(${zoom})` }}
                      onMouseDown={handleCanvasMouseDown}
                      onMouseMove={handleCanvasMouseMove}
                      onMouseUp={handleCanvasMouseUp}
                      onMouseLeave={handleCanvasMouseUp}
                    />
                    
                    {/* Hidden frame image */}
                    <img
                      ref={frameImageRef}
                      src="/images/plate-frame.png"
                      alt="Frame"
                      className="hidden"
                      onLoad={() => {
                        console.log('Frame image loaded')
                        drawCanvas()
                      }}
                      onError={(e) => {
                        console.error('Frame image failed to load:', e)
                      }}
                    />
                  </div>
                </div>
                
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>Размер холста: 600x300 пикселей | Масштаб: {Math.round(zoom * 100)}%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Properties Panel */}
          <div className="xl:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Свойства
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedLayer ? (
                  <div className="space-y-6">
                    {/* Text Specific Properties - Moved to top */}
                    {selectedLayer.type === 'text' && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Свойства текста</h4>
                        
                        <div className="space-y-2">
                          <Label>Содержание</Label>
                          <Input
                            value={selectedLayer.text || ''}
                            onChange={(e) => updateLayer(selectedLayer.id, { text: e.target.value })}
                            placeholder="Введите текст..."
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Размер шрифта: {selectedLayer.fontSize || 24}px</Label>
                          <Slider
                            value={[selectedLayer.fontSize || 24]}
                            onValueChange={(value) => updateLayer(selectedLayer.id, { fontSize: value[0] })}
                            max={72}
                            min={8}
                            step={2}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Цвет текста</Label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={selectedLayer.textColor || '#000000'}
                              onChange={(e) => updateLayer(selectedLayer.id, { textColor: e.target.value })}
                              className="w-8 h-8 rounded border border-border cursor-pointer"
                            />
                            <span className="text-sm text-muted-foreground">{selectedLayer.textColor}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Выравнивание</Label>
                          <div className="flex gap-2">
                            <Button
                              variant={selectedLayer.textAlign === 'left' ? 'default' : 'outline'}
                              size="sm"
                              className={selectedLayer.textAlign !== 'left' ? 'hover:bg-primary/10 hover:text-primary hover:border-primary/50' : ''}
                              onClick={() => updateLayer(selectedLayer.id, { textAlign: 'left' })}
                            >
                              <AlignLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={selectedLayer.textAlign === 'center' ? 'default' : 'outline'}
                              size="sm"
                              className={selectedLayer.textAlign !== 'center' ? 'hover:bg-primary/10 hover:text-primary hover:border-primary/50' : ''}
                              onClick={() => updateLayer(selectedLayer.id, { textAlign: 'center' })}
                            >
                              <AlignCenter className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={selectedLayer.textAlign === 'right' ? 'default' : 'outline'}
                              size="sm"
                              className={selectedLayer.textAlign !== 'right' ? 'hover:bg-primary/10 hover:text-primary hover:border-primary/50' : ''}
                              onClick={() => updateLayer(selectedLayer.id, { textAlign: 'right' })}
                            >
                              <AlignRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Стиль шрифта</Label>
                          <div className="flex gap-2">
                            <Button
                              variant={selectedLayer.fontWeight === 'bold' ? 'default' : 'outline'}
                              size="sm"
                              className={selectedLayer.fontWeight !== 'bold' ? 'hover:bg-primary/10 hover:text-primary hover:border-primary/50' : ''}
                              onClick={() => updateLayer(selectedLayer.id, { 
                                fontWeight: selectedLayer.fontWeight === 'bold' ? 'normal' : 'bold' 
                              })}
                            >
                              <Bold className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={selectedLayer.fontStyle === 'italic' ? 'default' : 'outline'}
                              size="sm"
                              className={selectedLayer.fontStyle !== 'italic' ? 'hover:bg-primary/10 hover:text-primary hover:border-primary/50' : ''}
                              onClick={() => updateLayer(selectedLayer.id, { 
                                fontStyle: selectedLayer.fontStyle === 'italic' ? 'normal' : 'italic' 
                              })}
                            >
                              <Italic className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Position & Size */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Позиция и размер</h4>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>X</Label>
                          <Input
                            type="number"
                            value={selectedLayer.x}
                            onChange={(e) => updateLayer(selectedLayer.id, { x: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                        <div>
                          <Label>Y</Label>
                          <Input
                            type="number"
                            value={selectedLayer.y}
                            onChange={(e) => updateLayer(selectedLayer.id, { y: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                        <div>
                          <Label>Ширина</Label>
                          <Input
                            type="number"
                            value={selectedLayer.width}
                            onChange={(e) => updateLayer(selectedLayer.id, { width: parseInt(e.target.value) || 1 })}
                          />
                        </div>
                        <div>
                          <Label>Высота</Label>
                          <Input
                            type="number"
                            value={selectedLayer.height}
                            onChange={(e) => updateLayer(selectedLayer.id, { height: parseInt(e.target.value) || 1 })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Opacity */}
                    <div className="space-y-2">
                      <Label>Прозрачность: {Math.round((selectedLayer.opacity || 1) * 100)}%</Label>
                      <Slider
                        value={[(selectedLayer.opacity || 1) * 100]}
                        onValueChange={(value) => updateLayer(selectedLayer.id, { opacity: value[0] / 100 })}
                        max={100}
                        min={0}
                        step={5}
                      />
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-border">
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => duplicateLayer(selectedLayer.id)}
                          className="w-full hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Дублировать
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteLayer(selectedLayer.id)}
                          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Удалить
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={resetSettings}
                          className="w-full"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Сбросить все
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Palette className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Слой не выбран</p>
                    <p className="text-xs">Выберите слой для редактирования</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
