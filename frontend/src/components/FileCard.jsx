import { useState } from 'react'
import { useToast } from '../context/ToastContext'

export default function FileCard({ file }) {
  const { addToast } = useToast()
  const [showPreview, setShowPreview] = useState(false)
  const isImage = file.type.startsWith('image/')
  const isText = file.type.startsWith('text/')

  const copyToClipboard = async () => {
    try {
      const response = await fetch(file.url)
      const text = await response.text()
      await navigator.clipboard.writeText(text)
      addToast('Code copied to clipboard! 🎉', 'success')
    } catch (error) {
      addToast('Failed to copy', 'error')
    }
  }

  const downloadFile = () => {
    const link = document.createElement('a')
    link.href = file.url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    addToast('Download started!', 'success')
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold truncate text-primary mb-2">
            {file.name}
          </h3>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>{formatFileSize(file.size)}</span>
            <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
          </div>
        </div>
        <span className="px-3 py-1 bg-accent text-secondary rounded-full text-xs font-semibold">
          {file.type.split('/')[1]?.toUpperCase() || 'File'}
        </span>
      </div>

      {isImage && (
        <div className="mb-4">
          <img 
            src={file.url} 
            alt={file.name}
            className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setShowPreview(true)}
          />
        </div>
      )}

      <div className="flex gap-3">
        {(isText || isImage) && (
          <button
            onClick={() => setShowPreview(true)}
            className="flex-1 btn-outline text-sm"
          >
            👁️ Preview
          </button>
        )}
        {isText && (
          <button
            onClick={copyToClipboard}
            className="flex-1 btn-primary text-sm"
          >
            📋 Copy
          </button>
        )}
        <button
          onClick={downloadFile}
          className="flex-1 btn-secondary text-sm"
        >
          ⬇️ Download
        </button>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-secondary rounded-xl max-w-3xl w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center p-6 border-b-2 border-primary sticky top-0 bg-secondary">
              <h2 className="text-xl font-bold">{file.name}</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-2xl hover:text-accent transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              {isImage ? (
                <img src={file.url} alt={file.name} className="w-full rounded-lg" />
              ) : isText ? (
                <iframe
                  src={file.url}
                  className="w-full h-96 border-2 border-primary rounded-lg"
                  title="Preview"
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
