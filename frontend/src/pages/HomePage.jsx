import React from 'react';
import { Link } from 'react-router-dom';
import { Thermometer, Image, BarChart2 } from 'lucide-react';

function HomePage() {
  const features = [
    {
      icon: <Image size={32} className="text-thermal-primary" />,
      title: 'Thermal Image Colorization',
      description: 'Convert low-contrast thermal infrared images to vivid color scenes'
    },
    {
      icon: <BarChart2 size={32} className="text-thermal-primary" />,
      title: 'Advanced Metrics',
      description: 'Evaluate image translation with semantic and edge preservation metrics'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 glass-panel rounded-lg p-8 shadow-lg">
      <h1 className="text-4xl font-bold mb-6">Welcome to PearlGAN</h1>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-thermal-primary">
            PearlGAN: Thermal Scene Enhancement
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enhance nighttime driving perception by transforming thermal infrared images into vibrant, 
            detailed color scenes using advanced machine learning techniques.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-thermal-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold ml-3">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/process" 
            className="
              inline-flex items-center px-6 py-3 
              bg-thermal-primary text-white 
              rounded-lg hover:bg-thermal-secondary 
              transition-colors duration-300
            "
          >
            <Thermometer className="mr-2" />
            Start Colorization
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;