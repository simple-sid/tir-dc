import React, { useState } from 'react';
import { RefreshCw, ZoomIn } from 'lucide-react';

function ImageComparison({ originalImage, colorizedImage }) {
  const [comparisonMode, setComparisonMode] = useState('side-by-side');
  const [zoomedImage, setZoomedImage] = useState(null);

  const handleZoom = (image) => {
    setZoomedImage(image);
  };

  const renderSideBySide = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative group">
        <h3 className="text-lg font-semibold mb-2 text-center">Original Thermal Image</h3>
        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
          <img 
            src={originalImage} 
            alt="Original Thermal" 
            className="w-full h-auto object-cover"
          />
          <button 
            onClick={() => handleZoom(originalImage)}
            className="
              absolute top-2 right-2 bg-white/70 p-2 rounded-full 
              opacity-0 group-hover:opacity-100 transition-opacity
            "
          >
            <ZoomIn size={20} />
          </button>
        </div>
      </div>
      
      <div className="relative group">
        <h3 className="text-lg font-semibold mb-2 text-center">Colorized Image</h3>
        <div className="border-2 border-thermal-primary rounded-lg overflow-hidden">
          <img 
            src={colorizedImage} 
            alt="Colorized Thermal" 
            className="w-full h-auto object-cover"
          />
          <button 
            onClick={() => handleZoom(colorizedImage)}
            className="
              absolute top-2 right-2 bg-white/70 p-2 rounded-full 
              opacity-0 group-hover:opacity-100 transition-opacity
            "
          >
            <ZoomIn size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderOverlayComparison = () => (
    <div className="relative w-full aspect-video">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${originalImage})` }}
      />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50" 
        style={{ 
          backgroundImage: `url(${colorizedImage})`,
          clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-1 h-full bg-thermal-primary -translate-x-1/2 -translate-y-1/2" 
      />
    </div>
  );

  const renderZoomedImage = () => (
    zoomedImage && (
      <div 
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
        onClick={() => setZoomedImage(null)}
      >
        <img 
          src={zoomedImage} 
          alt="Zoomed" 
          className="max-w-full max-h-full object-contain"
        />
      </div>
    )
  );

  return (
    <div className="bg-white rounded-lg shadow-thermal-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-thermal-primary">
          Image Comparison
        </h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setComparisonMode('side-by-side')}
            className={`
              p-2 rounded ${comparisonMode === 'side-by-side' 
                ? 'bg-thermal-primary text-white' 
                : 'bg-gray-200 text-gray-700'
              }
            `}
          >
            Side by Side
          </button>
          <button 
            onClick={() => setComparisonMode('overlay')}
            className={`
              p-2 rounded ${comparisonMode === 'overlay' 
                ? 'bg-thermal-primary text-white' 
                : 'bg-gray-200 text-gray-700'
              }
            `}
          >
            Overlay
          </button>
        </div>
      </div>
      
      {comparisonMode === 'side-by-side' ? renderSideBySide() : renderOverlayComparison()}
      {renderZoomedImage()}
    </div>
  );
}

export default ImageComparison;