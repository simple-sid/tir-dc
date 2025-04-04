import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProcessingPage from './pages/ProcessingPage';
import { Thermometer } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-thermal-gradient text-gray-900">
      <header className="bg-thermal-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Thermometer className="mr-3" size={32} />
          <h1 className="text-2xl font-bold">PearlGAN: Thermal Image Colorization</h1>
        </div>
      </header>
      
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/process" element={<ProcessingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;