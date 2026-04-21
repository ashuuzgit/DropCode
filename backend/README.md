# DropCode Backend

A backend for DropCode, a zero-friction file sharing app.

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and fill in your values.
3. Set up MongoDB locally or use Atlas.
4. Set up Cloudinary account.
5. Install Redis on WSL: `sudo apt update && sudo apt install redis-server`
6. Start Redis: `redis-server`
7. Run the server: `npm run dev`

## API Endpoints

- POST /api/folders/create - Create a new folder
- GET /api/folders/:code - Get folder by code
- DELETE /api/folders/:code - Delete folder (requires editToken)
- POST /api/upload - Upload files to a folder