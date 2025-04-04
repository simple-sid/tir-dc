// Real implementation that connects to your Flask backend

export async function processImage(file) {
  try {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);
    
    // Send the request to your Flask backend
    const response = await fetch('http://localhost:5000/convert', {
      method: 'POST',
      body: formData,
    });
    
    // Parse the response
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to process image');
    }
    
    // Construct the full URL to the processed image
    const colorizedImageUrl = `http://localhost:5000${data.output}`;
    
    // Return the colorized image URL and some mock metrics
    // (you can replace these with real metrics from your backend if available)
    return {
      colorizedImage: colorizedImageUrl,
      metrics: {
        apce: 0.85, // Average Precision of Canny Edges
        semanticAccuracy: 0.92,
        colorConsistency: 0.88,
        edgePreservation: 0.90
      }
    };
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}