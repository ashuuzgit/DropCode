import { useState } from 'react'

export default function DragDropZone({ onFilesSelected }) {
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      onFilesSelected(files)
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files)
      onFilesSelected(files)
    }
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`
        relative border-4 border-dashed rounded-xl p-8 text-center cursor-pointer
        transition-all duration-200
        ${isDragActive
          ? 'border-accent bg-purple-50 scale-105'
          : 'border-primary bg-gray-50 hover:bg-gray-100'
        }
      `}
    >
      <input
        type="file"
        multiple
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="pointer-events-none">
        <div className="text-4xl mb-3">📁</div>
        <h3 className="text-xl3 font-bold mb-2">
          {isDragActive ? 'Drop your files here!' : 'Drag & drop files here'}
        </h3>
        <p className="text-gray-600">
          or click to select files from your computer
        </p>
        <p className="text-sm text-gray-500 mt-3">
          Supports all file types: code, images, documents, etc.
        </p>
      </div>
    </div>
  )
}
