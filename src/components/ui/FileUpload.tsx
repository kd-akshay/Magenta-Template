import { useState, useRef, useCallback } from 'react'
import { CloudArrowUpIcon, XMarkIcon, DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'
import Button from './Button'
import Loader from './Loader'

export interface UploadedFile {
  id: string
  file: File
  preview?: string
  progress?: number
  status?: 'uploading' | 'success' | 'error'
  error?: string
}

export interface FileUploadProps {
  onFilesChange?: (files: UploadedFile[]) => void
  acceptedFileTypes?: string[]
  maxFileSize?: number // in bytes
  maxFiles?: number
  multiple?: boolean
  label?: string
  description?: string
  disabled?: boolean
  className?: string
  showPreview?: boolean
  onUpload?: (file: File) => Promise<string | void>
}

const FileUpload = ({
  onFilesChange,
  acceptedFileTypes = ['*/*'],
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  multiple = true,
  label = 'Upload files',
  description = 'Drag and drop files here, or click to select',
  disabled = false,
  className,
  showPreview = true,
  onUpload,
}: FileUploadProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize) {
      const maxSizeMB = (maxFileSize / (1024 * 1024)).toFixed(2)
      return `File size exceeds ${maxSizeMB}MB`
    }

    // Check file type
    if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes('*/*')) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      const mimeType = file.type

      const isValidType = acceptedFileTypes.some((acceptType) => {
        if (acceptType === '*/*') return true
        if (acceptType.startsWith('.')) {
          return acceptType.toLowerCase() === fileExtension
        }
        return mimeType.match(acceptType)
      })

      if (!isValidType) {
        return `File type not allowed. Accepted types: ${acceptedFileTypes.join(', ')}`
      }
    }

    return null
  }

  const createFilePreview = (file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.onerror = () => resolve(undefined)
        reader.readAsDataURL(file)
      } else {
        resolve(undefined)
      }
    })
  }

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return

      const filesArray = Array.from(fileList)
      const remainingSlots = maxFiles - files.length

      if (filesArray.length > remainingSlots) {
        alert(`You can only upload ${remainingSlots} more file(s)`)
        return
      }

      const newFiles: UploadedFile[] = []

      for (const file of filesArray) {
        const error = validateFile(file)
        if (error) {
          alert(`${file.name}: ${error}`)
          continue
        }

        const preview = await createFilePreview(file)
        const uploadedFile: UploadedFile = {
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview,
          status: onUpload ? 'uploading' : 'success',
          progress: onUpload ? 0 : 100,
        }

        newFiles.push(uploadedFile)

        // Handle upload if callback provided
        if (onUpload) {
          setIsUploading(true)
          try {
            uploadedFile.progress = 50
            setFiles((prev) => [...prev, uploadedFile])
            await onUpload(file)
            uploadedFile.status = 'success'
            uploadedFile.progress = 100
          } catch (error) {
            uploadedFile.status = 'error'
            uploadedFile.error = error instanceof Error ? error.message : 'Upload failed'
          } finally {
            setIsUploading(false)
            setFiles((prev) => prev.map((f) => (f.id === uploadedFile.id ? uploadedFile : f)))
          }
        }
      }

      const updatedFiles = [...files, ...newFiles]
      setFiles(updatedFiles)
      onFilesChange?.(updatedFiles)
    },
    [files, maxFiles, maxFileSize, acceptedFileTypes, onUpload, onFilesChange]
  )

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (disabled) return

    const droppedFiles = e.dataTransfer.files
    handleFiles(droppedFiles)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    // Reset input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((f) => f.id !== id)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <PhotoIcon className="w-8 h-8" />
    }
    return <DocumentIcon className="w-8 h-8" />
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 text-center transition-all',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedFileTypes.join(',')}
          onChange={handleInputChange}
          disabled={disabled || files.length >= maxFiles}
          className="hidden"
          aria-label="File upload"
        />

        <div className="flex flex-col items-center space-y-4">
          <CloudArrowUpIcon
            className={cn(
              'w-12 h-12 transition-colors',
              isDragging ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
            )}
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Max {maxFiles} file(s), up to {formatFileSize(maxFileSize)} each
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || files.length >= maxFiles || isUploading}
          >
            {isUploading ? (
              <>
                <Loader size="sm" className="mr-2" />
                Uploading...
              </>
            ) : (
              'Select Files'
            )}
          </Button>
        </div>
      </div>

      {/* File List */}
      {showPreview && files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((uploadedFile) => (
            <div
              key={uploadedFile.id}
              className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              {/* Preview/Icon */}
              <div className="flex-shrink-0">
                {uploadedFile.preview ? (
                  <img
                    src={uploadedFile.preview}
                    alt={uploadedFile.file.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded text-gray-500 dark:text-gray-400">
                    {getFileIcon(uploadedFile.file)}
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {uploadedFile.file.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                  {uploadedFile.status === 'uploading' && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-primary">
                        {uploadedFile.progress}% uploaded
                      </span>
                    </>
                  )}
                  {uploadedFile.status === 'error' && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-red-600 dark:text-red-400">
                        {uploadedFile.error || 'Upload failed'}
                      </span>
                    </>
                  )}
                  {uploadedFile.status === 'success' && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-green-600 dark:text-green-400">Uploaded</span>
                    </>
                  )}
                </div>
                {uploadedFile.status === 'uploading' && uploadedFile.progress !== undefined && (
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all"
                      style={{ width: `${uploadedFile.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeFile(uploadedFile.id)}
                disabled={uploadedFile.status === 'uploading'}
                className="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Remove ${uploadedFile.file.name}`}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FileUpload

