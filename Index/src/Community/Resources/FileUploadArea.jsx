import { useCallback, useState } from 'react';

const FileUploadArea = ({ onFileUpload, accept, preview, label }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  }, [onFileUpload]);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative w-full h-48 rounded-lg border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'} transition-colors`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      {preview ? (
        <div className="w-full h-full flex items-center justify-center p-4">
          {preview.type.startsWith('image/') ? (
            <img 
              src={URL.createObjectURL(preview)} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-2">📄</div>
              <p className="text-gray-900 dark:text-white">{preview.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(preview.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-gray-600 dark:text-gray-300 mb-1">{label}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Max file size: 5MB</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;