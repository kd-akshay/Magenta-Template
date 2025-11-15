import { useState } from 'react'
import { Card, FileUpload, type UploadedFile } from '@/components/ui'

const FileUploadExample = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const handleFilesChange = (files: UploadedFile[]) => {
    setUploadedFiles(files)
    console.log('Files changed:', files)
  }

  const handleUpload = async (file: File): Promise<string> => {
    // Simulate file upload
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://example.com/uploads/${file.name}`)
      }, 2000)
    })
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          File Upload Examples
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Drag and drop or select files to upload
        </p>
      </div>

      {/* Basic File Upload */}
      <Card header={<h2 className="text-xl font-semibold">Basic File Upload</h2>}>
        <FileUpload
          label="Upload Files"
          description="Drag and drop files here, or click to select"
          onFilesChange={handleFilesChange}
          maxFiles={5}
          maxFileSize={10 * 1024 * 1024} // 10MB
        />
      </Card>

      {/* Image Only Upload */}
      <Card header={<h2 className="text-xl font-semibold">Image Only Upload</h2>}>
        <FileUpload
          label="Upload Images"
          description="Only image files are accepted"
          acceptedFileTypes={['image/*']}
          maxFiles={10}
          maxFileSize={5 * 1024 * 1024} // 5MB
          onFilesChange={(files) => console.log('Images:', files)}
        />
      </Card>

      {/* Single File Upload */}
      <Card header={<h2 className="text-xl font-semibold">Single File Upload</h2>}>
        <FileUpload
          label="Upload Document"
          description="Select a single document file"
          multiple={false}
          acceptedFileTypes={['.pdf', '.doc', '.docx', '.txt']}
          maxFileSize={20 * 1024 * 1024} // 20MB
          onFilesChange={(files) => console.log('Document:', files)}
        />
      </Card>

      {/* Upload with Progress */}
      <Card header={<h2 className="text-xl font-semibold">Upload with Progress</h2>}>
        <FileUpload
          label="Upload Files with Progress"
          description="Files will be uploaded with progress indication"
          onFilesChange={handleFilesChange}
          onUpload={handleUpload}
          maxFiles={3}
        />
      </Card>

      {/* Uploaded Files Summary */}
      {uploadedFiles.length > 0 && (
        <Card header={<h2 className="text-xl font-semibold">Uploaded Files Summary</h2>}>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total files: {uploadedFiles.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total size:{' '}
              {uploadedFiles
                .reduce((acc, file) => acc + file.file.size, 0)
                .toLocaleString()}{' '}
              bytes
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}

export default FileUploadExample

