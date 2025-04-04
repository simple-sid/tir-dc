import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

function ImageUploader({ onImageUpload }) {
  const onDrop = useCallback(acceptedFiles => {
    // Validate file type and size
    const validImageFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 // 5MB max
    );

    if (validImageFiles.length > 0) {
      // Read the file and pass to parent component
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload({
          file: validImageFiles[0],
          preview: event.target.result
        });
      };
      reader.readAsDataURL(validImageFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/tiff': ['.tif', '.tiff']
    },
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  return (
    <div 
      {...getRootProps()} 
      className={`
        p-10 border-2 border-dashed rounded-lg text-center cursor-pointer 
        transition-colors duration-200 ease-in-out
        ${isDragActive 
          ? 'border-thermal-primary bg-blue-50' 
          : 'border-gray-300 hover:border-thermal-primary'
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center">
        <Upload size={48} className="text-thermal-primary mb-4" />
        <p className="text-lg font-semibold text-gray-600">
          {isDragActive 
            ? 'Drop the thermal infrared image here' 
            : 'Drag and drop a thermal infrared image, or click to select'
          }
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Supported formats: JPEG, PNG, TIFF (Max 5MB)
        </p>
      </div>
    </div>
  );
}

export default ImageUploader;