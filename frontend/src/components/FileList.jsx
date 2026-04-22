import FileCard from './FileCard'

export default function FileList({ files }) {
  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-xl font-bold text-gray-600">No files yet</h3>
        <p className="text-gray-500">Upload files or add text to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {files.map((file, index) => (
        <FileCard key={index} file={file} />
      ))}
    </div>
  )
}
