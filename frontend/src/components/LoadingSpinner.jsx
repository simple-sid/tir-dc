import React from 'react';
import { Loader2 } from 'lucide-react';

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2 
        className="animate-spin text-thermal-primary" 
        size={48} 
      />
      <p className="mt-4 text-lg text-gray-600">
        Processing Thermal Image...
      </p>
    </div>
  );
}

export default LoadingSpinner;