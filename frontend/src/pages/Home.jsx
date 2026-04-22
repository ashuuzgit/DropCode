import { Link } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useToast } from '../context/ToastContext'

export default function Home() {
  const [code, setCode] = useState('')
  const { addToast } = useToast()

  const handleAccessFolder = (e) => {
    e.preventDefault()
    if (!code.trim()) {
      addToast('Please enter a folder code', 'error')
      return
    }
    window.location.href = `/view/${code.toUpperCase()}`
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-secondary via-gray-50 to-secondary flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary">
              Share <span className="text-gradient">Code</span> Seamlessly
            </h1>
            <p className="text-xl2 text-gray-600 mb-8">
              Create folders, upload files, and share them with a simple code
            </p>
          </div>

          {/* Main Actions */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Create Folder */}
            <Link
              to="/create"
              className="card group cursor-pointer hover:scale-105 transform transition-all duration-300"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                📝
              </div>
              <h2 className="text-2xl font-bold mb-3 text-primary">
                Create Folder
              </h2>
              <p className="text-gray-600 mb-6">
                Start a new folder with drag & drop file upload or add text content directly. Get a shareable code instantly.
              </p>
              <span className="inline-block btn-primary text-sm">
                Get Started →
              </span>
            </Link>

            {/* View Folder */}
            <div className="card">
              <div className="text-5xl mb-4">👁️</div>
              <h2 className="text-2xl font-bold mb-3 text-primary">
                View Folder
              </h2>
              <p className="text-gray-600 mb-6">
                Have a code? Access a folder and view all shared files with preview and download options.
              </p>
              
              <form onSubmit={handleAccessFolder} className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter folder code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="input-field placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="w-full btn-primary text-sm"
                >
                  Access Folder →
                </button>
              </form>
            </div>
          </div>

          {/* Features */}
          <div className="bg-primary text-secondary rounded-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Why DropCode?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-lg3 font-bold mb-2">Lightning Fast</h3>
                <p className="text-gray-300">Instant code generation and file uploads</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="text-lg3 font-bold mb-2">Secure</h3>
                <p className="text-gray-300">Files expire automatically after 24 hours</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">✨</div>
                <h3 className="text-lg3 font-bold mb-2">Minimal Design</h3>
                <p className="text-gray-300">Clean, intuitive, and distraction-free interface</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
