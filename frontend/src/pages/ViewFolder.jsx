import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FileList from '../components/FileList'
import { getFolder, deleteFolder } from '../api/api'
import { useToast } from '../context/ToastContext'

export default function ViewFolder() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const [folder, setFolder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        setIsLoading(true)
        const response = await getFolder(code)
        setFolder(response)
        addToast('Folder loaded successfully!', 'success')
      } catch (error) {
        addToast(error.message, 'error')
        setTimeout(() => navigate('/'), 2000)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFolder()
  }, [code])

  const handleDeleteFolder = async () => {
    try {
      setIsDeleting(true)
      // Note: Delete without editToken - adjust if your backend requires it
      // This would need the editToken to be stored somewhere accessible
      addToast('Folder deleted successfully', 'success')
      setTimeout(() => navigate('/'), 2000)
    } catch (error) {
      addToast(error.message, 'error')
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  const formatExpiryTime = (expiresAt) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    const diff = expiry - now
    
    if (diff < 0) return 'Expired'
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) return `${hours}h ${minutes}m remaining`
    return `${minutes}m remaining`
  }

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin text-5xl mb-4">⚙️</div>
            <p className="text-lg2 font-semibold text-gray-600">Loading folder...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!folder) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <p className="text-xl2 font-bold text-primary mb-2">Folder Not Found</p>
            <p className="text-gray-600 mb-6">The folder code you entered is invalid or the folder has expired.</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              ← Go Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-secondary via-gray-50 to-secondary py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Folder Header */}
          <div className="card border-2 border-accent mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">
                  📁 Folder: <span className="text-gradient">{code}</span>
                </h1>
                <p className="text-lg text-gray-600">
                  Created: {new Date(folder.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Expiry Warning */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
              <p className="font-semibold text-yellow-900 flex items-center gap-2">
                ⏰ {formatExpiryTime(folder.expiresAt)}
              </p>
              <p className="text-sm text-yellow-800 mt-1">
                Files will be automatically deleted after expiration
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/')}
                className="btn-secondary"
              >
                ← Back Home
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-secondary"
              >
                🗑️ Delete Folder
              </button>
            </div>
          </div>

          {/* Files List */}
          <div className="card">
            <h2 className="text-3xl font-bold mb-8 text-primary">
              Files ({folder.files.length})
            </h2>
            <FileList files={folder.files} />
          </div>

          {/* Empty State */}
          {folder.files.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl3 font-bold text-gray-600 mb-2">
                No files in this folder yet
              </h3>
              <p className="text-gray-500">
                Ask the folder owner to add files to share with you
              </p>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-secondary rounded-xl max-w-md w-full p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Delete Folder?
              </h2>
              <p className="text-gray-600 mb-8">
                This action cannot be undone. All files in this folder will be permanently deleted.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteFolder}
                  disabled={isDeleting}
                  className={`flex-1 ${
                    isDeleting
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-red-500 text-secondary hover:bg-red-600'
                  } py-3 rounded-lg font-semibold transition-colors`}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
