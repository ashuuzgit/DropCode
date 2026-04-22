import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-primary text-secondary py-6 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl2 font-bold text-gradient">
          DropCode
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-accent transition-colors font-semibold">
            Home
          </Link>
          <Link to="/create" className="hover:text-accent transition-colors font-semibold">
            Create
          </Link>
        </div>
      </div>
    </nav>
  )
}
