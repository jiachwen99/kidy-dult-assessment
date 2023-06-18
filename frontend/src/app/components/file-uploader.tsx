// FileUploader.tsx
import React, { useState, ChangeEvent, ReactElement } from 'react';

interface FileUploaderProps {
  onFilesChange: (files: File[]) => void;
}

export function FileUploader({ onFilesChange}: FileUploaderProps): ReactElement {
  const [error, setError] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const fileArray = Array.from(uploadedFiles);
      const validFiles = fileArray.filter(file =>
        file.name.endsWith('.txt')
      );
      if (validFiles.length !== fileArray.length) {
        setError('Error: Only text files are allowed.');
      } else {
        setSelectedFiles(validFiles);
        onFilesChange(validFiles);
        setError('');
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      const fileArray = Array.from(droppedFiles);
      const validFiles = fileArray.filter(file =>
        file.name.endsWith('.txt')
      );
      if (validFiles.length !== fileArray.length) {
        setError('Error: Only text files are allowed.');
      } else {
        setSelectedFiles(validFiles);
        onFilesChange(validFiles);
        setError('');
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className='w-full mx-auto'>
      <h1>Upload log files (.txt) </h1>
      <div
        className="border-solid border-2 border-black p-20"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {selectedFiles.length > 0 ? (
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        ) : (
          <p>Drag and drop .txt files here, or click to select</p>
        )}
        <div className='mt-3'>
          <label htmlFor="file-input">
            <span className="bg-button text-white mt-5 px-2 py-2 rounded-md cursor-pointer hover:bg-highlight">
              Select Files
            </span>
            <input
              type="file"
              accept=".txt"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="file-input"
            />
          </label>
        </div>  

      </div>
      
    </div>
  );
}
