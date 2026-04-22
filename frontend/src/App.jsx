import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateFolder from './pages/CreateFolder'
import ViewFolder from './pages/ViewFolder'
import Toast from './components/Toast'
import { ToastProvider } from './context/ToastContext'

function  App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-secondary">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateFolder />} />
            <Route path="/view/:code" element={<ViewFolder />} />
          </Routes>
          <Toast />
        </div>
      </Router>
    </ToastProvider>
  )
}

export default App
