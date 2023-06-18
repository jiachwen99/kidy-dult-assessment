'use client';
import React, { useState } from 'react';
import { FileUploader } from './components/file-uploader';
import { ResultList } from './components/result-list';
import { upload } from './utils/http';

export default function Page() {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<UserWordCount[]>([]);

  const handleFilesChange = (files: File[]) => {
    setFiles(files);
    setError('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (files.length > 0) {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));

      try {
        const data = await upload(formData);
        setResults(data);
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  return (
    <main className="flex item-center justify-center bg-main text-black w-full min-h-screen">
      <div className="w-1/2 m-8">
        <FileUploader onFilesChange={handleFilesChange} />
        <form onSubmit={handleSubmit}>
          <button 
            type="submit" 
            disabled={files.length === 0}
            className="bg-button text-white px-4 py-2 rounded-md mt-4 hover:bg-highlight">
            Upload
          </button>
        </form>
      </div>
      <div className="w-1/2 m-8">
        <ResultList results={results} />
      </div>
    </main>
  );
}
