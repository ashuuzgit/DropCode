import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DragDropZone from '../components/DragDropZone'
import FileList from '../components/FileList'
import { createFolder, uploadFiles } from '../api/api'
import { useToast } from '../context/ToastContext'

export default function CreateFolder() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  
  const [code, setCode] = useState('')
  const [editToken, setEditToken] = useState('')
  const [files, setFiles] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [textContent, setTextContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [folderCreated, setFolderCreated] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [expiresAt, setExpiresAt] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

  // Create folder on mount
  useEffect(() => {
    const initializeFolder = async () => {
      try {
        setIsLoading(true)
        const response = await createFolder()
        setCode(response.code)
        setEditToken(response.editToken)
        setExpiresAt(response.expiresAt)
        setFolderCreated(true)
        addToast('Folder created successfully!', 'success')
      } catch (error) {
        addToast(error.message, 'error')
      } finally {
        setIsLoading(false)
      }
    }

    initializeFolder()
  }, [])

  const handleFilesSelected = (newFiles) => {
    const validFiles = []
    let duplicateCount = 0
    let oversizeCount = 0

    newFiles.forEach(file => {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        oversizeCount++
        return
      }

      // Check for duplicates
      const isDuplicate = files.some(f => f.name === file.name) ||
                          validFiles.some(f => f.name === file.name)
      if (isDuplicate) {
        duplicateCount++
        return
      }

      validFiles.push(file)
    })

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles])
      addToast(`${validFiles.length} file(s) added`, 'success')
    }

    if (duplicateCount > 0) {
      addToast(`${duplicateCount} duplicate file(s) skipped`, 'warning')
    }

    if (oversizeCount > 0) {
      addToast(
        `${oversizeCount} file(s) exceed 50MB limit and were skipped`,
        'error'
      )
    }
  }

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUploadFiles = async () => {
    if (files.length === 0 && !textContent.trim()) {
      addToast('Please add files or text content', 'error')
      return
    }

    if (!code || !editToken) {
      addToast('Folder not initialized', 'error')
      return
    }

    try {
      setIsUploading(true)
      setUploadProgress(0)
      const response = await uploadFiles(code, editToken, files, textContent, (progress) => {
        setUploadProgress(progress)
      })
      setUploadedFiles(prev => [...prev, ...response.files])
      setFiles([])
      setTextContent('')
      setUploadProgress(0)
      addToast('Files uploaded successfully!', 'success')
    } catch (error) {
      addToast(error.message, 'error')
      setUploadProgress(0)
    } finally {
      setIsUploading(false)
    }
  }

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code)
    addToast('Folder code copied to clipboard!', 'success')
  }

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin text-5xl mb-4">⚙️</div>
            <p className="text-lg2 font-semibold text-gray-600">Creating your folder...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-secondary via-gray-50 to-secondary py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Folder Code Display */}
          {folderCreated && (
            <div className="bg-gradient-to-r from-accent to-purple-600 text-secondary rounded-xl p-8 mb-8 shadow-lg">
              <p className="text-sm uppercase tracking-wider opacity-90 mb-2">Your Folder Code</p>
              <div className="flex items-center gap-4 flex-wrap">
                <code className="text-4xl font-bold font-mono">{code}</code>
                <button
                  onClick={copyCodeToClipboard}
                  className="px-6 py-3 bg-secondary text-accent rounded-lg font-bold hover:shadow-lg transition-shadow"
                >
                  📋 Copy Code
                </button>
              </div>
              <p className="text-sm mt-4 opacity-90">
                ✨ Share this code with others to let them view your files
              </p>
              {expiresAt && (
                <p className="text-sm mt-3 opacity-75">
                  ⏱️ This folder expires on {new Date(expiresAt).toLocaleString()}
                </p>
              )}
            </div>
          )}

          {/* Main Content */}
          <div className="space-y-8">
            {/* Add Text Content */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                📝 Add Text Content
              </h2>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Paste your code, notes, or any text here..."
                className="w-full h-40 p-4 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 resize-none font-mono text-sm"
              />
              <p className="text-sm text-gray-600 mt-3">
                Text will be saved as a file and can be copied with one click
              </p>
            </div>

            {/* Drag & Drop Zone */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6 text-primary">
                📂 Upload Files
              </h2>
              <DragDropZone onFilesSelected={handleFilesSelected} />

              {/* Selected Files Preview */}
              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg3 font-bold mb-4 text-primary">
                    Selected Files ({files.length})
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-primary"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-xl">📄</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate text-primary">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="ml-2 text-red-500 hover:text-red-700 font-bold text-lg"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUploadFiles}
              disabled={isUploading}
              className={`w-full py-4 text-lg3 font-bold rounded-xl transition-all duration-200 ${
                isUploading
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {isUploading ? '⏳ Uploading...' : '🚀 Upload & Generate Code'}
            </button>

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="bg-white rounded-lg p-4 border-2 border-primary">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-primary">Upload Progress</p>
                  <span className="text-sm font-bold text-accent">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-accent to-purple-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="card border-2 border-accent">
                <h2 className="text-2xl font-bold mb-6 text-primary">
                  ✅ Uploaded Files ({uploadedFiles.length})
                </h2>
                <FileList files={uploadedFiles} />

                {/* Share Info */}
                <div className="mt-8 p-6 bg-purple-50 rounded-lg border-2 border-accent">
                  <h3 className="text-lg3 font-bold text-primary mb-2">🎉 Ready to Share!</h3>
                  <p className="text-gray-700 mb-4">
                    Your folder is created and files are uploaded. Share the code above with others to let them view and download your files.
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="btn-secondary"
                  >
                    ← Back to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
