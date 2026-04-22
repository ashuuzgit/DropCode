import axios from 'axios'

const API_BASE = '/api'

const api = axios.create({
  baseURL: API_BASE,
})

export const createFolder = async (expiry = '24h') => {
  try {
    const response = await api.post('/folders/create', { expiry })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create folder')
  }
}

export const uploadFiles = async (code, editToken, files, textContent = '', onProgress = null) => {
  try {
    const formData = new FormData()
    formData.append('code', code)
    formData.append('editToken', editToken)
    
    files.forEach(file => {
      formData.append('files', file)
    })

    // Add text content as a file if provided
    if (textContent.trim()) {
      const textBlob = new Blob([textContent], { type: 'text/plain' })
      formData.append('files', textBlob, 'content.txt')
    }

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(percentCompleted)
        }
      },
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to upload files')
  }
}

export const getFolder = async (code) => {
  try {
    const response = await api.get(`/folders/${code}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Folder not found')
  }
}

export const deleteFolder = async (code, editToken) => {
  try {
    const response = await api.delete(`/folders/${code}`, {
      data: { editToken },
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete folder')
  }
}

export default api
