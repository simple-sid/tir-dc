import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function SemanticOverlay({ originalImage, segmentationData }) {
  const [showOverlay, setShowOverlay] = useState(true);
  
  // Colors for different semantic classes
  const classColors = {
    road: 'rgba(128, 64, 128, 0.7)',
    sidewalk: 'rgba(244, 35, 232, 0.7)',
    building: 'rgba(70, 70, 70, 0.7)',
    car: 'rgba(0, 0, 142, 0.7)',
    person: 'rgba(220, 20, 60, 0.7)',
    sky: 'rgba(70, 130, 180, 0.7)',
    vegetation: 'rgba(107, 142, 35, 0.7)'
  };
  
  // Generate SVG overlay from segmentation data
  const generateOverlay = () => {
    if (!segmentationData) return null;
    
    return (
      <svg className="absolute inset-0 w-full h-full">
        {segmentationData.segments.map((segment, idx) => (
          <polygon 
            key={idx}
            points={segment.points.join(' ')}
            fill={classColors[segment.class] || 'rgba(255, 255, 255, 0.5)'}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="1"
          />
        ))}
      </svg>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-thermal-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-thermal-primary">
          Semantic Segmentation
        </h2>
        <button 
          onClick={() => setShowOverlay(!showOverlay)}
          className="flex items-center bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
        >
          {showOverlay ? <EyeOff size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
          {showOverlay ? 'Hide Overlay' : 'Show Overlay'}
        </button>
      </div>
      
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
        {showOverlay && generateOverlay()}
      </div>
      
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {Object.entries(classColors).map(([className, color]) => (
          <div key={className} className="flex items-center">
            <div className="w-4 h-4 mr-2" style={{ backgroundColor: color }}></div>
            <span className="text-sm capitalize">{className}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SemanticOverlay;