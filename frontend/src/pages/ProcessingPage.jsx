import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import ImageComparison from '../components/ImageComparison';
import PerformanceMetrics from '../components/PerformanceMetrics';
import LoadingSpinner from '../components/LoadingSpinner';
import { processImage } from '../utils/imageProcessing';

function ProcessingPage() {
  const [originalImage, setOriginalImage] = useState(null);
  const [colorizedImage, setColorizedImage] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = async (imageData) => {
    setOriginalImage(imageData);
    setColorizedImage(null);
    setMetrics(null);
    setIsProcessing(true);

    try {
      // Simulate image processing (replace with actual API call)
      const result = await processImage(imageData.file);
      
      setColorizedImage(result.colorizedImage);
      setMetrics(result.metrics);
    } catch (error) {
      console.error('Image processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Image Uploader */}
        <div className="mb-8">
          <ImageUploader onImageUpload={handleImageUpload} />
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex justify-center items-center my-8">
            <LoadingSpinner />
          </div>
        )}

        {/* Image Comparison */}
        {colorizedImage && !isProcessing && (
          <div className="mb-8">
            <ImageComparison 
              originalImage={originalImage.preview}
              colorizedImage={colorizedImage}
            />
          </div>
        )}

        {/* Performance Metrics */}
        {metrics && !isProcessing && (
          <div>
            <PerformanceMetrics metrics={metrics} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProcessingPage;