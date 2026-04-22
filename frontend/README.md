# DropCode Frontend

A modern React frontend for DropCode - a seamless code and file sharing platform.

## Features

- 🎨 Minimal, elegant design with white, black, and purple color scheme
- 📁 Create folders and share with simple codes
- 📤 Drag & drop file upload with support for all file types
- 📝 Add plain text content directly
- 👁️ Preview files (images and text)
- 📥 Download files with one click
- 📋 Copy code to clipboard with toast notification
- 🔒 Secure file sharing with automatic expiration
- ⏰ Real-time expiry countdown
- 🎯 Golden ratio typography for optimal readability

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

Update `vite.config.js` to point to your backend server:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000', // Change to your backend URL
    changeOrigin: true
  }
}
```

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── context/          # React context (Toast)
│   ├── api/              # API calls
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Dependencies
```

## Components

- **Navbar** - Navigation header
- **FileCard** - Individual file display with preview and download
- **FileList** - Grid of file cards
- **DragDropZone** - Drag and drop upload area
- **Toast** - Toast notification system

## Pages

- **Home** - Landing page with folder creation and access
- **CreateFolder** - Create folder and upload files
- **ViewFolder** - View and access shared files

## API Endpoints

The frontend communicates with the following backend endpoints:

- `POST /api/folders/create` - Create a new folder
- `GET /api/folders/:code` - Get folder details
- `DELETE /api/folders/:code` - Delete folder
- `POST /api/upload` - Upload files

## Color Scheme

- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Purple (#9333EA)

## Typography

Uses golden ratio typography for optimal readability:
- Base: 1rem (16px)
- Scale: 1.618 (golden ratio)

## License

MIT
