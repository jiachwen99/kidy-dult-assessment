import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileUploader } from './file-uploader';

describe('FileUploader', () => {
  const onFilesChangeMock = jest.fn();

  beforeEach(() => {
    onFilesChangeMock.mockClear();
  });

  test('renders the component without errors', () => {
    render(<FileUploader onFilesChange={onFilesChangeMock} />);
    expect(screen.getByText('Upload log files (.txt)')).toBeInTheDocument();
  });

  test('displays error message when non-text files are selected', () => {
    render(<FileUploader onFilesChange={onFilesChangeMock} />);

    const fileInput = screen.getByLabelText('Select Files');

    const nonTextFile = new File([''], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [nonTextFile] } });

    expect(screen.getByText('Error: Only text files are allowed.')).toBeInTheDocument();
    expect(onFilesChangeMock).not.toHaveBeenCalled();
  });

  test('displays selected file names when valid text files are selected', () => {
    render(<FileUploader onFilesChange={onFilesChangeMock} />);

    const fileInput = screen.getByLabelText('Select Files');

    const textFile1 = new File([''], 'file1.txt', { type: 'text/plain' });
    const textFile2 = new File([''], 'file2.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [textFile1, textFile2] } });

    expect(screen.getByText('file1.txt')).toBeInTheDocument();
    expect(screen.getByText('file2.txt')).toBeInTheDocument();
    expect(onFilesChangeMock).toHaveBeenCalledWith([textFile1, textFile2]);
  });

  test('displays drag and drop message when no files are selected', () => {
    render(<FileUploader onFilesChange={onFilesChangeMock} />);

    expect(screen.getByText('Drag and drop .txt files here, or click to select')).toBeInTheDocument();
  });
});
